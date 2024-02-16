import { productRepository } from '../repositories/index.js';
import ProductModel from '../dao/models/productModel.js';

export default class ProductService {
  constructor() {
  }

  async findAll(criteria = {}) {
    try {
      return await productRepository.get(criteria);
    } catch (error) {
      console.error(error);
      throw new Error('Error al buscar productos');
    }
  }

  async findById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      console.error(`Error al buscar por ID: ${error.message}`);
      throw error;
    }
  }

  async create(data) {
    try {
      return await productRepository.create(data);
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear producto');
    }
  }

  async updateById(id, data) {
    try {
      return await productRepository.updateById(id, data);
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar producto por ID');
    }
  }

  async deleteById(id) {
    try {
      return await productRepository.deleteById(id);
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar producto por ID');
    }
  }

  async getProductsPaginated(criteria = {}, options = { page: 1, limit: 10 }) {
    try {
      console.log(criteria)
      console.log(options)
      const paginatedResult = await ProductModel.paginate(criteria, options);
      console.log(paginatedResult)
      return paginatedResult;
    } catch (error) {
      console.error(`Error al obtener productos paginados: ${error.message}`);
      throw error;
    }
  }

  async updateStock(productId, newStock) {
    try {
      const product = await ProductModel.findById(productId);

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      product.stock = newStock;
      await product.save();

      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el stock del producto');
    }
  }
}
