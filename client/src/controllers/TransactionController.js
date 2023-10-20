import { makeRequest } from "@/libs/RequestModule"

const createTransaction = async (transaction) => {
    return await makeRequest('POST', '/transaction', transaction)
}


export { createTransaction }