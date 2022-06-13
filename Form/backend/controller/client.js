const {
  create,
  getClients,
  getOne,
  put,
  remove
} = require("../model/client");

exports.getAllClients = async (req, res) => {
  try {
    const { data, status } = await getClients();
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ Error: "Error!" });
  }
};

exports.getOneClient = async (req, res) => {
  try {
    const { data, status } = await getOne(req.params.id);
    if (data == null) {
      return res.status(404).json({Error: "Cliente não encontrado!"});
    }
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ Error: "Error!" });
  }
};

exports.create = async (req, res) => {
  try {
    const { data, status } = await create(req.body);
    return res.status(status).json({ _id: data._id });
  } catch (error) {
    return res.status(500).json({ Error: "Error!" });
  }
};

exports.put = async (req, res) => {
  try {
    let iD = await getOne(req.params.id);
    if (iD.data == null) {
      return res.status(404).json({ Error: "Cliente não encontrado!" });
    }
    const { data, status } = await put(req.params.id, req.body);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ Error: "Error!" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { data, status } = await remove(req.params.id);
    if (data == null) {
      return res.status(404).json({ Error: "Não encontrado!" });
    }
    return res.status(status).json({ Message: "Usuário deletado!" });
  } catch (error) {
    return res.status(500).json({ Error: "Error!" });
  }
};
