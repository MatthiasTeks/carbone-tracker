import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Category from '../category/category';
import User from '../user/user';

@Entity()
@ObjectType()
export default class ActivityEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column({ nullable: true, type: 'text', default: '' })
  @Field()
  spendedAt?: string;

  @Column({ nullable: true, type: 'text' })
  @Field()
  name?: string;

  @Column({ nullable: true, default: 0 })
  @Field()
  input?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.activityEntries, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => Category)
  @ManyToOne(() => Category, (cat) => cat.activityEntries, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  category: Category;
}
