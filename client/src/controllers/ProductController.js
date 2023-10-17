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

export { getProducts }