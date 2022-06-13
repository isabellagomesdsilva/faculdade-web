const { connectMongodb } = require("./mongo");
const { ObjectId } = require("mongodb");

exports.create = async ({
  nome,
  date,
  cpf,
  celular,
  cep,
  rua,
  bairro,
  cidade,
  numero,
  email,
  numCart,
  bandeira,
  nomeCart,
  CPFprop,
  cvv,
}) => {
  const collection = await connectMongodb("projectWeb", "clients");
  const { insertId } = await collection.insertOne({
    nome,
    date,
    cpf,
    celular,
    cep,
    rua,
    bairro,
    cidade,
    numero,
    email,
    numCart,
    bandeira,
    nomeCart,
    CPFprop,
    cvv,
  });
  return {
    data: {
      _id: insertId,
      nome,
      date,
      cpf,
      celular,
      cep,
      rua,
      bairro,
      cidade,
      numero,
      email,
      numCart,
      bandeira,
      nomeCart,
      CPFprop,
      cvv,
    },
    status: 201,
  };
};
exports.getClients = async () => {
  const collection = await connectMongodb("projectWeb", "clients");
  const data = await collection.find().toArray();
  return { data, status: 200 };
};
exports.getOne = async (id) => {
  const collection = await connectMongodb("projectWeb", "clients");
  const data = await collection.findOne({ _id: ObjectId(id) });
  return { data, status: 200 };
};
exports.put = async (id, { nome,
  date,
  cpf,
  celular,
  cep,
  rua,
  bairro,
  cidade,
  numero,
  email,
  numCart,
  bandeira,
  nomeCart,
  CPFprop,
  cvv }) => {
  const collection = await connectMongodb("projectWeb", "clients");
  await collection.updateOne({ _id: ObjectId(id) }, { $set: { nome,
    date,
    cpf,
    celular,
    cep,
    rua,
    bairro,
    cidade,
    numero,
    email,
    numCart,
    bandeira,
    nomeCart,
    CPFprop,
    cvv } });
  return { data: { _id: id, nome,
    date,
    cpf,
    celular,
    cep,
    rua,
    bairro,
    cidade,
    numero,
    email,
    numCart,
    bandeira,
    nomeCart,
    CPFprop,
    cvv }, status: 200 };
};
exports.remove = async (id) => {
  const collection = await connectMongodb("projectWeb", "clients");
  const client = await collection.findOne({ _id: ObjectId(id) });
  if (client == null) {
    return { data: null, status: 404 };
  }
  const data = await collection.deleteOne({ _id: ObjectId(id) });
  return { data: data, status: 200 };
};
