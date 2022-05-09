import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {NotFoundError} from "../../errors/ApiError";
import {instanceToPlain, plainToInstance} from "class-transformer";
import ResponseMessages from "../../util/statics/ResponseMessages";
import Story from "../../dto/story/Story";
import AppUtils from "../../util/AppUtils";
import StoryEntity from "../models/entity/StoryEntity";
import UserEntity from "../models/entity/UserEntity";
import {Sequelize} from "sequelize";
import ProductEntity from "../models/entity/ProductEntity";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class StoryRepository {

    constructor() {
        Logger.debug("Initialising Story repository");
    }

    //Fetch Queries
    public async createStory(story: Story, userId: string): Promise<Story> {
        let storyEntity: StoryEntity;
        let userEntity: UserEntity | null = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        storyEntity = await StoryEntity.create({...AppUtils.nullPropsRemover(instanceToPlain(story)), user_id: userId});

        Logger.debug(instanceToPlain(plainToInstance(Story, storyEntity.get({plain: true}), {excludeExtraneousValues: true})));

        return plainToInstance(Story, storyEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Create Query

    //Update Query

    //Delete Query

    public async increaseStoryViewCount(id: string, userId: any): Promise<void> {
        Logger.debug("Into Repository");
        let storyEntity: StoryEntity | null = await StoryEntity.findByPk(id);

        if(storyEntity == null) {
            throw new NotFoundError(ResponseMessages.STORY_WITH_ID_NOT_FOUND + id);
        }

        await storyEntity.increment('view_count');

    }

    public async deleteStory(id: string, userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await StoryEntity.update({active: false}, {
                where: {
                    id: id,
                    userId: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.STORY_WITH_ID_NOT_FOUND + id);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            throw new InternalErrorResponse();
        }
    }
}
