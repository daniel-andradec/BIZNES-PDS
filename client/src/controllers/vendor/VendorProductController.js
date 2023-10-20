import { makeRequest } from '../../libs/RequestModule';

const createProduct = async (data, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile); // Adiciona o arquivo ao corpo da requisição
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]); // Adiciona outros dados ao corpo da requisição
    });

    const response = await makeRequest('POST', '/product', formData, true);
    return response;
};

const updateProduct = async (id, data, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile); // Adiciona o arquivo ao corpo da requisição
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]); // Adiciona outros dados ao corpo da requisição
    });

    const response = await makeRequest('PUT', `/product/${id}`, formData, true);
    return response;
}

const deleteProduct = async (id) => {
    const response = await makeRequest('DELETE', `/product/${id}`);
    return response;
}

export { createProduct, deleteProduct, updateProduct };