import { Request, Response } from "express";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import {
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { GetCategoriesAndContentGuideService } from "../../services/guides/GetCategoriesAndContentGuideService.js";

class GetCategoriesAndContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const guideRepository = new GuideMongoRepository();
      const guideService = new GetCategoriesAndContentGuideService(
        guideRepository
      );

      const result = await guideService.execute(id);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getCategoriesAndContentController =
  new GetCategoriesAndContentController();
