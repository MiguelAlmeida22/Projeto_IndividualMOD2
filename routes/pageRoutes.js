const { Router } = require("express");
const r = Router();


r.get("/", (req, res) => {
  res.render("index", { title: "Sistema de Reservas" });
});


r.get("/salas", (req, res) => {
  res.render("salas", { title: "Salas Disponíveis" });
});


r.get("/reservas", (req, res) => {
  res.render("reservas", { title: "Lista de Reservas" });
});


r.get("/reservarUsuario", (req, res) => {
  res.render("reservarUsuario", { title: "Identificação do Usuário" });
});

r.get("/reservar-detalhes/:idUsuario", (req, res) => {
  res.render("reservarDetalhes", { title: "Detalhes da Reserva", idUsuario: req.params.idUsuario });
});

r.get("/minhasReservas", (req, res) => {
  res.render("minhasReservas", { title: "Minhas Reservas" });
});

module.exports = r;