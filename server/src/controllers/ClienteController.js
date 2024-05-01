import Cliente from "../models/Cliente.js";

// Listar todos os clientes
async function listarClientes(req, res) {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar clientes", erro: error });
  }
}

// Buscar cliente por ID
async function buscarClientePorId(req, res) {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar cliente", erro: error });
  }
}

// Criar novo cliente
async function criarCliente(req, res) {
  try {
    const novoCliente = new Cliente(req.body);
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar cliente", erro: error });
  }
}

// Atualizar cliente
async function atualizarCliente(req, res) {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (clienteAtualizado) {
      res.status(200).json(clienteAtualizado);
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado para atualização" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar cliente", erro: error });
  }
}

// Deletar cliente
async function deletarCliente(req, res) {
  try {
    const clienteDeletado = await Cliente.findByIdAndDelete(req.params.id);
    if (clienteDeletado) {
      res.status(200).json({ mensagem: "Cliente deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado para deleção" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar cliente", erro: error });
  }
}

export { listarClientes, buscarClientePorId, criarCliente, atualizarCliente, deletarCliente };