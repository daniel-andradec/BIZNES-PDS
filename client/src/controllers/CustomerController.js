import { makeRequest } from '../libs/RequestModule';
import store from '../store/index.js'

const registerCustomer = async (customer) => {
    const response = await makeRequest('POST', '/customer', customer);
    return response;
}

const getCustomerData = async () => {
    const response = await makeRequest('GET', '/customer/logged');
    if (response.status === 200) {
        store.dispatch('saveCustomerData', response.data);
    }
    return response;
}

const updateCustomerData = async (customer) => {
    const response = await makeRequest('PUT', '/customer', customer);
    return response;
}

const getCustomerAddress = async () => {
    const response = await makeRequest('GET', '/address');
    return response;
}

const getCustomerTransactions = async (idUser) => {
    // id as param
    const response = await makeRequest('GET', `/transaction/user/${idUser}`);
    if (response.status === 200) {
        store.dispatch('saveCustomerTransactions', response.data);
    }
    return response;
}

export { registerCustomer, getCustomerData, updateCustomerData, getCustomerAddress, getCustomerTransactions };