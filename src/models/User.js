import mongoose from 'mongoose';

// cria nosso modelo de usuario:
const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);
