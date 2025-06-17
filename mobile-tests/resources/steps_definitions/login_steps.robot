*** Keywords ***

Verifica login com sucesso
    Wait Until Page Contains Element            ${SELECIONE_ENDEREÇO}

Verifica login com erro
    Wait Until Page Contains Element            ${ERRO_LOGIN}
    Element Should Be Visible                   ${ERRO_LOGIN}

Clicar no botão de login
    Wait Until Page Contains Element            ${LOGIN_BUTTON}
    Click Element                               ${LOGIN_BUTTON}

Realiza Logout
    Press Keycode  4

Verifica logout com sucesso
    Wait Until Page Contains Element       ${TITULO_INICIAL}
    Element Should Be Visible              ${TITULO_INICIAL}
