import { db } from '../db';
import ActivityEntry from '../entities/activity-entry/activity-entry';
import Category from '../entities/category/category';
import User from '../entities/user/user';

export default class ActivityEntryService {
  static async create(infos: {
    name: string;
    input: number;
    category: Category;
    user: User;
  }): Promise<ActivityEntry> {
    const activityEntryRepository = db.getRepository(ActivityEntry);
    const newActivityEntry = activityEntryRepository.create({
      name: infos.name,
      input: infos.input,
      category: infos.category,
      user: infos.user,
    });

    await activityEntryRepository.save(newActivityEntry);

    return newActivityEntry;
  }
}
