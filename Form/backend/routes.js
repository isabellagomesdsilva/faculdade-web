const { getAllClients, create, put, deleteClient, getOneClient } = require("./controller");

module.exports = (app) => {
  app.get("/client/all", getAllClients);
  app.get("/client/:id", getOneClient)
  app.post("/client", create);
  app.put("/client/:id", put);
  app.delete("/client/:id", deleteClient);
};
