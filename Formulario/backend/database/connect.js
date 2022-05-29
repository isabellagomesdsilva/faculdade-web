const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

exports.connectMongodb = async (dbName,collection) =>{
  await client.connect();
  const db = client.db(dbName);
  return db.collection(collection);
}