import { DigitalContentEntity } from "../entities/DigitalContentEntity.js";

export interface DigitalContentRepository {
  create(content: DigitalContentEntity): Promise<DigitalContentEntity>;
  update(id: string, content: DigitalContentEntity): Promise<number>;
  updateMediaByPublicId(
    public_id: string,
    newPath: string,
    newFilename: string
  ): Promise<number>;
  findByCategoryId(id: string): Promise<DigitalContentEntity[]>;
  findById(id: string): Promise<DigitalContentEntity | null>;
  findAll(): Promise<DigitalContentEntity[]>;
  delete(id: string): Promise<number>;
}
