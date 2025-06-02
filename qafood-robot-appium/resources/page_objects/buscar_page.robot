*** Variables ***

${SELECIONE_ENDEREÇO}               //android.widget.TextView[@text="Selecione seu endereço..."]
${BOTAO_PERMITIR_lOCALIZACAO}       id=android:id/button1
${ENDERECO_SELECIONADO}             xpath=//android.widget.TextView[@text="Av. Governador A. Konder, 20"]
${BUSCAR_INPUT}                     accessibility_id=search-field
${SELECT_RESTAURANTE}               xpath=//android.view.ViewGroup[@content-desc="store-list-item"]/android.view.ViewGroup[2]

${BOTAO_ADICIONAR_CARRINHO}         xpath=(//android.view.ViewGroup[@content-desc="add-item-buttom"])[1]/android.widget.ImageView
${CARRINHO_BUTTON}                  accessibility_id=open-cart-button

${CARRINHO_COM_PRODUTO}             xpath=//android.widget.TextView[@text="Total do pedido"]