export default {
    state: {
        vendor: {},
        vendorStock: [],
        vendorSales: []              
    },
    mutations: { //mudam o state
        setVendorStock(state, payload) {
            state.vendorStock = payload
            localStorage.setItem('vendorStock', JSON.stringify(payload))
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
            localStorage.setItem('vendorSales', JSON.stringify(payload))
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
            if (state.vendorStock?.length === 0) {
                const vendorStock = JSON.parse(localStorage.getItem('vendorStock'))
                if (vendorStock) {
                    state.vendorStock = vendorStock
                }
            }
            return state.vendorStock
        },
        getVendorSales(state) {
            // se o state estiver vazio, tenta buscar do localStorage
            if (state.vendorSales?.length === 0) {
                const vendorSales = JSON.parse(localStorage.getItem('vendorSales'))
                if (vendorSales) {
                    state.vendorSales = vendorSales
                }
            }
            return state.vendorSales
        }
    }
}