import { makeRequest } from '../libs/RequestModule';
import store from '../store/index.js';

const registerVendor = async (vendor) => {
    const response = await makeRequest('POST', '/vendor', vendor);
    return response;
}

const getProducts = async () => {
    const response = await makeRequest('GET', '/product');
    // save products in store
    store.dispatch('setVendorStock', response.data);
}

export { registerVendor, getProducts };