import { makeRequest } from '../libs/RequestModule';

const registerCustomer = async (customer) => {
    const response = await makeRequest('POST', '/customer', customer);
    return response;
}

export { registerCustomer };