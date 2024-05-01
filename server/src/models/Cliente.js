import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  contato: {
    telefone: String,
    endereco: String,
  },
  preferencias: {
    flamengo: Boolean,
    onePiece: Boolean,
    sousa: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cliente", clienteSchema);