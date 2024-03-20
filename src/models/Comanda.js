import mongoose from "mongoose";

const comandaSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  }],
  itens: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estoque",
    required: false,
  }],
//   valorTotal: {
//     type: Number,
//     required: false,
//     default: 0,
//   },
  pago: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("Comanda", comandaSchema);