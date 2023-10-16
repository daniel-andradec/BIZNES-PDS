export default {
    state: {
        customer: {}
    },
    mutations: {
        saveCustomerData(state, payload) {       
            console.log('saveCustomerData', payload)
            state.customer = payload.customer
            state.customer.address = payload.address

            // email and name
            state.customer.email = payload.user.email
            state.customer.name = payload.user.name
        }
    },
    actions: {
        saveCustomerData(context, payload) {
            context.commit('saveCustomerData', payload);
        }
    },
    getters: {
        getCustomerData(state) {
            return state.customer;
        }
    }
}