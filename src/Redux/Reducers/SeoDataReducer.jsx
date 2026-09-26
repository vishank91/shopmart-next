import { CREATE_SEO_DATA_RED, DELETE_SEO_DATA_RED, GET_SEO_DATA_RED, UPDATE_SEO_DATA_RED } from "../Constants"

export default function SeoDataReducer(state = [], action) {
    let index
    switch (action.type) {
        case CREATE_SEO_DATA_RED:
            return [...state, action.payload]

        case GET_SEO_DATA_RED:
            return action.payload

        case UPDATE_SEO_DATA_RED:
            index = state.findIndex(x => x.id === action.payload.id)
            state[index] = { ...action.payload }
            return state

        case DELETE_SEO_DATA_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }
}