import { Request, Response } from "express";
import { FileProps } from "../../entities/DigitalContentEntity.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { CreateDigitalContentService } from "../../services/digitalContents/CreateDigitalContentService.js";
import { RequestFileProps } from "./interfaces/RequestProps.js";




class CreateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const body = req.body;
      const files: RequestFileProps[] = req.files as RequestFileProps[];

      const digitalContentRepository = new DigitalContentMongoRepository();
      const digitalContentService = new CreateDigitalContentService(
        digitalContentRepository
      );

 
      let newList = [];
      for (let file of files) {
        const obj = {
          filePath: file.path,
          publicId: file.filename,
        };

        newList.push(obj)
      }

      const result = await digitalContentService.execute({
        ...body,
        filePaths: newList,
      });

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const createDigitalContentController =
  new CreateDigitalContentController();
