const usuarioRepo = require("../repositories/usuarioRepository");

/* Regras de domínio
   ------------------
   1. O nome não pode ser um reservado do sistema.
   2. O e-mail deve pertencer a um domínio permitido.
   3. Não pode haver dois usuários com o mesmo e-mail.
   4. O nome deve ter pelo menos 3 caracteres.
*/

const DOMINIOS_PERMITIDOS = ["empresa.com.br", "exemplo.com", "gmail.com", "hotmail.com"];
const NOMES_RESERVADOS = new Set(["admin", "root", "system", "administrador", "usuario"]);

function validarNome(nome) {
  if (!nome || nome.trim().length < 3) {
    throw new Error("Nome deve ter pelo menos 3 caracteres.");
  }
  
  if (NOMES_RESERVADOS.has(nome.toLowerCase())) {
    throw new Error("Nome de usuário reservado.");
  }
}

function validarDominioEmail(email) {
  const dominio = email.split("@")[1]?.toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    throw new Error(`Domínio de e-mail não permitido: ${dominio}`);
  }
}

async function validarEmailUnico(email, ignorarId = null) {
  const existente = await usuarioRepo.findByEmail(email);
  if (existente && existente.id_usuario !== ignorarId) {
    throw new Error("E-mail já cadastrado.");
  }
}

module.exports = {
  /* CRUD + validações */
  async create(payload) {
    validarNome(payload.nome);
    validarDominioEmail(payload.email);
    await validarEmailUnico(payload.email);
    return usuarioRepo.create(payload);
  },

  async list() {
    return usuarioRepo.findAll();
  },

  async detail(id) {
    const usuario = await usuarioRepo.findById(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  },

  async update(id, payload) {
    if (payload.nome) validarNome(payload.nome);
    if (payload.email) {
      validarDominioEmail(payload.email);
      await validarEmailUnico(payload.email, id);
    }
    return usuarioRepo.update(id, payload);
  },

  async remove(id) {
    const usuario = await usuarioRepo.findById(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuarioRepo.remove(id);
  },

  async findByEmail(email) {
    return usuarioRepo.findByEmail(email);
  }
};