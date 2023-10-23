export default {
    state: {
        products: []
    },
    mutations: {
        sortProducts(state, option) {
            switch (option) {
                case 'lowestPrice':
                    state.products.sort((a, b) => a.price - b.price)
                    break
                case 'highestPrice':
                    state.products.sort((a, b) => b.price - a.price)
                    break
                case 'name':
                    state.products.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'category':
                    state.products.sort((a, b) => a.category[0].localeCompare(b.category[0]))
                    break
                case 'bestSellers':
                    state.products.sort((a, b) => a.id - b.id) // todo - sort by best sellers
                    break
                default:
                    break
            }
        },
        setProducts(state, products) {
            state.products = products

            state.products.forEach(product => {
                product.seller = product.Vendor.fantasyName
                product.devolutionPolicy = product.Vendor.devolutionPolicy
                product.idVendor = product.Vendor.idVendor
                delete product.Vendor
            })

            localStorage.setItem('products', JSON.stringify(state.products))
        },
        fetchProducts(state) {
            const products = localStorage.getItem('products')
            if (products) {
                state.products = JSON.parse(products)
            }
        }
    },
    actions: {
        sortProducts({ commit }, option) {
            commit('sortProducts', option)
        },
        setProducts({ commit }, products) {
            commit('setProducts', products)
        },
        fetchProducts({ commit }) {
            commit('fetchProducts')
        }
    },
    getters: {
        getProducts: state => state.products,
        // get the product with the given id, and put product.seller = 'Seller Name'
        // getProduct: state => id => state.products.find(product => product.id == id)
        getProduct: state => id => {
            let product = state.products.find(product => product.idProduct == id)
            return product
        },
        getCategoryProducts: state => (categories, id) => {
            console.log(categories);
            // get other products from the same category but not the one with the given id - max 4 products
            return state.products.filter(product => product.category.split(',').some(category => categories?.includes(category)) && product.idProduct != id).slice(0, 4)
        },
        getSearchProducts: state => (search) => {
            // get products that contain the search term in the name or description or category
            console.log(search)
            return state.products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase()) || product.category.split(',').some(category => category.toLowerCase().includes(search.toLowerCase())))
        },
        // best sellers products - by now, just return the products from index 3 to 7
        getBestSellers: state => {
            return state.products.slice(3, 7)
        }
    }
}
