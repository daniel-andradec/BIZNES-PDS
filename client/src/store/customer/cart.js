export default {
    state: {
        cart: {
            products: [
            ]
        }
    },
    mutations: {
        addProductToCart(state, product) {
            // same product already in cart with same selectedOption
            if (state.cart.products.find(p => p.id === product.id) && state.cart.products.find(p => p.id === product.id).selectedOption === product.selectedOption) {
                // increment quantity
                console.log('increment quantity')
                state.cart.products.find(p => p.id === product.id).quantity++
            } else {
                product.quantity = 1
                state.cart.products.push(product)
            }

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeProductFromCart(state, id) {
            state.cart.products = state.cart.products.filter(p => p.id !== id)

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        incrementProductQuantity(state, id) {
            state.cart.products.find(p => p.id === id).quantity++

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        decrementProductQuantity(state, id) {
            const product = state.cart.products.find(p => p.id === id)
            product.quantity--

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        clearCart(state) {
            state.cart.products = []

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        loadCart(state) {
            if (localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart'))
            } else {
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }
        }
    },
    actions: {
        addProductToCart({ commit }, product) {
            commit('addProductToCart', product)
        },
        removeProductFromCart({ commit }, id) {
            commit('removeProductFromCart', id)
        },
        incrementProductQuantity({ commit }, id) {
            commit('incrementProductQuantity', id)
        },
        decrementProductQuantity({ commit }, id) {
            commit('decrementProductQuantity', id)
        },
        clearCart({ commit }) {
            commit('clearCart')
        },
        loadCart({ commit }) {
            commit('loadCart')
        }
    },
    getters: {
        getCartProducts: state => {
            // if the cart is set in the localStorage, use it
            if (localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart'))
            } else {
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }
            return state.cart.products
        },
        getCartTotalQuantity: state => {
            let total = 0
            state.cart.products.forEach(p => {
                total += p.quantity
            })
            return total
        }
    }
}