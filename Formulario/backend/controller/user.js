const {
  createUser,
  getAllUsers,
  getOneUser,
  putUser,
  deleteUser,
  getOneEmail,
  getName
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

exports.getName = async (req, res) => {
  try{
    const {data, status} = await getName(req.query.nome);
    if(data == null) {
      return res.status(404).json(data);
    } return res.status(status).json(data);
  } catch (error){
    return res.status(500).json({MessageError: "Erro não esperado!"})
  }
}

exports.createUsers = async (req, res) => {
  if (!req.body.nome.trim() || !req.body.email.trim() || !req.body.sobrenome.trim() || !req.body.cpf.trim() || !req.body.genero.trim() || !req.body.telefone.trim() || !req.body.cep.trim() || !req.body.rua.trim() || !req.body.bairro.trim() || !req.body.cidade.trim()|| !req.body.numero.trim() || !req.body.date.trim()) {
    return res
      .status(400)
      .json({ MessageError: "Preenchimento de campo obrigatório" });
  }
  if (req.body.email && !emailRegex(req.body.email)) {
    return res.status(400).json({ MessageError: "Email inválido" });
  }
  let consultaEmail = await getOneEmail(req.body.email);
  if (consultaEmail.data == null) {
    const { data, status } = await createUser(req.body);
    return res.status(status).json(data);
  }
  return res.status(400).json({ MessageError: "Email já cadastrado" });
};

exports.put = async (req, res) => {
  try {
    let consultaId = await getOneUser(req.params.id);
    if (consultaId.data != null) {
      if (!req.body.nome.trim() || !req.body.email.trim() || !req.body.sobrenome.trim() || !req.body.cpf.trim() || !req.body.genero.trim() || !req.body.telefone.trim() || !req.body.cep.trim() || !req.body.rua.trim() || !req.body.bairro.trim() || !req.body.cidade.trim()|| !req.body.numero.trim() || !req.body.date.trim() ) {
        return res
          .status(400)
          .json({ MessageError: "Preenchimento de campo obrigatório" });
      }
      if (req.body.email && !emailRegex(req.body.email)) {
        return res.status(400).json({ MessageError: "Email inválido" });
      }
        const { data, status } = await putUser(req.params.id, req.body);
        return res.status(status).json(data);
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
