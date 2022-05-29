const { getAllUsers, createUsers, put, remove, getOneUsers } = require("../controller/user");

module.exports = (app) => {
  app.get("/user/all", getAllUsers);
  app.get("/user/:id", getOneUsers)
  app.post("/user", createUsers);
  app.put("/user/:id", put);
  app.delete("/user/:id", remove);
};
