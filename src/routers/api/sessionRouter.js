import { Router } from 'express';
import passport from 'passport';

import CartService from '../../services/cartService.js';
import { isAdmin, isUser } from '../../middlewares/auth.js';

const router = Router();
const cartService = new CartService();

router.post('/sessions/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => { 
  res.redirect('/login');
})

router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
  try {
    if (isUser(req)) {
      const newCart = await cartService.createCart();

      req.user.cartID = newCart._id;
      await req.user.save();
    }

    console.log('req.user', req.user);

    req.session.user = req.user;
    res.redirect('/api/products');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/sessions/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/api/products');
})

router.get('/sessions/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
    res.redirect('/login');
  });
});

router.get('/current', (req, res) => {
  try {
    if (req.isAuthenticated()) {
      let userDTO = "test";

      if (isAdmin(req)) {
        userDTO = {
          email: req.user.email,
          role: 'admin',
        };
      } else if (isUser(req)) {
        userDTO = {
          email: req.user.email,
          role: 'user',
        };
      }

      console.log('Informacion del usuario:', userDTO);
      res.status(200).json(userDTO);
    } else {
      res.status(401).json({ message: 'Usuario no autenticado' });
    }
  } catch (error) {
    console.error('Error en la ruta /current:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
