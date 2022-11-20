import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideCategoriesAndContentsInterface } from "../../interfaces/GuideCategoriesAndContentsInterface.js";
import { GuideRepository } from "../../repositories/GuideRepository.js";

export class InMemoryGuideRepository implements GuideRepository {
  database: GuideEntity[] = [];

  async create(guide: GuideEntity): Promise<GuideEntity> {
    guide._id = String(this.database.length);
    this.database.push(guide);
    return this.database[this.database.length - 1];
  }

  async update(guide: GuideEntity): Promise<number> {
    const result = await this.findById(guide._id as string);

    if (!result) {
      return 0;
    }

    const index = this.database.indexOf(result);

    this.database[index] = guide;

    return 1;
  }

  async findAll(): Promise<GuideEntity[]> {
    return this.database;
  }

  async findById(id: string): Promise<GuideEntity | null> {
    const result = this.database.find((guide) => (guide._id as unknown as string) === id);
    return result ?? null;
  }

  async findCategoriesAndContentsByGuideId(id: string): Promise<any> {
    const result = this.database.filter((guide) => guide._id === id);

    return result;
  }

  async delete(id: string): Promise<number> {
    const result = await this.findById(id);

    if (!result) {
      return 0;
    }

    const index = this.database.indexOf(result);

    this.database.splice(index, 1);

    return 1;
  }

  async loadData(amount: number) {
    for (let i = 0; i < amount; i++) {
      const guideExample: GuideEntity = {
        _id: String(this.database.length),
        title: "Título do guia",
        content: "Conteúdo do guia",
      };

      this.database.push(guideExample);
    }
  }
}
