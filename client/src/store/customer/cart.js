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
            if (state.cart.products.find(p => p.idProduct === product.idProduct) && state.cart.products.find(p => p.idProduct === product.idProduct).selectedOption === product.selectedOption) {
                // increment quantity
                state.cart.products.find(p => p.idProduct === product.idProduct).quantity++
            } else {
                product.quantity = 1
                state.cart.products.push(product)
            }

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeProductFromCart(state, product) {
            const { idProduct, selectedOption } = product
            const prod = state.cart.products.find(p => p.idProduct === idProduct && p.selectedOption === selectedOption)
            state.cart.products.splice(state.cart.products.indexOf(prod), 1)

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        incrementProductQuantity(state, product) {
            const { idProduct, selectedOption } = product
            state.cart.products.find(p => p.idProduct === idProduct && p.selectedOption === selectedOption).quantity++

            // save cart in localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        decrementProductQuantity(state, product) {
            const { idProduct, selectedOption } = product
            state.cart.products.find(p => p.idProduct === idProduct && p.selectedOption === selectedOption).quantity--

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
        removeProductFromCart({ commit }, product) {
            commit('removeProductFromCart', product)
        },
        incrementProductQuantity({ commit }, product) {
            commit('incrementProductQuantity', product)
        },
        decrementProductQuantity({ commit }, product) {
            commit('decrementProductQuantity', product)
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