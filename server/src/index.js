import express from "express";
import cors from "cors";

import connectDatabase from "./database/db.js";
import UserRoutes from "../routes/UserRoutes.js";
import EstoqueRoutes from "../routes/EstoqueRoutes.js";
import ComandaRoutes from "../routes/ComandaRoutes.js";
import User from "./models/User.js";


const app = express();

const getLastPurchaseView = async () => {
  const result = await User.aggregate([
    // Desfaz o array de purchaseHistory para tratar cada item como um documento separado
    { $unwind: "$purchaseHistory" },
    // Ordena por data de compra de forma decrescente
    { $sort: { "purchaseHistory.purchaseDate": -1 } },
    // Agrupa novamente por usuário, mantendo apenas a última compra (agora a primeira devido ao sort)
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        cpf: { $first: "$cpf" },
        lastPurchase: { $first: "$purchaseHistory" }
      }
    },
    // (Opcional) Junta informações adicionais do usuário, se necessário
    {
      $lookup: {
        from: "users", // ou o nome da coleção que representa os usuários, se for diferente
        localField: "_id",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    // Projeta o formato final do documento
    {
      $project: {
        _id: 1,
        name: 1,
        cpf: 1,
        lastPurchase: 1,
        userInfo: { $arrayElemAt: ["$userInfo", 0] } // Ajusta a saída do lookup
      }
    }
  ]);

  console.log(result);
};

app.use(cors());
app.use(express.json());
app.use(UserRoutes);
app.use(EstoqueRoutes);
app.use(ComandaRoutes);

app.get('/last-purchase-view', async (req, res) => {
  try {
    const result = await getLastPurchaseView();
    res.json(result);
  } catch (error) {
    console.error('Erro ao obter a view de última compra', error);
    res.status(500).send('Erro interno do servidor');
  }
});

connectDatabase()
.then(() => {
  app.listen(3000, () => console.log("tem dado em casa"))
})
.catch((error) => console.log(error));

export default getLastPurchaseView;