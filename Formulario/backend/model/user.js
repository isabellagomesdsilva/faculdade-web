const { connectMongodb } = require("../database/connect");
const { ObjectId } = require("mongodb");

exports.getAllUsers = async (page = 0, limit = 10) => {
  console.log("oi")
  const  collection  = await connectMongodb("faculdade_web", "web");
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
  return { data, status: 200 }
};

exports.getOneUser = async (id) => {
  const collection = await connectMongodb("faculdade_web", "web");
  const data = await collection.findOne({ name: `${id}` });
  return { data, status: 200 };
};

exports.createUser = async ({nome, sobrenome, cpf, genero, telefone, cep, rua, bairro, cidade, numero, email, senha, date}) => {
  const  collection  = await connectMongodb("faculdade_web", "web");
  const { insertedId } = await collection.insertOne({nome, sobrenome, cpf, genero, telefone, cep, rua, bairro, cidade, numero, email, senha, date});
  return { data: { _id: insertedId, nome, sobrenome, cpf, gereno, telefone, cep, rua, bairro, cidade, numero, email, senha, date }, status: 201 };
};

/* exports.putUser = async (id, { name, email }) => {
  const { collection } = await connectMongodb("faculdade_web", "web");
  await collection.updateOne({ _id: ObjectId(id) }, { $set: { name, email } });
  return { data: { _id: id, name, email }, status: 200 };
}; */

/* exports.deleteUser = async (id) => {
  const { collection } = await connectMongodb("faculdade_web", "web");
  const dUser = await collection.findOne({ _id: ObjectId(id) });
  const data = await collection.deleteOne({ _id: ObjectId(id) });
  return { data: dUser, status: 200 };
}; */
