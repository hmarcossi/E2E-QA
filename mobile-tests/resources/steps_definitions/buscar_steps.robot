*** Keywords ***

Seleciona endereco
    Wait Until Element Is Visible    ${SELECIONE_ENDEREÇO}
    Click Element     ${SELECIONE_ENDEREÇO}
    Wait Until Element Is Visible    ${BOTAO_PERMITIR_lOCALIZACAO}
    Click Element     ${BOTAO_PERMITIR_lOCALIZACAO}
    Wait Until Element Is Visible    ${ENDERECO_SELECIONADO}

Buscar Restaurante
    [Arguments]       ${RESTAURANTE}
    Wait Until Element Is Visible            ${BUSCAR_INPUT}
    Input Text        ${BUSCAR_INPUT}        ${RESTAURANTE}

Escolhe Restaurante
    Wait Until Element Is Visible            ${SELECT_RESTAURANTE}
    Click Element     ${SELECT_RESTAURANTE}


Adicionar produto ao carrinho
    Wait Until Element Is Visible    ${BOTAO_ADICIONAR_CARRINHO}
    Click Element     ${BOTAO_ADICIONAR_CARRINHO}

Confere carrinho com produto
    Click Element                    ${CARRINHO_BUTTON}
    Wait Until Element Is Visible    xpath=//android.widget.TextView[@text='Sacola']
    Element Should Be Visible        ${CARRINHO_COM_PRODUTO}

