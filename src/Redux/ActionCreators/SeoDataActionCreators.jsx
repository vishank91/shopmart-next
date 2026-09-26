import { CREATE_SEO_DATA, DELETE_SEO_DATA, GET_SEO_DATA, UPDATE_SEO_DATA } from "../Constants"

export function createSeoData(data) {
    return {
        type: CREATE_SEO_DATA,
        payload: data
    }
}

export function getSeoData() {
    return {
        type: GET_SEO_DATA
    }
}

export function updateSeoData(data) {
    return {
        type: UPDATE_SEO_DATA,
        payload: data
    }
}

export function deleteSeoData(data) {
    return {
        type: DELETE_SEO_DATA,
        payload: data
    }
}