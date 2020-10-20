const { Router } = require("express");
const UserController = require("./Controllers/Http/User/UserController");

var routes = Router();

//Busca 01(um) usuário pelo e-mail
routes.get("/find-user", UserController.index);

//Inseri 01(um) novo usuário
routes.post("/create-user", UserController.store);

//Lista todos os usuário
routes.get("/list-users", UserController.show);

//Atualiza os dados do usuário
// routes.put("/update-user", UserController.update);

//Deleta um usuário
routes.delete("/delete-user/:id?", UserController.delete);

//Envia email's
routes.post("/send-mail", UserController.sendEmail);

module.exports = routes;
