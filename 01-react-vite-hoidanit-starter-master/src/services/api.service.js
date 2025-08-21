// import axios from "axios"
import axios from "./axios.customize"

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = { fullName, email, password, phone }
    return axios.post(URL_BACKEND, data)
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`
    const data = { _id, fullName, phone }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`
    return axios.delete(URL_BACKEND)
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)

    return axios.post(URL_BACKEND, bodyFormData, config)
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`
    const data = { avatar, _id, fullName, phone }
    return axios.put(URL_BACKEND, data)
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register"
    const data = { fullName, email, password, phone }
    return axios.post(URL_BACKEND, data)
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login"
    const data = {
        username: email,
        password: password,
        delay: 100
    }
    return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account"
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}

const getfetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`
    return axios.delete(URL_BACKEND)
}

const updateBookThumbnailAPI = (thumbnail, _id, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = { _id, thumbnail, mainText, author, price, quantity, category }
    return axios.put(URL_BACKEND, data)
}

const updateBookAPI = (_id, mainText, author, price, quantity, category) => {
    const URL_BACKEND = `/api/v1/book`
    const data = { _id, mainText, author, price, quantity, category }
    return axios.put(URL_BACKEND, data)
}

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = { thumbnail, mainText, author, price, quantity, category }
    return axios.post(URL_BACKEND, data)
}

export {
    createUserAPI,
    updateUserAPI,
    fetchAllUserAPI,
    deleteUserAPI,
    handleUploadFile,
    updateUserAvatarAPI,
    registerUserAPI,
    loginAPI,
    getAccountAPI,
    logoutAPI,
    getfetchAllBookAPI,
    deleteBookAPI,
    updateBookThumbnailAPI,
    updateBookAPI,
    createBookAPI,
}