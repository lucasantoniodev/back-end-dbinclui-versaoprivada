import { Request, Response } from "express";
import { FileProps } from "../../entities/DigitalContentEntity.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateDigitalContentService } from "../../services/digitalContents/UpdateDigitalContentService.js";
import { v2 as cloudinary } from "cloudinary";

class UpdateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body.data;
      const files = req.files;

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new UpdateDigitalContentService(contentRepository);

      const result = await contentService.execute(
        id,
        body,
        files as FileProps[]
      );

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      await cloudinary.api.delete_resources(result.oldPublic_ids);
      return sucessfulResponse(res, { data: result.result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateDigitalContentController =
  new UpdateDigitalContentController();
