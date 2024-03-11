import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema)
