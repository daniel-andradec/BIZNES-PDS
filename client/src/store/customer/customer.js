export default {
    state: {
        customer: {
            name: 'Pedro Henrique Santos',
            email: 'pedrin18k@yahoo.com',
            passwordMD5: '12345678',
            cpf: '12345678910',
            phone: '12345678910',
            birthDate: '05/11/1995',
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
        getCustomerData(state) {
            return state.customer;
        }
    }
}