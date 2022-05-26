const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

exports.connectMongodb = async (dbName,collection) =>{
  await client.connect();
  console.log("Servidor conectado com sucesso");
  const db = client.db(dbName);
  return db.collection(collection);
}