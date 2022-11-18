import { GuideEntity } from '../entities/GuideEntity.js';

export interface GuideRepository {
    create(guide: GuideEntity): Promise<GuideEntity>;
    update(guide: GuideEntity): Promise<number>;
    findById(id: string): Promise<GuideEntity | null>;
    findByCategoryAndContent(id: string): Promise<any>;
    findAll(): Promise<GuideEntity[]>;
    delete(id: string): Promise<number>;
}