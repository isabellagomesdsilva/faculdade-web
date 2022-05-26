const { getAllUsers, createUsers, getOneUsers} = require("../controller/user");

module.exports = (app) => {
  app.get("/user/all", getAllUsers);
  app.get(
    "/user",
    getOneUsers
  );
  app.post("/user", createUsers);
};
