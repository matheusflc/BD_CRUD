import express from "express";
import cors from "cors";

import connectDatabase from "./database/db.js";
import UserRoutes from "../routes/UserRoutes.js";
import EstoqueRoutes from "../routes/EstoqueRoutes.js";
import ComandaRoutes from "../routes/ComandaRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoutes);
app.use(EstoqueRoutes);
app.use(ComandaRoutes);

connectDatabase()
.then(() => {
  app.listen(3000, () => console.log("tem dado em casa"))
})
.catch((error) => console.log(error));
