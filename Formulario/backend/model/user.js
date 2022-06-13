const { connectMongodb } = require("../database/connect");
const { ObjectId } = require("mongodb");

exports.getAllUsers = async (page = 0, limit = 10) => {
  const collection = await connectMongodb("faculdade_web", "web");
  const skip = page > 0 ? page * limit : 0;
  const [data] = await collection
    .aggregate([
      {
        $facet: {
          metaData: [{ $count: "total" }, { $addFields: { page } }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
    ])
    .toArray();
  return { data, status: 200 };
};

exports.getOneUser = async (id) => {
  const collection = await connectMongodb("faculdade_web", "web");
  const data = await collection.findOne({ _id: ObjectId(id) });
  return { data, status: 200 };
};

exports.createUser = async ({
  nome,
  sobrenome,
  cpf,
  genero,
  telefone,
  cep,
  rua,
  bairro,
  cidade,
  numero,
  email,
  date,
}) => {
  const collection = await connectMongodb("faculdade_web", "web");
  const { insertedId } = await collection.insertOne({
    nome,
    sobrenome,
    cpf,
    genero,
    telefone,
    cep,
    rua,
    bairro,
    cidade,
    numero,
    email,
    date,
  });
  console.log(insertedId);
  return {
    data: {
      _id: insertedId,
    },
    status: 201,
  };
};

exports.putUser = async (
  id,
  {
    nome,
    sobrenome,
    cpf,
    genero,
    telefone,
    cep,
    rua,
    bairro,
    cidade,
    numero,
    email,
    date,
  }
) => {
  const collection = await connectMongodb("faculdade_web", "web");
  await collection.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        nome,
        sobrenome,
        cpf,
        genero,
        telefone,
        cep,
        rua,
        bairro,
        cidade,
        numero,
        email,
        date,
      },
    }
  );
  return {
    data: {
      _id: id,
      nome,
      sobrenome,
      cpf,
      genero,
      telefone,
      cep,
      rua,
      bairro,
      cidade,
      numero,
      email,
      date,
    },
    status: 200,
  };
};

exports.deleteUser = async (id) => {
  const collection = await connectMongodb("faculdade_web", "web");
  const dUser = await collection.findOne({ _id: ObjectId(id) });
  if (dUser == null) {
    return { data: null, status: 404 };
  }
  const data = await collection.deleteOne({ _id: ObjectId(id) });
  return { data: data, status: 200 };
};

exports.getOneEmail = async (email) => {
  const collection = await connectMongodb("faculdade_web", "web");
  const data = await collection.findOne({ email: email });
  return { data, status: 200 };
};