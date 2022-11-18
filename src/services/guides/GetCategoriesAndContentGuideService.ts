import { GuideRepository } from "../../repositories/GuideRepository.js";

export class GetCategoriesAndContentGuideService {
  constructor(private readonly repository: GuideRepository) {}
  async execute(id: string) {
    try {
      const result = await this.repository.findByCategoryAndContent(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
