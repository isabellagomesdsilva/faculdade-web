const {
  createUser,
  getAllUsers,
  getOneUser,
  putUser,
  deleteUser,
  getOneEmail
} = require("../model/user");

const { emailRegex } = require("../validation/emailValidator");

exports.getAllUsers = async (req, res) => {
  try {
    let { page = 0, limit = 10 } = req.query;
    const { data: retorno, status } = await getAllUsers(
      Number(page),
      Number(limit)
    );
    return res.status(status).json(retorno);
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
};

exports.getOneUsers = async (req, res) => {
  try {
    const { data, status } = await getOneUser(req.params.id);
    if (data == null) {
      return res.status(404).json({ MessageError: "Não encontrado!" });
    }
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const { data, status } = await createUser(req.body);
    return res.status(status).json({ _id: data._id });
  } catch (error) {
    return res.status(500).json({ MessageError: error });
  }
};

exports.put = async (req, res) => {
  try {
    let consultaId = await getOneUser(req.params.id);
    if (consultaId.data != null) {
      if (!req.body.nome.trim() || !req.body.email.trim()) {
        return res
          .status(400)
          .json({ MessageError: "Preenchimento de campo obrigatório" });
      }
      if (req.body.email && !emailRegex(req.body.email)) {
        return res.status(400).json({ MessageError: "Email inválido" });
      }
      let consultaEmail = await getOneEmail(req.body.email);
      if (consultaEmail.data == null) {
        const { data, status } = await putUser(req.params.id, req.body);
        return res.status(status).json(data);
      }
      return res.status(400).json({ MessageError: "Email já cadastrado" });
    }
    return res.status(404).json({ MessageError: "ID não cadastrado" });
  } catch {
    res.status(400).json({ MessageError: "Erro não esperado!" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { data, status } = await deleteUser(req.params.id);
    if (data == null) {
      return res.status(404).json({ MessageError: "Não encontrado!" });
    }
    return res.status(status).json({ Message: "Usuário deletado!" });
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
};
