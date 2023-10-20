export default {
    state: {
        vendor: {},
        vendorStock: [],
        vendorSales: [
            {
                id: 1,
                customer: 'João da Silva',
                date: '30/07/2023',
                total: 157.00,
                city: 'Belo Horizonte',
                deliveryDate: '02/08/2023',
                paymentMethod: 'Cartão de Crédito',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Rua A',
                    city: 'Belo Horizonte',
                    state: 'Minas Gerais',
                    complement: 'Apto 101',
                    number: '123',
                    zipCode: '30350230'
                },
                products: [
                    { id: 1, quantity: 2, option: ['Cinza'] },
                    { id: 3, quantity: 1, option: ['Cinza'] },
                    { id: 5, quantity: 1, option: ['Cinza'] },
                    { id: 7, quantity: 1, option: ['Cinza'] },
                    { id: 9, quantity: 1, option: ['Cinza'] },
                    { id: 11, quantity: 1, option: ['Cinza'] },
                    { id: 13, quantity: 1, option: ['Cinza'] },
                    { id: 15, quantity: 1, option: ['Cinza'] },
                    { id: 17, quantity: 1, option: ['Cinza'] },
                    { id: 19, quantity: 1, option: ['Cinza'] }
                ]
            },
            {
                id: 2,
                customer: 'Maria Oliveira',
                date: '31/07/2023',
                total: 200.00,
                city: 'São Paulo',
                deliveryDate: '03/08/2023',
                paymentMethod: 'Boleto Bancário',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Av. B',
                    city: 'São Paulo',
                    state: 'São Paulo',
                    complement: 'Casa',
                    number: '456',
                    zipCode: '30350230'
                },
                products: [
                    { id: 2, quantity: 1, option: ['Cinza'] },
                    { id: 4, quantity: 3, option: ['Cinza'] }
                ]
            },
            {
                id: 3,
                customer: 'Carlos Souza',
                date: '01/08/2023',
                total: 250.00,
                city: 'Rio de Janeiro',
                deliveryDate: '04/08/2023',
                paymentMethod: 'Transferência Bancária',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Rua C',
                    city: 'Rio de Janeiro',
                    state: 'Rio de Janeiro',
                    complement: 'Casa 2',
                    number: '789',
                    zipCode: '30350230'
                },
                products: [
                    { id: 5, quantity: 2, option: ['Cinza'] },
                    { id: 6, quantity: 2, option: ['Cinza'] }
                ]
            },
            {
                id: 4,
                customer: 'Ana Costa',
                date: '02/08/2023',
                total: 300.00,
                city: 'Curitiba',
                deliveryDate: '05/08/2023',
                paymentMethod: 'Cartão de Débito',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Rua D',
                    city: 'Curitiba',
                    state: 'Paraná',
                    complement: 'Apto 3',
                    number: '321',
                    zipCode: '30350230'
                },
                products: [
                    { id: 7, quantity: 1, option: ['Cinza'] },
                    { id: 8, quantity: 4, option: ['Cinza'] }
                ]
            },
            {
                id: 5,
                customer: 'Fernando Rocha',
                date: '03/08/2023',
                total: 350.00,
                city: 'Porto Alegre',
                deliveryDate: '06/08/2023',
                paymentMethod: 'Cartão de Crédito',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Av. E',
                    city: 'Porto Alegre',
                    state: 'Rio Grande do Sul',
                    complement: 'Casa 5',
                    number: '555',
                    zipCode: '30350230'
                },
                products: [
                    { id: 9, quantity: 2, option: ['Cinza'] },
                    { id: 10, quantity: 1, option: ['Cinza'] }
                ]
            },
            {
                id: 6,
                customer: 'Gabriela Santos',
                date: '04/08/2023',
                total: 400.00,
                city: 'Salvador',
                deliveryDate: '07/08/2023',
                paymentMethod: 'Boleto Bancário',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Rua F',
                    city: 'Salvador',
                    state: 'Bahia',
                    complement: 'Apto 4',
                    number: '444',
                    zipCode: '30350230'
                },
                products: [
                    { id: 11, quantity: 3, option: ['Cinza'] },
                    { id: 12, quantity: 2, option: ['Cinza'] }
                ]
            },
            {
                id: 7,
                customer: 'Roberto Almeida',
                date: '05/08/2023',
                total: 450.00,
                city: 'Recife',
                deliveryDate: '08/08/2023',
                paymentMethod: 'Transferência Bancária',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Rua G',
                    city: 'Recife',
                    state: 'Pernambuco',
                    complement: 'Casa 6',
                    number: '666',
                    zipCode: '30350230'
                },
                products: [
                    { id: 13, quantity: 1, option: ['Cinza'] },
                    { id: 14, quantity: 1, option: ['Cinza'] }
                ]
            },
            {
                id: 8,
                customer: 'Juliana Lima',
                date: '06/08/2023',
                total: 500.00,
                city: 'Fortaleza',
                deliveryDate: '09/08/2023',
                paymentMethod: 'Cartão de Crédito',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Av. H',
                    city: 'Fortaleza',
                    state: 'Ceará',
                    complement: 'Casa 7',
                    number: '777',
                    zipCode: '30350230'
                },
                products: [
                    { id: 15, quantity: 3, option: ['Cinza'] },
                    { id: 16, quantity: 2, option: ['Cinza'] }
                ]
            },
            {
                id: 9,
                customer: 'Ricardo Pereira',
                date: '07/08/2023',
                total: 550.00,
                city: 'Manaus',
                deliveryDate: '10/08/2023',
                paymentMethod: 'Boleto Bancário',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Rua I',
                    city: 'Manaus',
                    state: 'Amazonas',
                    complement: 'Apto 8',
                    number: '888',
                    zipCode: '30350230'
                },
                products: [
                    { id: 17, quantity: 1, option: ['Cinza'] },
                    { id: 18, quantity: 2, option: ['Cinza'] }
                ]
            },
            {
                id: 10,
                customer: 'Patrícia Gomes',
                date: '08/08/2023',
                total: 600.00,
                city: 'Brasília',
                deliveryDate: '11/08/2023',
                paymentMethod: 'Transferência Bancária',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Av. J',
                    city: 'Brasília',
                    state: 'Distrito Federal',
                    complement: 'Casa 9',
                    number: '999',
                    zipCode: '30350230'
                },
                products: [
                    { id: 19, quantity: 2, option: ['Cinza'] },
                    { id: 20, quantity: 1, option: ['Cinza'] }
                ]
            },
            {
                id: 11,
                customer: 'Lucas Martins',
                date: '09/08/2023',
                total: 650.00,
                city: 'Florianópolis',
                deliveryDate: '12/08/2023',
                paymentMethod: 'Cartão de Débito',
                deliveryAddress: {
                    neighborhood: 'Pampulha',
                    recipient: 'Ricardo Pereira',
                    street: 'Av. K',
                    city: 'Florianópolis',
                    state: 'Santa Catarina',
                    complement: 'Apto 10',
                    number: '1010',
                    zipCode: '30350230'
                },
                products: [
                    { id: 1, quantity: 3, option: ['Cinza'] },
                    { id: 2, quantity: 2, option: ['Cinza'] }
                ]
            }
        ]              
    },
    mutations: { //mudam o state
        setVendorStock(state, payload) {
            state.vendorStock = payload
        },
        saveVendorData(state, payload) {
            console.log(payload)
            state.vendor = payload.vendor
            state.vendor.address = payload.address

            // email and name
            state.vendor.email = payload.user.email
            state.vendor.name = payload.user.name
        }
    },
    actions: { // chamam as mutations de fora da store - por exemplo de um componente/controller
        setVendorStock({commit}, payload) {
            commit('setVendorStock', payload)
        },
        saveVendorData({commit}, payload) {
            commit('saveVendorData', payload)
        }
    },
    getters: {
        getVendorData(state) {
            return state.vendor
        },
        getVendorStock(state) {
            return state.vendorStock
        },
        getVendorSales(state) {
            return state.vendorSales
        }
    }
}