import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Like } from 'typeorm';
import Category from '../../entities/category/category';

@Resolver(Category)
export default class CategoryResolver {
  @Authorized()
  @Query(() => [Category])
  async categories(@Arg('name', { nullable: true }) name: string) {
    return Category.find({
      where: { name: name ? Like(`%{name}%`) : undefined },
      order: { id: 'desc' },
    });
  }
}
