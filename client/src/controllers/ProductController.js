import { makeRequest } from '../libs/RequestModule'
import store from '../store/index.js'

const getProducts = async () => {
    const response = await makeRequest('GET', '/product/all')
    if (response?.data) {
        // save to store and localstorage
        store.dispatch('setProducts', response.data)
        localStorage.setItem('products', JSON.stringify(response.data))
    }
    return response?.data
}

const checkQuantity = async (idProduct, quantity) => {
    const response = await makeRequest('GET', `/product/${idProduct}`)
    if (response?.data) {
        return response.data.quantity >= quantity
    }
    return false
}

const saveBestSellers = async () => {
    const transactions = (await makeRequest('GET', '/transaction/'))?.data

    if (!transactions) return

    // compute best sellers
    const bestSellers = transactions.reduce((acc, transaction) => {
        transaction.TransactionProducts.forEach(product => {
            acc[product.idProduct] = (acc[product.idProduct] || 0) + product.quantity
        })
        return acc
    }, {})

    // Sort best sellers directly without a separate step
    const bestSellersArray = Object.entries(bestSellers)
        .map(([idProduct, quantity]) => ({ idProduct, quantity }))
        .sort((a, b) => b.quantity - a.quantity)


    // get the 4 best sellers and save to store and localstorage
    const bestSellersProducts = bestSellersArray.slice(0, 4).map(product => store.getters.getProduct(product.idProduct))
    store.dispatch('saveBestSellers', bestSellersProducts)
}

export { getProducts, saveBestSellers, checkQuantity }