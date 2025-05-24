const { Router } = require("express");
const c = require("../controllers/salaController");
const r = Router();

r.get("/salas", c.list);
r.post("/salas", c.create);
r.get("/salas/:id", c.detail);
r.put("/salas/:id", c.update);
r.delete("/salas/:id", c.remove);
r.get("/salas-disponiveis", c.findAvailable);
r.patch("/salas/:id/disponibilidade", c.updateAvailability);
r.get("/salas-com-reservas", c.withReservationCounts);

module.exports = r;