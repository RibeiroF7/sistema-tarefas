// controller de autenticação:
import bcrypt from 'bcrypt';
import User from '../models/User.js';

// logar:
export const showLogin = (req, res) => {
  res.render('pages/login');
};
// cadastrar:
export const showRegister = (req, res) => {
  res.render('pages/register');
};

export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o email já foi cadastrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send('Email já cadastrado!');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const user = new User({ nome, email, senha: hashedPassword });
    await user.save();

    res.redirect('/login');
  } catch (err) {
    res.send('Erro no cadastro.');
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('Usuário não encontrado.');

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.send('Senha incorreta.');

    req.session.userId = user._id;
    req.session.userName = user.nome;

    res.redirect('/dashboard');
  } catch (err) {
    res.send('Erro no login.');
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
