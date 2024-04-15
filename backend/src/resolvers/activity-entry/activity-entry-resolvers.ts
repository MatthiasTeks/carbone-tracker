import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Like } from 'typeorm';
import { GraphQLError } from 'graphql';
import { validate } from 'class-validator';
import ActivityEntry from '../../entities/activity-entry/activity-entry';
import InputCreate from '../../entities/activity-entry/input-create';
import InputUpdate from '../../entities/activity-entry/input-update';
import { MyContext } from '../..';

@Resolver(ActivityEntry)
export default class ActivityEntryResolver {
  @Authorized()
  @Query(() => [ActivityEntry])
  async activityEntries(
    @Arg('categoryId', () => Int, { nullable: true }) categoryId?: number,
    @Arg('userId', () => Int, { nullable: true }) userId?: string,
    @Arg('name', { nullable: true }) name?: string,
  ) {
    return ActivityEntry.find({
      relations: { category: true, user: true },
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        category: {
          id: categoryId,
        },
        user: {
          id: userId,
        },
      },
    });
  }

  @Authorized()
  @Query(() => ActivityEntry)
  async getActivityEntryById(@Arg('activityEntryId', () => Int) id: number) {
    const activityEntry = await ActivityEntry.findOne({
      where: { id },
      relations: { category: true, user: true },
    });
    if (!activityEntry) throw new GraphQLError('This activity does not exist.');
    return activityEntry;
  }

  @Authorized()
  @Mutation(() => ActivityEntry)
  async createActivityEntry(
    @Ctx() ctx: MyContext,
    @Arg('data', { validate: true }) data: InputCreate,
  ) {
    const newActivityEntry = new ActivityEntry();
    if (!ctx.user) {
      throw new Error('You must be authenticated to create an activity.');
    }
    Object.assign(newActivityEntry, data);
    newActivityEntry.user = ctx.user;
    const errors = await validate(newActivityEntry);
    if (errors.length !== 0)
      throw new GraphQLError('Invalid data', { extensions: { errors } });
    const { id } = await newActivityEntry.save();
    return ActivityEntry.findOne({
      where: { id },
      relations: { category: true, user: true },
    });
  }

  @Authorized()
  @Mutation(() => ActivityEntry)
  async updateActivityEntry(
    @Ctx() ctx: MyContext,
    @Arg('activityEntryId') id: number,
    @Arg('data', { validate: true }) data: InputUpdate,
  ) {
    const activityEntryToUpdate = await ActivityEntry.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!activityEntryToUpdate)
      throw new GraphQLError('This activity does not exist.');
    if (!ctx.user) {
      throw new Error('You must be authenticated to create an activity.');
    }
    if (activityEntryToUpdate.user.id !== ctx.user.id) {
      throw new Error('You are not authorized to update this activity.');
    }
    Object.assign(activityEntryToUpdate, data);
    const errors = await validate(activityEntryToUpdate);
    if (errors.length !== 0)
      throw new GraphQLError('Invalid data', { extensions: { errors } });
    await activityEntryToUpdate.save();
    return ActivityEntry.findOne({
      where: { id },
      relations: { category: true, user: true },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteActivityEntry(
    @Ctx() ctx: MyContext,
    @Arg('activityEntryId') id: number,
  ) {
    const activityEntryToDelete = await ActivityEntry.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!activityEntryToDelete)
      throw new GraphQLError('This activity does not exist.');
    if (!ctx.user) {
      throw new Error('You must be authenticated to create an activity.');
    }
    if (activityEntryToDelete.user.id !== ctx.user.id) {
      throw new Error('You are not authorized to delete this activity.');
    }
    await activityEntryToDelete.remove();
    return 'Activity entry deleted';
  }
}
