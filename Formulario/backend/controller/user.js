const {
  createUser,
  getAllUsers,
  getOneEmail
} = require("../model/user");

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
    const { data, status } = await getOneEmail(req.query.email);
    return res.status(status).json(data);
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const { data: retorno, status } = await createUser(req.body);
    return res.status(status).json(retorno);
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
};



/* exports.put = async (req, res) => {
  try {
    const { data: retorno, status } = await putUser(req.params.id, req.body);
    res.status(status).json(retorno);
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { data: retorno, status } = await deleteUser(req.params.id);
    return res.status(status).json(retorno);
  } catch (error) {
    return res.status(500).json({ MessageError: "Erro não esperado!" });
  }
}; */
