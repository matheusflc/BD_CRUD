import mongoose from "mongoose";

const purchaseHistorySchema = new mongoose.Schema({
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    quantity: Number,
    price: Number,
  }],
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  vendedorId: { // Adicionando o campo vendedorId
    type: mongoose.Schema.Types.ObjectId, // Referenciando o modelo User, assumindo que vendedores são também usuários
    ref: 'User',
    required: false, // Pode ser opcional, dependendo da sua lógica de negócio
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cpf: { 
    type: String, 
    required: true,
    unique: true,
  },
  contato: [{
    telefone: {
      type: String,
      required: false,
    },
    endereco: {
      type: String,
      required: false,
    }
  }],
  flamengo: {
    type: Boolean,
    required: true,
  },
  one_piece: {
    type: Boolean,
    required: true,
  },
  sousa: {
    type: Boolean,
    required: true,
  },
  vendedor: {
    type: Boolean,
    required: true,
    default: false,
  },
  purchaseHistory: [purchaseHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
