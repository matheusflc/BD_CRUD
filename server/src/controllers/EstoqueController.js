import Estoque from "../models/Estoque.js";

async function getEstoque(request, response) {
  const estoque = await Estoque.find();

  console.log(JSON.stringify(estoque, undefined, 2));

  return response.status(200).json(estoque);
}

async function createItem(request, response) {
  const item = request.body;

  const newItem = await Estoque.create(item);

  return response.status(201).json(newItem);
}

async function deleteItem(request, response) {
  const id = request.params.id;

  await Estoque.findByIdAndDelete(id);

  return response.status(200).json({ response: "Item deleted" });
}

async function updateItem(request, response) {
  const id = request.params.id;
  const update = request.body;

  console.log(JSON.stringify(update, undefined, 2));

  await Estoque.findByIdAndUpdate(id, update);

  return response.status(200).json({ response: "Item updated" });
}

async function findByName(request, response) {
  try {
    const name = request.body.name;

    const item = await Estoque.findOne({ nome: name });

    if (!item) {
      console.log("Item não encontrado");
      return response.status(404).json({ error: "Item not found" });
    }

    console.log(JSON.stringify(item, undefined, 2));

    return response.status(200).json(item);
  } catch (error) {
    console.error("Error in findByName:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
  
async function report(request, response) {
    try {
      const totalPorCategoria = await Estoque.aggregate([
        { 
          $group: { 
            _id: "$categoria", // Agrupa por categoria
            totalItems: { $sum: "$quantidade" } // Soma a quantidade de itens para cada categoria
          } 
        }
      ]);
  
      console.log("Total por categoria:", totalPorCategoria);
  
      return response.status(200).json(totalPorCategoria);
    } catch (error) {
      console.error("Error in report:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

export { getEstoque, createItem, deleteItem, updateItem, findByName, report };
