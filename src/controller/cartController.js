import CartService from '../services/cartService.js';
import ProductService from '../services/productService.js';
import TicketService from '../services/ticketService.js';

export default class CartController {
  constructor() {
    this.cartService = new CartService();
    this.productService = new ProductService();
    this.ticketService = new TicketService();
  }

  async createCart(req, res) {
    try {
      const newCart = await this.cartService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async getCart(req, res) {
    try {
      const { params: { cid } } = req;
      const cart = await this.cartService.getCart(cid);
      res.render('cart', { cart, user: req.session.user});
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { params: { cid, pid } } = req;
      const { quantity } = req.body;
      await this.cartService.addProductToCart(cid, pid, quantity);
      res.status(200).send('Producto agregado al carrito correctamente');
      //res.status(200).json({ message: 'Producto agregado al carrito correctamente' }); test
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async updateCart(req, res) {
    try {
      const { params: { cid }, body } = req;
      await this.cartService.updateCart(cid, body);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async updateProductInCart(req, res) {
    try {
      const { params: { cid, pid }, body } = req;
      const { quantity } = body;

      if (quantity <= 0) {
        throw { statusCode: 400, message: 'La cantidad debe ser un numero entero positivo' };
      }

      await this.cartService.updateProductInCart(cid, pid, quantity);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const { params: { cid, pid } } = req;
      await this.cartService.deleteProductFromCart(cid, pid);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async deleteCart(req, res) {
    try {
      const { params: { cid } } = req;
      await this.cartService.deleteCart(cid);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async purchaseCart(req, res) {
    try {
      const { params: { cid } } = req;
      const result = await this.cartService.purchaseCart(cid, req.session.user);
    
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar la compra del carrito' });
    }
  }  
}
