import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import ProductRepository from "../../data/repository/ProductRepository";
import Product from "../../dto/product/Product";

@autoInjectable()
export default class ProductService {
    private _repository: ProductRepository;

    constructor(repository: ProductRepository) {
        Logger.debug("Initialising Product service");
        this._repository = repository;
    }

    public async createProduct(product: Product, userId: string): Promise<Product> {
        return this._repository.createProduct(product, userId);
    }

    public async updateProduct(product: Product, id: string, userId: string): Promise<Product> {
        return this._repository.updateProduct(product, id, userId);
    }

    public async deleteProduct(id: string, userId: string): Promise<void> {
        return this._repository.deleteProduct(id, userId);
    }

    public async getAllProducts(userId: string): Promise<Product[]> {
        return this._repository.getAllProducts(userId);
    }

    public async getProduct(id: string, userId: string): Promise<Product> {
        return this._repository.getProduct(id, userId);
    }
}
