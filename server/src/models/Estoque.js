import mongoose from "mongoose";

const estoqueSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  mari : {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Estoque", estoqueSchema);
