import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  prazo: { type: Date, required: true },
  prioridade: { type: String, enum: ['baixa', 'media', 'alta'], required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  concluida: { type: Boolean, default: false },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model('Task', TaskSchema);
