import express from "express";

import connectDatabase from "./database/db.js";
import routes from './routes.js'

const app = express();

app.use(express.json());
app.use(routes);

connectDatabase()
.then(() => {
  app.listen(3000, () => console.log("tem dado em casa"))
})
.catch((error) => console.log(error));
