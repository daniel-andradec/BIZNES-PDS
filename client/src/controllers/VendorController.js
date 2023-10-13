import { makeRequest } from '../libs/RequestModule';

const registerVendor = async (vendor) => {
    const response = await makeRequest('POST', '/vendor', vendor);
    return response;
}

export { registerVendor };