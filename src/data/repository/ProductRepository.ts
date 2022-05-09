import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {NotFoundError} from "../../errors/ApiError";
import Product from "../../dto/product/Product";
import BusinessEntity from "../models/entity/BusinessEntity";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {instanceToPlain, plainToInstance} from "class-transformer";
import ProductEntity from "../models/entity/ProductEntity";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class ProductRepository {

    constructor() {
        Logger.debug("Initialising Product repository");
    }

    //Fetch Queries
    public async getAllProducts(userId: string): Promise<Product[]> {
        let productEntityList: ProductEntity[] | null = await ProductEntity.findAll({
            where: {
                user_id: userId,
                active: true
            }
        });

        if (productEntityList == null) {
            throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_REGISTERED);
        }

        return productEntityList.map(productEntity => plainToInstance(Product, productEntity.get({plain: true}), {excludeExtraneousValues: true}));
    }

    public async getProduct(id: string, userId: string): Promise<Product> {
        let productEntity: ProductEntity | null = await ProductEntity.findByPk(id);

        if (productEntity == null || productEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_FOUND + id);
        }

        return plainToInstance(Product, productEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Create Query
    public async createProduct(product: Product, userId: string): Promise<Product> {
        let productEntity: ProductEntity;
        let businessEntity: BusinessEntity | null = await BusinessEntity.findOne({where: {user_id: userId}});

        if (businessEntity == null) {
            throw new NotFoundError(ResponseMessages.BUSINESS_PROFILE_NOT_REGISTERED);
        }

        productEntity = await businessEntity.createProduct({...AppUtils.nullPropsRemover(instanceToPlain(product)), user_id: userId});

        return plainToInstance(Product, productEntity.get({plain: true}), {excludeExtraneousValues: true});

    }

    //Update Query
    public async updateProduct(product: Product, id: string, userId: string): Promise<Product> {
        let productEntity: ProductEntity | null = await ProductEntity.findByPk(id);

        if (productEntity == null || productEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_FOUND);
        }

        productEntity.set(AppUtils.nullPropsRemover(instanceToPlain(product)));
        productEntity = await productEntity.save();

        return plainToInstance(Product, productEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Delete Query
    public async deleteProduct(id: string, userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await ProductEntity.update({active: false}, {
                where: {
                    id: id,
                    userId: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_FOUND + id);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            throw new InternalErrorResponse();
        }
    }
}
