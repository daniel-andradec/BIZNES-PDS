import { makeRequest } from '../libs/RequestModule';
import store from '../store/index.js';
import moment from 'moment';

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

const getVendorSales = async () => {
    const vendorData = (await getVendorData())?.data;
    const idVendor = vendorData?.vendor?.idVendor;
    const response = await makeRequest('GET', `/transaction/vendor/${idVendor}`);
    console.log(response.data);

    // // trata a response.data para que o valor total da sale seja calculado com base apenas no valor dos produtos do vendor logado
    const vendorSales = response.data.map(sale => {
        // products sao os sale.TransactionProducts
        // com base no valor e na quantidade de cada produto, calcula o valor total da sale
        let total = 0
        sale.TransactionProducts.forEach(product => {
            total += product.price * product.quantity
        })
        // retorna a sale com o valor total calculado
        return { ...sale, total }
    });

    // ordena sales por data
    vendorSales.sort((a, b) => {
        return moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1;
    });
    
    store.dispatch('saveVendorSales', vendorSales);
    return response;
}

export { registerVendor, getProducts, getVendorData, updateVendorData, getVendorSales };