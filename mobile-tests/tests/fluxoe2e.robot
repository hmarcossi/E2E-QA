*** Settings ***
Resource    ../resources/base.robot

Test Setup      Abrir App Delivery
Suite Teardown   Close Application

*** Test Cases ***
Cenario 1: Login com credenciais válidas
    [Tags]    login
    Realiza Login    teste@teste.com    123456
    Verifica login com sucesso
    Tira Screenshot    login_sucesso.png

Cenario 2: Login com senha inválida
    Realiza Login    email_invalido@teste.com    123456
    Verifica login com erro
    Tira Screenshot    login_erro.png

Cenario 3: Login com campos vazios
    Clicar no botão de login
    Verifica login com erro
    Tira Screenshot    login_em_branco_erro.png

Cenario 4: Logout com sucesso 
    Realiza Login    ${EMAIL_USER}    ${SENHA_USER}
    Realiza Logout
    Verifica logout com sucesso
    Tira Screenshot    logout_sucesso.png

Cenario 5: Buscar restaurante
    Realiza Login    ${EMAIL_USER}    ${SENHA_USER}
    Verifica Login com sucesso
    Seleciona endereco
    Buscar Restaurante    Pizza

Cenario 6: Adicionar produto ao carrinho
    [Tags]    carrinho
    Realiza Login    ${EMAIL_USER}    ${SENHA_USER}
    Verifica Login com sucesso
    Seleciona endereco
    Buscar Restaurante    Pizza
    Escolhe Restaurante
    Adicionar produto ao carrinho
    Tira Screenshot    produto_adicionado.png
    Confere carrinho com produto
    Tira Screenshot    carrinho_com_produto.png