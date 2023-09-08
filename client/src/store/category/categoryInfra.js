export default {
    state: {
        categoryMenu: {
            isVisible: false
        }
    },
    mutations: {
        toggleCategoryMenu(state) {
            console.log('toggleCategoryMenu')
            state.categoryMenu.isVisible = !state.categoryMenu.isVisible
            const body = document.querySelector('body')
            body.style.overflow = state.categoryMenu.isVisible ? 'hidden' : 'auto'
        }
    },
    actions: {
        toggleCategoryMenu({ commit }) {
            commit('toggleCategoryMenu')
        }
    },
    getters: {
        categoryMenu: state => state.categoryMenu
    }
}