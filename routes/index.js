const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const SalaController = require('../controllers/SalaController');
const ReservaController = require('../controllers/ReservaController');


router.post('/usuarios', UsuarioController.criarUsuario);
router.get('/usuarios', UsuarioController.listarUsuarios);
router.put('/usuarios/:id_usuario', UsuarioController.editarUsuario);
router.delete('/usuarios/:id_usuario', UsuarioController.excluirUsuario);

router.post('/salas', SalaController.criarSala);
router.get('/salas', SalaController.listarSalas);
router.put('/salas/:id_sala', SalaController.editarSala);
router.delete('/salas/:id_sala', SalaController.excluirSala);

router.post('/reservas', ReservaController.criarReserva);
router.get('/reservas', ReservaController.listarReservas);
router.put('/reservas/:id_reserva', ReservaController.editarReserva);
router.delete('/reservas/:id_reserva', ReservaController.excluirReserva);

module.exports = router;
