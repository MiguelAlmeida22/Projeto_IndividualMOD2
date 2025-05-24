const salaRepo = require("../repositories/salaRepository");

/* Regras de domínio
   ------------------
   1. O número da sala deve ser único.
   2. A capacidade deve ser maior que zero.
   3. Salas com reservas ativas não podem ser removidas.
   4. Localização deve ser informada.
*/

const CAPACIDADE_MINIMA = 1;
const CAPACIDADE_MAXIMA = 200;

function validarNumero(numero) {
  if (!numero || numero.toString().trim().length === 0) {
    throw new Error("Número da sala é obrigatório.");
  }
}

function validarCapacidade(capacidade) {
  if (!Number.isInteger(capacidade) || capacidade < CAPACIDADE_MINIMA || capacidade > CAPACIDADE_MAXIMA) {
    throw new Error(`Capacidade deve ser um número inteiro entre ${CAPACIDADE_MINIMA} e ${CAPACIDADE_MAXIMA}.`);
  }
}

function validarLocalizacao(localizacao) {
  if (!localizacao || localizacao.trim().length < 3) {
    throw new Error("Localização deve ter pelo menos 3 caracteres.");
  }
}

async function validarNumeroUnico(numero, ignorarId = null) {
  const existente = await salaRepo.findByNumero(numero);
  if (existente && existente.id_sala !== ignorarId) {
    throw new Error("Número da sala já está em uso.");
  }
}

module.exports = {
  /* CRUD + validações */
  async create(payload) {
    validarNumero(payload.numero);
    validarCapacidade(payload.capacidade);
    validarLocalizacao(payload.localizacao);
    await validarNumeroUnico(payload.numero);
    
    // Define disponível como true por padrão se não informado
    if (payload.disponivel === undefined) {
      payload.disponivel = true;
    }
    
    return salaRepo.create(payload);
  },

  async list() {
    return salaRepo.findAll();
  },

  async detail(id) {
    const sala = await salaRepo.findById(id);
    if (!sala) {
      throw new Error("Sala não encontrada.");
    }
    return sala;
  },

  async update(id, payload) {
    if (payload.numero) {
      validarNumero(payload.numero);
      await validarNumeroUnico(payload.numero, id);
    }
    if (payload.capacidade !== undefined) validarCapacidade(payload.capacidade);
    if (payload.localizacao) validarLocalizacao(payload.localizacao);
    
    return salaRepo.update(id, payload);
  },

  async remove(id) {
    const sala = await salaRepo.findById(id);
    if (!sala) {
      throw new Error("Sala não encontrada.");
    }
    
    // Verificar se há reservas para esta sala seria ideal aqui
    // const reservas = await reservaRepo.findBySala(id);
    // if (reservas.length > 0) {
    //   throw new Error("Não é possível remover sala com reservas cadastradas.");
    // }
    
    return salaRepo.remove(id);
  },

  async findAvailable() {
    return salaRepo.findAvailable();
  },

  async updateAvailability(id, disponivel) {
    const sala = await salaRepo.findById(id);
    if (!sala) {
      throw new Error("Sala não encontrada.");
    }
    
    if (typeof disponivel !== 'boolean') {
      throw new Error("Status de disponibilidade deve ser true ou false.");
    }
    
    return salaRepo.updateAvailability(id, disponivel);
  },

  async withReservationCounts() {
    return salaRepo.withReservationCounts();
  }
};
