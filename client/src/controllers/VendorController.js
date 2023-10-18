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

const getVendorData = async () => {
    const response = await makeRequest('GET', '/vendor/logged');
    if (response.status === 200) {
        store.dispatch('saveVendorData', response.data);
    }
    return response;
}

const updateVendorData = async (vendor) => {
    const response = await makeRequest('PUT', '/vendor', vendor);
    return response;
}

export { registerVendor, getProducts, getVendorData, updateVendorData };