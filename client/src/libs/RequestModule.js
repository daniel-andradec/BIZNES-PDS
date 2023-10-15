import axios from  'axios'

const makeRequest = async (method = 'get', uri, data = {}, form) => {
    const baseUrl = 'http://localhost:3030/api'
    const url = baseUrl + uri

    const result = await axios({
        method,
        url,
        data,
        timeout: 5 * 60 * 1000,
        headers: {
            'Content-Type': form ? 'multipart/form-data' : 'application/json',
        },
        withCredentials: true
    }).then((response) => {
        return response 
    }).catch((error) => {
        throw error
    })

    return result
}

export { makeRequest }