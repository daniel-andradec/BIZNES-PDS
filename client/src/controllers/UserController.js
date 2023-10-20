import { makeRequest } from '../libs/RequestModule';
import store from '@/store/index.js'

const login = async (email, password) => {
    const response = await makeRequest('POST', '/users/login', { email, password })
    return response
}

const getUser = async () => {
    // gets the logged in user
    const response = (await makeRequest('GET', '/users/user'))?.data
    return response
}

const updatePassword = async (oldPassword, newPassword) => {
    const response = await makeRequest('PUT', '/users/password', { oldPassword, newPassword })
    return response
}

const logout = async () => {
    const response = await makeRequest('POST', '/users/logout')
    store.dispatch('doLogout')
    return response
}

export { login, getUser, logout, updatePassword }