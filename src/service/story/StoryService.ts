import Story from "../../dto/story/Story";
import {autoInjectable} from "tsyringe";
import {UnImplementedError} from "../../errors/ApiError";
import Logger from "../../util/Logger";
import StoryRepository from "../../data/repository/StoryRepository";

@autoInjectable()
export default class StoryService {

    private _storyRepository: StoryRepository;

    constructor(storyRepository: StoryRepository) {
        this._storyRepository = storyRepository;
    }

    public async createStory(story: Story, userId: string): Promise<Story> {
        Logger.debug("Your story in service");
        // story.viewCount = 0;
        return this._storyRepository.createStory(story, userId);
    }

    public async increaseStoryViewCount(id: string, userId: any): Promise<void> {
        return this._storyRepository.increaseStoryViewCount(id, userId);

    }

    public async deleteStory(id: string, userId: string): Promise<void> {
        return this._storyRepository.deleteStory(id, userId);

    }
}