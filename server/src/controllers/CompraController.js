import Compra from "../models/ItemCompra.js";
import Cliente from "../models/Cliente.js";
import Estoque from "../models/Estoque.js";

// Listar todas as compras
async function listarCompras(req, res) {
  try {
    const compras = await Compra.find().populate('itens.produtoId').populate('clienteId');
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar compras", erro: error });
  }
}

// Buscar compra por ID
async function buscarCompraPorId(req, res) {
  try {
    const compra = await Compra.findById(req.params.id).populate('itens.produtoId').populate('clienteId');
    if (compra) {
      res.status(200).json(compra);
    } else {
      res.status(404).json({ mensagem: "Compra não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar compra", erro: error });
  }
}

// Criar nova compra
async function criarCompra(req, res) {
  try {
    const { clienteId, itens } = req.body;

    // Verificar se o cliente existe
    const clienteExiste = await Cliente.findById(clienteId);
    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    // Verificar se os itens existem no estoque e se a quantidade é suficiente
    for (let item of itens) {
      const produto = await Estoque.findById(item.produtoId);
      if (!produto) {
        return res.status(404).json({ mensagem: `Produto com ID ${item.produtoId} não encontrado` });
      }
      if (produto.quantidade < item.quantidade) {
        return res.status(400).json({ mensagem: `Quantidade insuficiente para o produto ${produto.nome}` });
      }
    }

    // Criar a compra
    const novaCompra = new Compra(req.body);
    const compraSalva = await novaCompra.save();

    // Atualizar a quantidade de produtos no estoque
    itens.forEach(async (item) => {
      await Estoque.findByIdAndUpdate(item.produtoId, { $inc: { quantidade: -item.quantidade } });
    });

    res.status(201).json(compraSalva);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar compra", erro: error });
  }
}

// Atualizar compra
async function atualizarCompra(req, res) {
  try {
    const compraAtualizada = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (compraAtualizada) {
      res.status(200).json(compraAtualizada);
    } else {
      res.status(404).json({ mensagem: "Compra não encontrada para atualização" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar compra", erro: error });
  }
}

// Deletar compra
async function deletarCompra(req, res) {
  try {
    const compraDeletada = await Compra.findByIdAndDelete(req.params.id);
    if (compraDeletada) {
      // Considerar a necessidade de ajustar o estoque caso a compra seja deletada
      res.status(200).json({ mensagem: "Compra deletada com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Compra não encontrada para deleção" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar compra", erro: error });
  }
}

export { listarCompras, buscarCompraPorId, criarCompra, atualizarCompra, deletarCompra };