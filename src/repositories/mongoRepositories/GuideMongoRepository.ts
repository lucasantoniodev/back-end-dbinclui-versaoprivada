import { Types } from "mongoose";
import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideModel } from "../../models/GuideModel.js";
import { GuideRepository } from "../GuideRepository.js";

export class GuideMongoRepository implements GuideRepository {
  database = GuideModel;

  async create(guide: GuideEntity): Promise<GuideEntity> {
    return this.database.create(guide);
  }

  async update(guide: GuideEntity): Promise<number> {
    const result = await this.database.updateOne({ _id: guide._id }, guide);
    return result.modifiedCount;
  }

  async findById(id: string): Promise<GuideEntity | null> {
    return this.database.findById(id);
  }

  async findAll(): Promise<GuideEntity[]> {
    return this.database.find();
  }

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }

  async findByCategoryAndContent(id: string): Promise<any> {
    // aggregate() returns an array, but since here we are searching by id we
    // get the first element of this array
    const [guide] = await this.database
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: "Categories",
            let: { guideId: "$_id" },
            as: "Categories",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$guideId", "$guide"],
                  },
                },
              },
              {
                $lookup: {
                  from: "DigitalContents",
                  let: { categoryId: "$_id" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$$categoryId", "$category"],
                        },
                      },
                    },
                  ],
                  as: "DigitalContents",
                },
              },
            ],
          },
        },
        // {
        //   $lookup: {
        //     from: "DigitalContents",
        //     let: { guideId: "$_id" },
        //     as: "DigitalContents",
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $eq: ["$$guideId", "$guide"],
        //           },
        //         },
        //       },
        //       {
        //         $match: { category: undefined },
        //       },
        //     ],
        //   },
        // },
      ])
      .exec();

    return guide;
  }
}
