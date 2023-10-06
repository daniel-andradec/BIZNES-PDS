export default {
    state: {
        order: {
            products: [],
            totalPrice: 0,
            paymentMethod: '',
            deliveryDate: ''
        }
    },
    mutations: {
        setOrderData(state, data) {
            console.log(data)
            state.order.products = data.products
            state.order.totalPrice = data.totalPrice
            state.order.paymentMethod = data.paymentMethod
            state.order.deliveryDate = data.deliveryDate
        }
    },
    actions: {
        setOrderData({ commit }, data) {
            commit('setOrderData', data)
        }
    },
    getters: {
        getOrderData: (state) => state.order
    }
}
