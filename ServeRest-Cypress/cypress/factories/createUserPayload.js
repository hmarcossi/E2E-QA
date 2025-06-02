function generateUserPayloadCreate(nome, email, password, administrador) {
    // Função para gerar o payload de cadastro de Usuário

    return {
      nome: nome, // Gera um nome aleatório
      email: email, // Gera um email aleatório
      password: password, // Gera uma senha aleatória
      administrador: administrador, // Define como administrador
    };
  }
  
  module.exports = {
    generateUserPayloadCreate, // Exporta a função para gerar o payload
  };