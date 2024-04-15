import { db } from '../db';
import Category from '../entities/category/category';

export default class CategoryService {
  static async create(infos: { name: string }): Promise<Category> {
    const newCategory = new Category();
    newCategory.name = infos.name;

    const categoryRepository = db.getRepository(Category);
    await categoryRepository.save(newCategory);

    return newCategory;
  }
}
