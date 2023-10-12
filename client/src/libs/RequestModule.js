import axios from  'axios'

const makeRequest = async (method = 'get', uri, data = {}) => {
    const baseUrl = 'http://localhost:3030/api'
    const url = baseUrl + uri

    console.log('url', url)
    const result = await axios({
        method,
        url,
        data,
        timeout: 5 * 60 * 1000,
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        return response.data
    }).catch((error) => {
        throw error
    })

    return result
}

export { makeRequest }