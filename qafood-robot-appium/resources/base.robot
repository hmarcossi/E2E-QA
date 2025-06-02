*** Settings ***
Library    AppiumLibrary
Library    String
Library    FakerLibrary


Resource    common_variables.robot
Resource    page_objects\\login_page.robot
Resource    steps_definitions\\login_steps.robot
Resource    page_objects\\buscar_page.robot
Resource    steps_definitions\\buscar_steps.robot




*** Variables ***

${EMAIL_USER}         teste@teste.com
${SENHA_USER}         123456



*** Keywords ***
Abrir App Delivery
    Open Application    http://localhost:4723
    ...                 automationName=UiAutomator2
    ...                 platformName=Android
    ...                 deviceName=emulator-5554
    ...                 app=${CURDIR}\\..\\apk\\qafood.apk

Realiza Login    
    [Arguments]    ${EMAIL}     ${SENHA}
    Wait Until Element Is Visible           ${TITULO_INICIAL}
    Input Text      ${EMAIL_INPUT}          ${EMAIL}
    Input Text      ${PASSWORD_INPUT}       ${SENHA}
    Click Element   ${LOGIN_BUTTON}


Tira Screenshot 
    [Arguments]    ${NOME_ARQUIVO}
    Sleep    5
    Capture Page Screenshot    ${NOME_ARQUIVO}