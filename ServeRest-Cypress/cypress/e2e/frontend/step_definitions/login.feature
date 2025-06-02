Feature: Login

Scenario: Login valido
Given teste
When preencho email "teste@qa.com" e senha "teste"
Then vejo a mensagem "Login realizado com sucesso" 