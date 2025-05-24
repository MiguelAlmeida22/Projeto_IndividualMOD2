const svc = require("../services/reservaService");
const pool = require('../config/database');

exports.create = async (req, res) => {
  try {
    const reserva = await svc.create(req.body);
    res.status(201).json(reserva);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const reservas = await svc.list();
    res.json(reservas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const reserva = await svc.detail(req.params.id);
    res.json(reserva);
  } catch (e) {
    if (e.message === "Reserva não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.update = async (req, res) => {
  try {
    const reserva = await svc.update(req.params.id, req.body);
    res.json(reserva);
  } catch (e) {
    if (e.message === "Reserva não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(400).json({ error: e.message });
    }
  }
};

exports.remove = async (req, res) => {
  try {
    await svc.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    if (e.message === "Reserva não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(400).json({ error: e.message });
    }
  }
};

exports.findByUsuario = async (req, res) => {
  try {
    const reservas = await svc.findByUsuario(req.params.idUsuario);
    res.json(reservas);
  } catch (e) {
    if (e.message === "Usuário não encontrado.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.findBySala = async (req, res) => {
  try {
    const reservas = await svc.findBySala(req.params.idSala);
    res.json(reservas);
  } catch (e) {
    if (e.message === "Sala não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: e.message });
    }
  }
};

exports.withUserAndRoomDetails = async (_, res) => {
  try {
    const reservas = await svc.withUserAndRoomDetails();
    res.json(reservas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { idSala, dataInicio, dataFim } = req.query;
    
    if (!idSala || !dataInicio || !dataFim) {
      return res.status(400).json({ 
        error: "Parâmetros obrigatórios: idSala, dataInicio, dataFim" 
      });
    }
    
    const resultado = await svc.checkAvailability(idSala, dataInicio, dataFim);
    res.json(resultado);
  } catch (e) {
    if (e.message === "Sala não encontrada.") {
      res.sendStatus(404);
    } else {
      res.status(400).json({ error: e.message });
    }
  }
};