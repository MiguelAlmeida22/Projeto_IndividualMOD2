const { Router } = require("express");
const c = require("../controllers/UsuarioController");
const r = Router();

r.get("/usuarios", c.list);
r.post("/usuarios", c.create);
r.get("/usuarios/:id", c.detail);
r.put("/usuarios/:id", c.update);
r.delete("/usuarios/:id", c.remove);
r.get("/usuarios/email/:email", c.findByEmail);

module.exports = r;