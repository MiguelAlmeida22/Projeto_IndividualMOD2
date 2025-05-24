const svc = require("../services/usuarioService");
const pool = require('../config/database');

exports.create = async (req, res) => {
  try {
    const usuario = await svc.create(req.body);
    res.status(201).json(usuario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const usuarios = await svc.list();
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const usuario = await svc.detail(req.params.id);
    res.json(usuario);
  } catch (e) {
    if (e.message === "Usuário não encontrado.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.update = async (req, res) => {
  try {
    const usuario = await svc.update(req.params.id, req.body);
    res.json(usuario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await svc.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    if (e.message === "Usuário não encontrado.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.findByEmail = async (req, res) => {
  try {
    const usuario = await svc.findByEmail(req.params.email);
    usuario ? res.json(usuario) : res.sendStatus(404);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};