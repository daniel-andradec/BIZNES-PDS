export default {
    state: {
        vendor: {
            socialName: 'Fastsell',
            fantasyName: 'Fastsell',
            phone: '12345678910',
            cnpj: '12345678910111',
            login: 'fastsell@biznes',
            passwordMD5: '12345678',
            returnPolicy: 'Nos termos da Política de Troca e Devolução da Fast Shop, o Cliente poderá solicitar a devolução e obter a consequente restituição do valor pago nas compras realizadas fora do estabelecimento comercial da Fast Shop- e desde que o produto não esteja tenha sido utilizado, acompanhe a nota fiscal, embalagem original e todos os acessórios, inclusive manual. Essa solicitação deverá ser feita em até 07 (sete) dias corridos a contar da data de recebimento do produto, através do Serviço de Atendimento ao Cliente (SAC) pelo telefone (11) 3232.3200 ou através do chat, formulário ou e-mail, ambos disponibilizados através do site: www.fastshop.com.br/web/i/fale_conosco.',
            address: {
                street: 'Avenida Antônio Carlos',
                number: '1014',
                complement: 'Apto 502',
                neighborhood: 'Pampulha',
                city: 'Belo Horizonte',
                state: 'MG',
                zipCode: '30130171'
            }
        }
    },
    mutations: {
    },
    actions: {},
    getters: {
        getVendorData(state) {
            return state.vendor;
        }
    }
}