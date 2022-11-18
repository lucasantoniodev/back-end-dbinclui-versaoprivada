import { CategoryEntity } from "../entities/CategoryEntity.js";

export interface CategoryRepository {
  create(category: CategoryEntity): Promise<CategoryEntity>;
  update(category: CategoryEntity): Promise<number>;
  findById(id: string): Promise<CategoryEntity | null>;
  findByGuideId(guideId: string): Promise<CategoryEntity[]>
  findAll(): Promise<CategoryEntity[]>;
  delete(id: string): Promise<number>;
}
