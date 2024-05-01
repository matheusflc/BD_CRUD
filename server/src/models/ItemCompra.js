import mongoose from "mongoose";

const itemCompraSchema = new mongoose.Schema({
  produtoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estoque',
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  }
});

export default mongoose.model("ItemCompra", itemCompraSchema);