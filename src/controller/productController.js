import ProductService from '../services/productService.js';

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async findAll(req, res) {
    try {
      const { category, availability, sort, query } = req.query;
      const result = await this.productService.findAll({ category, availability, sort, query });

      res.render('products', { title: 'Productos', products: result, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
  }

  async getProductsPaginated(req, res) {
    try {
      const { page = 1, limit = 5, category, availability, sort, query } = req.query;
      const criteria = {};

      if (query) {
        criteria.$text = { $search: query };
      } else {
        if (category) {
          criteria.category = category;
        }
        if (availability !== undefined) {
          criteria.availability = availability;
        }
      }

      const options = { page, limit, sort: { price: sort === 'desc' ? -1 : 1 } };
      const result = await this.productService.getProductsPaginated(criteria, options);

      const response = this.buildResponse(result, req);
      res.render('products', {
        title: 'Productos',
        products: response,
        user: req.session.user,
        isAdmin: req.session.user.role === 'admin',
        isUser: req.session.user.role === 'usuario'
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
  }

  buildResponse(data, req) {
    return {
      status: 'success',
      payload: data.docs.map(product => product.toJSON()),
      totalPages: data.totalPages,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      page: data.page,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevLink: data.hasPrevPage
        ? this.buildPaginationLink(req, data.prevPage)
        : null,
      nextLink: data.hasNextPage
        ? this.buildPaginationLink(req, data.nextPage)
        : null,
    };
  }

  buildPaginationLink(req, page) {
    const { limit = 5, category, availability, sort } = req.query;
    const baseUrl = 'http://localhost:8080/api/products';
    const params = new URLSearchParams({
      limit,
      page,
      ...(category && { category }),
      ...(availability !== undefined && { availability }),
      ...(sort && { sort }),
    });
    return `${baseUrl}?${params.toString()}`;
  }


  async findById(req, res) {
    try {
      const { params: { pid } } = req;
      const product = await this.productService.findById(pid);
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const addedProduct = await this.productService.create(body);
      res.status(201).json({ message: 'Producto agregado correctamente', product: addedProduct });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const { params: { pid }, body } = req;
      await this.productService.updateById(pid, body);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      const { params: { pid } } = req;
      await this.productService.deleteById(pid);
      console.log("producto eliminado")
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
