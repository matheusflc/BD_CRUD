import mongoose from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
