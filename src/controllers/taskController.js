// controle de tarefas:
import Task from '../models/Task.js';

export const showDashboard = async (req, res) => {
  const tarefas = await Task.find({ usuario: req.session.userId }).sort({ prazo: 1 });
  res.render('pages/dashboard', { nome: req.session.userName, tarefas });
};

export const showNovaTarefa = (req, res) => {
  res.render('pages/novaTarefa');
};

export const criarTarefa = async (req, res) => {
  const { titulo, descricao, prazo, prioridade } = req.body;

   // Corrigir fuso: colocar hora no meio-dia para evitar erro de fuso
   const dataPrazo = new Date(prazo);
   dataPrazo.setHours(12, 0, 0, 0); // meio-dia

  await Task.create({
    titulo,
    descricao,
    prazo:dataPrazo,
    prioridade,
    usuario: req.session.userId
  });

  res.redirect('/dashboard');
};

// editar tarefa:
export const showEditarTarefa = async (req, res) => {
  const tarefa = await Task.findOne({ _id: req.params.id, usuario: req.session.userId });
  if (!tarefa) return res.redirect('/dashboard');
  res.render('pages/editarTarefa', { tarefa });
};

export const editarTarefa = async (req, res) => {
  const { titulo, descricao, prazo, prioridade } = req.body;

  await Task.updateOne(
    { _id: req.params.id, usuario: req.session.userId },
    { titulo, descricao, prazo, prioridade }
  );

  res.redirect('/dashboard');
};

export const deletarTarefa = async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, usuario: req.session.userId });
  res.redirect('/dashboard');
};

export const alternarStatus = async (req, res) => {
  const tarefa = await Task.findOne({ _id: req.params.id, usuario: req.session.userId });
  if (!tarefa) return res.redirect('/dashboard');

  tarefa.concluida = !tarefa.concluida;
  await tarefa.save();

  res.redirect('/dashboard');
};

