import User from "../../dto/user/User";
import UserRepository from "../../data/repository/UserRepository";
import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import {ProfileTypeEnum} from "../../util/enum/ProfileTypeEnum";

@autoInjectable()
export default class UserService {
    private _repository: UserRepository;

    constructor(repository: UserRepository) {
        Logger.debug("Initialising user service");
        this._repository = repository;
    }

    public async getUserIdByContactNo(contactNo: string): Promise<string | null> {
        return this._repository.getUserIdByContactNo(contactNo);
    }


    public async getUserById(userId: string): Promise<User> {
        Logger.debug("Fetching user by Id: " + userId);
        return this._repository.getUserById(userId);
    }

    public async registerUserWithContactNo(contactNo: string): Promise<User> {
        return this._repository.createUserWithContactNo(contactNo);
    }

    public async registerUserPersonalProfile(user: User, userId: string): Promise<User> {
        return this._repository.registerUserPersonalProfile(user, userId);
    }

    public async updateUserPersonalProfile(user: User, userId: string): Promise<User> {
        return this._repository.updateUserPersonalProfile(user, userId);
    }


    public async updateProfileType(type: ProfileTypeEnum, userId: string): Promise<User> {
        return this._repository.updateProfileType(type, userId);
    }

    public async deletePersonalProfile(userId: string): Promise<void> {
        return this._repository.deletePersonalProfile(userId);
    }

    public async fetchPersonalProfile(userId: string): Promise<User> {
        return this._repository.fetchPersonalProfile(userId);
    }
}
