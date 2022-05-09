import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import {autoInjectable} from "tsyringe";
import Logger from "../../../util/Logger";
import StoryService from "../../../service/story/StoryService";
import {ProtectedRequest} from "../../../util/app-request";
import {plainToInstance} from "class-transformer";
import Story from "../../../dto/story/Story";
import {ValidationSource} from "../../../util/enum/ValidationSourceEnum";

@autoInjectable()
export default class StoryController {
    private readonly _router: Router;
    private readonly _storyService: StoryService;

    constructor(storyService: StoryService) {
        Logger.debug("Initialising Test Server Controller");
        this._router = express.Router();
        this._storyService = storyService;
    }

    routes() {
        Logger.debug("Configuring routes for Test Server");
        this._router.post('/', validator(schema.register), asyncHandler(async (req: ProtectedRequest, res) => this.createStory(req, res)));
        this._router.post('/increase-view-count/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res: any) => this.increaseStoryViewCount(req, res)));
        this._router.delete('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res: any) => this.deleteStory(req, res)));
        return this._router;
    }

    private async createStory(req: ProtectedRequest, res: any) {
        Logger.debug("Creating new story for: " + req.sessionPayload.userId);

        let story: Story = plainToInstance(Story, req.body);
        story = await this._storyService.createStory(story, req.sessionPayload.userId);

        Logger.debug("Story created successfully");

        return new SuccessResponse(ResponseMessages.STORY_CREATE_SUCCESS, story).send(res);
    }

    private async increaseStoryViewCount(req: ProtectedRequest, res: any) {
        Logger.debug("Increasing Story View for User: " + req.sessionPayload.userId);

        await this._storyService.increaseStoryViewCount(req.params.id, req.sessionPayload.userId);

        return new SuccessMsgResponse(ResponseMessages.STORY_COUNT_INCREASE_SUCCESS).send(res);
    }

    private async deleteStory(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting story for user: " + req.sessionPayload.userId);

        await this._storyService.deleteStory(req.params.id, req.sessionPayload.userId);

        return new SuccessMsgResponse(ResponseMessages.STORY_COUNT_INCREASE_SUCCESS).send(res);
    }
}
