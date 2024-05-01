import mongoose from "mongoose";

const pagamentoSchema = new mongoose.Schema({
  compraId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compra',
    required: true,
  },
  forma: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Pagamento", pagamentoSchema);