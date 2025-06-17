function generateProductPayloadCreate(nome, preco, descricao, quantidade) {
    return {
      nome: nome,
      preco: preco,
      descricao: descricao,
      quantidade: quantidade,
    };
  }
  
  module.exports = {
    generateProductPayloadCreate,
  };