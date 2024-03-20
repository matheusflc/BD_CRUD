import Comanda from "../models/Comanda.js";

async function createComanda(request, response) {
  try {
    const comanda = request.body;

    const novaComanda = await Comanda.create(comanda);

    return response.status(201).json(novaComanda);
  } catch (error) {
    console.error("Error in createComanda:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

async function getComandas(request, response) {
  try {
    const comandas = await Comanda.find().populate({ 
      path: "userId",
      model: "User",
      select: "name cpf vendedor" // Seleciona apenas o campo "cpf" do usuário
    }).populate({
        path: "itens",
        model: "Estoque",
        select: "nome valor" // Seleciona apenas os campos "nome" e "valor" do Estoque
    });

    return response.status(200).json(comandas);
  } catch (error) {
    console.error("Error in getComandas:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

async function getComandaById(request, response) {
  try {
    const comandaId = request.params.id;

    const comanda = await Comanda.findById(comandaId).populate("userId").populate("itens");

    if (!comanda) {
      return response.status(404).json({ error: "Comanda not found" });
    }

    return response.status(200).json(comanda);
  } catch (error) {
    console.error("Error in getComandaById:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateComanda(request, response) {
  try {
    const comandaId = request.params.id;
    const update = request.body;

    const comanda = await Comanda.findByIdAndUpdate(comandaId, update, { new: true });

    if (!comanda) {
      return response.status(404).json({ error: "Comanda not found" });
    }

    return response.status(200).json(comanda);
  } catch (error) {
    console.error("Error in updateComanda:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteComanda(request, response) {
  try {
    const comandaId = request.params.id;

    const comanda = await Comanda.findByIdAndDelete(comandaId);

    if (!comanda) {
      return response.status(404).json({ error: "Comanda not found" });
    }

    return response.status(200).json({ message: "Comanda deleted successfully" });
  } catch (error) {
    console.error("Error in deleteComanda:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}

export { createComanda, getComandas, getComandaById, updateComanda, deleteComanda };
