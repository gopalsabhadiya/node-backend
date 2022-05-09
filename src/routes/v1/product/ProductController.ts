import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import Logger from "../../../util/Logger";
import {autoInjectable} from "tsyringe";
import {ProtectedRequest} from "../../../util/app-request";
import {plainToInstance} from "class-transformer";
import ProductService from "../../../service/product/ProductService";
import Product from "../../../dto/product/Product";

@autoInjectable()
export default class ProductController {
    private _router: Router;
    private _productService: ProductService;

    constructor(productService: ProductService) {
        Logger.debug("Initialising Register User Controller");
        this._router = express.Router();
        this._router.post('/', validator(schema.create), asyncHandler(async (req: ProtectedRequest, res) => this.createProduct(req, res)));
        this._router.patch('/:id', validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.updateProduct(req, res)));
        this._router.delete('/:id', asyncHandler(async (req: ProtectedRequest, res) => this.deleteProduct(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getAllProducts(req, res)));
        this._router.get('/single/:id', asyncHandler(async (req: ProtectedRequest, res) => this.getSingleProducts(req, res)));
        this._productService = productService;
    }

    routes() {
        Logger.debug("Configuring routes for Product");
        return this._router;
    }

    private async createProduct(req: ProtectedRequest, res: any) {
        Logger.debug("Creating product for: " + req.sessionPayload.userId);

        let product: Product = plainToInstance(Product, req.body);
        product = await this._productService.createProduct(product, req.sessionPayload.userId);

        Logger.debug("Product created successfully");

        return new SuccessResponse(ResponseMessages.CREATE_PRODUCT_SUCCESS, product).send(res);
    }

    private async updateProduct(req: ProtectedRequest, res: any) {
        Logger.debug("Update product for: " + req.sessionPayload.userId);

        let product: Product = plainToInstance(Product, req.body);
        product = await this._productService.updateProduct(product, req.params.id, req.sessionPayload.userId);

        Logger.debug("Product updated successfully");

        return new SuccessResponse(ResponseMessages.UPDATE_PRODUCT_SUCCESS, product).send(res);
    }

    private async deleteProduct(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting product for: " + req.sessionPayload.userId);

        await this._productService.deleteProduct(req.params.id, req.sessionPayload.userId);

        Logger.debug("Product deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.DELETE_PRODUCT_SUCCESS).send(res);
    }

    private async getAllProducts(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching all products for: " + req.sessionPayload.userId);

        let products: Product[] = await this._productService.getAllProducts(req.sessionPayload.userId);

        Logger.debug("Products fetched successfully");
        Logger.debug(products);

        return new SuccessResponse(ResponseMessages.FETCH_ALL_PRODUCT_SUCCESS, products).send(res);
    }

    private async getSingleProducts(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching single product: " + req.sessionPayload.userId);

        let product: Product = await this._productService.getProduct(req.params.id, req.sessionPayload.userId);

        Logger.debug("Single product fetched successfully");

        return new SuccessResponse(ResponseMessages.FETCH_SINGLE_PRODUCT_SUCCESS, product).send(res);
    }
}
