import express from 'express';
import ProductController from '../../controller/productController.js'; 
//import { isAdmin } from '../../middlewares/auth.js'; tuve problemas con el middleware lo tengo que ver

const router = express.Router();
const productController = new ProductController();

router.get('/products', async (req, res) => {
  await productController.getProductsPaginated(req, res);
});

router.get('/products/:pid', async (req, res) => {
  await productController.findById(req, res);
});

router.post('/products', async (req, res) => {
  await productController.create(req, res);
});

router.put('/products/:pid', async (req, res) => {
  await productController.updateById(req, res);
});

router.delete('/products/:pid', async (req, res) => {
  await productController.deleteById(req, res);
});

export default router;
