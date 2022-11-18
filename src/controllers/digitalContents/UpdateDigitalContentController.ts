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
import { RequestFileProps } from "./interfaces/RequestProps.js";

class UpdateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body.data;
      const files: RequestFileProps[] = req.files as RequestFileProps[];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new UpdateDigitalContentService(contentRepository);

      let newList = [];
      for (let file of files) {
        const obj = {
          filePath: file.path,
          publicId: file.filename,
        };

        newList.push(obj);
      }

      const result = await contentService.execute(id, body, newList);

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
