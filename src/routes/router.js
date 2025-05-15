// nossa rota de autenticação:
import express from 'express';
import {
  showLogin,
  showRegister,
  register,
  login,
  logout
} from '../controllers/authController.js';

import {
    showDashboard,
    showNovaTarefa,
    criarTarefa,
    showEditarTarefa,
    editarTarefa,
    deletarTarefa,
    alternarStatus
  } from '../controllers/taskController.js';
import { requireLogin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/login', showLogin);
router.get('/register', showRegister);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
// Protegidas
router.get('/dashboard', requireLogin, showDashboard);
router.get('/nova-tarefa', requireLogin, showNovaTarefa);
router.post('/nova-tarefa', requireLogin, criarTarefa);
router.get('/deletar/:id', requireLogin, deletarTarefa);
router.get('/editar/:id', requireLogin, showEditarTarefa);
router.post('/editar/:id', requireLogin, editarTarefa);
router.get('/concluir/:id', requireLogin, alternarStatus);

//view
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.send(`Bem-vindo, ${req.session.userName}`);
});

export default router;