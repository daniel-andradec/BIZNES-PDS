import { makeRequest } from '../libs/RequestModule';
import store from '@/store/index.js'

const getCustomers = async () => {
    const response = await makeRequest('GET', '/customer');
    store.dispatch('saveCustomers', response.data)
    return response;
}

const getVendors = async () => {
    const response = await makeRequest('GET', '/vendor');
    store.dispatch('saveVendors', response.data)
    return response;
}

const deleteCustomer = async (id) => {
    const response = await makeRequest('DELETE', `/customer/${id}`);
    return response;
}

const deleteVendor = async (id) => {
    const response = await makeRequest('DELETE', `/vendor/${id}`);
    return response;
}

export { getCustomers, getVendors, deleteCustomer, deleteVendor };