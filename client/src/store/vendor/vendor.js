export default {
    state: {
        vendor: {},
        vendorStock: [],
        vendorSales: []              
    },
    mutations: { //mudam o state
        setVendorStock(state, payload) {
            state.vendorStock = payload
        },
        saveVendorData(state, payload) {
            state.vendor = payload.vendor
            state.vendor.address = payload.address

            // email and name
            state.vendor.email = payload.user.email
            state.vendor.name = payload.user.name
        },
        saveVendorSales(state, payload) {
            state.vendorSales = payload
        }
    },
    actions: { // chamam as mutations de fora da store - por exemplo de um componente/controller
        setVendorStock({commit}, payload) {
            commit('setVendorStock', payload)
        },
        saveVendorData({commit}, payload) {
            commit('saveVendorData', payload)
        },
        saveVendorSales({commit}, payload) {
            commit('saveVendorSales', payload)
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