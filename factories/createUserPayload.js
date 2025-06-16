function generateUserPayloadCreate(nome, email, password, administrador) {
    return {
      nome: nome,
      email: email,
      password: password,
      administrador: administrador,
    };
  }
  
  module.exports = {
    generateUserPayloadCreate,
  };