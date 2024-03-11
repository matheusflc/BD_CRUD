import express from "express";
import { mongoose } from "mongoose";
import User from "./models/User.js";


const app = express();

app.use(express.json());


app.get("/users", async (request, response) => {
  const user = await User.find();

  return response.json(user);
});

app.post("/users", async (request, response) => {
  const user = request.body;

  const newUser = await User.create(user);


  return response.json(newUser);

});

mongoose
  .connect(
    "mongodb+srv://joaomatheus012:l1pdIF5ePrJXqcfl@cluster0.ggmrvll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("tem dado em casa"))
  .catch(() => console.log("nao tem dado em casa"));

app.listen(3000);
