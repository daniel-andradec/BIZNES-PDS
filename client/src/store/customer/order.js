import moment from 'moment'

export default {
    state: {
        order: {
            products: [],
            totalPrice: 0,
            paymentMethod: '',
            deliveryDate: ''
        },
        customerOrders: []
        //     {
        //         id: 1,
        //         products: [
        //             {
        //                 id: 13,
        //                 name: 'Produto 1',
        //                 price: 100,
        //                 quantity: 1
        //             },
        //             {
        //                 id: 14,
        //                 name: 'Produto 2',
        //                 price: 200,
        //                 quantity: 2
        //             },
        //             {
        //                 id: 15,
        //                 name: 'Produto 3',
        //                 price: 200,
        //                 quantity: 2
        //             }
        //         ],
        //         address: {
        //             street: 'Rua 1',
        //             number: '123',
        //             complement: 'Casa',
        //             neighborhood: 'Bairro 1',
        //             city: 'Cidade 1',
        //             state: 'Estado 1',
        //             zipCode: '12345-123'
        //         },
        //         totalPrice: 500,
        //         paymentMethod: 'Cartão de Crédito',
        //         orderDate: '29/08/2023',
        //         deliveryDate: '06/09/2023'
        //     },
        //     {
        //         id: 2,
        //         products: [
        //             {
        //                 id: 16,
        //                 name: 'Produto 3',
        //                 price: 300,
        //                 quantity: 3
        //             },
        //             {
        //                 id: 17,
        //                 name: 'Produto 4',
        //                 price: 400,
        //                 quantity: 4
        //             }
        //         ],
        //         address: {
        //             street: 'Rua 1',
        //             number: '123',
        //             complement: 'Casa',
        //             neighborhood: 'Bairro 1',
        //             city: 'Cidade 1',
        //             state: 'Estado 1',
        //             zipCode: '12345-123'
        //         },
        //         totalPrice: 500,
        //         paymentMethod: 'Cartão de Crédito',
        //         orderDate: '05/09/2023',
        //         deliveryDate: '10/09/2023'
        //     },
        //     {
        //         id: 3,
        //         products: [
        //             {
        //                 id: 18,
        //                 name: 'Produto 5',
        //                 price: 500,
        //                 quantity: 5
        //             },
        //             {
        //                 id: 22,
        //                 name: 'Produto 6',
        //                 price: 600,
        //                 quantity: 6
        //             }
        //         ],
        //         address: {
        //             street: 'Rua 1',
        //             number: '123',
        //             complement: 'Casa',
        //             neighborhood: 'Bairro 1',
        //             city: 'Cidade 1',
        //             state: 'Estado 1',
        //             zipCode: '12345-123'
        //         },
        //         totalPrice: 500,
        //         paymentMethod: 'Cartão de Crédito',
        //         orderDate: '25/09/2023',
        //         deliveryDate: '09/10/2023'
        //     }
        // ]
    },
    mutations: {
        setOrderData(state, data) {
            console.log(data)
            state.order.products = data.products
            state.order.totalPrice = data.totalPrice
            state.order.paymentMethod = data.paymentMethod
            state.order.deliveryDate = data.deliveryDate
        },
        saveCustomerTransactions(state, payload) {
            state.customerOrders = payload;
        }
    },
    actions: {
        setOrderData({ commit }, data) {
            commit('setOrderData', data)
        },
        saveCustomerTransactions(context, payload) {
            context.commit('saveCustomerTransactions', payload);
        }
    },
    getters: {
        getOrderData: (state) => state.order,
        getCustomerOrders: (state) => {
            // ordernar por orderDate
            return state.customerOrders.sort((a, b) => {
                return moment(a.date).isBefore(moment(b.date)) ? 1 : -1
            })
        }
    }
}
