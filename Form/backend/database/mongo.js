const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

exports.connectMongodb = async (banco, collection) =>{
  await client.connect();
  const db = client.db(banco);
  return db.collection(collection);
}