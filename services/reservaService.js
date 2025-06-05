const reservaRepo = require("../repositories/reservaRepository");
const usuarioRepo = require("../repositories/usuarioRepository");
const salaRepo = require("../repositories/salaRepository");

/* Regras de domínio
   ------------------
   1. Não pode haver sobreposição de horários para a mesma sala.
   2. Data de início deve ser anterior à data de fim.
   3. Não pode reservar para o passado.
   4. Sala deve estar disponível.
   5. Usuário e sala devem existir.
   6. Reserva deve ter no mínimo 15 minutos de duração.
*/

const DURACAO_MINIMA_MINUTOS = 15;
const DURACAO_MAXIMA_HORAS = 4;

function validarDatas(dataInicio, dataFim) {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  const agora = new Date();
  
  if (inicio >= fim) {
    throw new Error("Data de início deve ser anterior à data de fim.");
  }
  
  if (inicio <= agora) {
    throw new Error("Não é possível fazer reservas para o passado.");
  }
  
  const duracaoMinutos = (fim - inicio) / (1000 * 60);
  if (duracaoMinutos < DURACAO_MINIMA_MINUTOS) {
    throw new Error(`Reserva deve ter no mínimo ${DURACAO_MINIMA_MINUTOS} minutos de duração.`);
  }
  
  const duracaoHoras = duracaoMinutos / 60;
  if (duracaoHoras > DURACAO_MAXIMA_HORAS) {
    throw new Error(`Reserva deve ter no máximo ${DURACAO_MAXIMA_HORAS} horas de duração.`);
  }
}

async function validarUsuarioExiste(idUsuario) {
  const usuario = await usuarioRepo.findById(idUsuario);
  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }
  return usuario;
}

async function validarSalaExiste(idSala) {
  const sala = await salaRepo.findById(idSala);
  if (!sala) {
    throw new Error("Sala não encontrada.");
  }
  return sala;
}

async function validarSalaDisponivel(idSala) {
  const sala = await salaRepo.findById(idSala);
  if (!sala.disponivel) {
    throw new Error("Sala não está disponível para reserva.");
  }
}

async function validarConflitosHorario(idSala, dataInicio, dataFim, excludeReservaId = null) {
  const conflitos = await reservaRepo.findConflicts(idSala, dataInicio, dataFim, excludeReservaId);
  if (conflitos.length > 0) {
    throw new Error("Já existe uma reserva para este horário nesta sala.");
  }
}

module.exports = {
  
  async create(payload) {
    
    validarDatas(payload.data_inicio, payload.data_fim);
    
    
    await validarUsuarioExiste(payload.id_usuario);
    await validarSalaExiste(payload.id_sala);
    await validarSalaDisponivel(payload.id_sala);
    
    
    await validarConflitosHorario(payload.id_sala, payload.data_inicio, payload.data_fim);
    
    
    if (!payload.reservado_em) {
      payload.reservado_em = new Date();
    }
    
    
    const reservaCriada = await reservaRepo.create(payload);

    
    await salaRepo.updateAvailability(payload.id_sala, false);

    return reservaCriada;
  },

  async list() {
    return reservaRepo.findAll();
  },

  async detail(id) {
    const reserva = await reservaRepo.findById(id);
    if (!reserva) {
      throw new Error("Reserva não encontrada.");
    }
    return reserva;
  },

  async update(id, payload) {
    const reservaExistente = await reservaRepo.findById(id);
    if (!reservaExistente) {
      throw new Error("Reserva não encontrada.");
    }
    
    
    if (payload.data_inicio || payload.data_fim) {
      const dataInicio = payload.data_inicio || reservaExistente.data_inicio;
      const dataFim = payload.data_fim || reservaExistente.data_fim;
      
      validarDatas(dataInicio, dataFim);
      
      const idSala = payload.id_sala || reservaExistente.id_sala;
      await validarConflitosHorario(idSala, dataInicio, dataFim, id);
    }
    
    
    if (payload.id_usuario) await validarUsuarioExiste(payload.id_usuario);
    if (payload.id_sala) {
      await validarSalaExiste(payload.id_sala);
      await validarSalaDisponivel(payload.id_sala);
    }
    
    return reservaRepo.update(id, payload);
  },

  async remove(id) {
    const reserva = await reservaRepo.findById(id);
    if (!reserva) {
      throw new Error("Reserva não encontrada.");
    }
    
    
    const agora = new Date();
    const dataInicio = new Date(reserva.data_inicio);
    if (dataInicio <= agora) {
      throw new Error("Não é possível cancelar reservas que já iniciaram ou estão em andamento.");
    }
    
    return reservaRepo.remove(id);
  },

  async findByUsuario(idUsuario) {
    await validarUsuarioExiste(idUsuario);
    return reservaRepo.findByUsuario(idUsuario);
  },

  async findBySala(idSala) {
    await validarSalaExiste(idSala);
    return reservaRepo.findBySala(idSala);
  },

  async withUserAndRoomDetails() {
    return reservaRepo.withUserAndRoomDetails();
  },

  async checkAvailability(idSala, dataInicio, dataFim) {
    await validarSalaExiste(idSala);
    validarDatas(dataInicio, dataFim);
    
    const conflitos = await reservaRepo.findConflicts(idSala, dataInicio, dataFim);
    return {
      disponivel: conflitos.length === 0,
      conflitos: conflitos
    };
  }
};