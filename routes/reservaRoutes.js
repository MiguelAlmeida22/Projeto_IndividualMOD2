const { Router } = require("express");
const c = require("../controllers/reservaController");
const r = Router();

r.get("/reservas", c.list);
r.post("/reservas", c.create);
r.get("/reservas/:id", c.detail);
r.put("/reservas/:id", c.update);
r.delete("/reservas/:id", c.remove);
r.get("/reservas/usuario/:idUsuario", c.findByUsuario);
r.get("/reservas/sala/:idSala", c.findBySala);
r.get("/reservas-detalhadas", c.withUserAndRoomDetails);
r.get("/disponibilidade", c.checkAvailability);

module.exports = r;