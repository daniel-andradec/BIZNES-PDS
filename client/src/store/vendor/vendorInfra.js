export default {
    state: {
        vendorMenu: {
            isVisible: false,
            items: [
                {
                    display: 'Cadastro',
                    icon: 'fa-solid fa-store',
                    route: '/store-registration'
                },
                {
                    display: 'Produtos',
                    icon: 'fa-solid fa-box-open',
                    route: '/vendor-products'
                },
                {
                    display: 'Vendas',
                    icon: 'fa-solid fa-chart-line',
                    route: '/vendor-sales'
                }
            ]
        }
    },
    mutations: {
        toggleVendorMenu(state) {
            state.vendorMenu.isVisible = !state.vendorMenu.isVisible
            const body = document.querySelector('body')
            body.style.overflow = state.vendorMenu.isVisible ? 'hidden' : 'auto'
        }
    },
    actions: {
        toggleVendorMenu({ commit }) {
            commit('toggleVendorMenu')
        }
    },
    getters: {
        vendorMenu: state => state.vendorMenu
    }
}