function generateProductPayloadCreate(nome, preco, descricao, quantidade) {
    // Função para gerar o payload de cadastro de Produto

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