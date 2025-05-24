const svc = require("../services/salaService");
const pool = require('../config/database');

exports.create = async (req, res) => {
  try {
    const sala = await svc.create(req.body);
    res.status(201).json(sala);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const salas = await svc.list();
    res.json(salas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const sala = await svc.detail(req.params.id);
    res.json(sala);
  } catch (e) {
    if (e.message === "Sala não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.update = async (req, res) => {
  try {
    const sala = await svc.update(req.params.id, req.body);
    res.json(sala);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await svc.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    if (e.message === "Sala não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.findAvailable = async (_, res) => {
  try {
    const salas = await svc.findAvailable();
    res.json(salas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const sala = await svc.updateAvailability(req.params.id, req.body.disponivel);
    res.json(sala);
  } catch (e) {
    if (e.message === "Sala não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(400).json({ error: e.message });
    }
  }
};

exports.withReservationCounts = async (_, res) => {
  try {
    const salas = await svc.withReservationCounts();
    res.json(salas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};