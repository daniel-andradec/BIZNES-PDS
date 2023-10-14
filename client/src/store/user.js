export default {
    state: {
        user: {
            id: null,
            name: null,
            email: null,
            role: null
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        doLogout(state) {
            state.user = {
                id: null,
                name: null,
                email: null,
                role: null
            }

            localStorage.removeItem('user')
        }
    },
    actions: {
        setUser({ commit }, payload) {
            commit('setUser', payload)
        },
        doLogout({ commit }) {
            commit('doLogout')
        }
    },
    getters: {
        loggedInUser: state => state.user
    }
}