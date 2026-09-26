import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SEO_DATA, CREATE_SEO_DATA_RED, DELETE_SEO_DATA, DELETE_SEO_DATA_RED, GET_SEO_DATA, GET_SEO_DATA_RED, UPDATE_SEO_DATA, UPDATE_SEO_DATA_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, deleteRecord, getRecord, updateMultipartRecord } from "./Service/index"

function* createSaga(action) {                                                      //Worker
    let response = yield createRecord("seoData", action.payload)
    // let response = yield createMultipartRecord("seoData", action.payload)
    yield put({ type: CREATE_SEO_DATA_RED, payload: response })
}

function* getSaga() {                                                               //Worker
    let response = yield getRecord("seoData")
    yield put({ type: GET_SEO_DATA_RED, payload: response })
}

function* updateSaga(action) {                                                      //Worker
    yield updateRecord("seoData", action.payload)
    yield put({ type: UPDATE_SEO_DATA_RED, payload: action.payload })
    // let response = yield updateMultipartRecord("seoData", action.payload)
    //yield  put({ type: CREATE_SEO_DATA_RED, payload: response })
}

function* deleteSaga(action) {                                                      //Worker
    yield deleteRecord("seoData", action.payload)
    yield put({ type: DELETE_SEO_DATA_RED, payload: action.payload })
}


export default function* SeoDataSaga() {
    yield takeEvery(CREATE_SEO_DATA, createSaga)                            //Watcher
    yield takeEvery(GET_SEO_DATA, getSaga)                                  //Watcher
    yield takeEvery(UPDATE_SEO_DATA, updateSaga)                            //Watcher
    yield takeEvery(DELETE_SEO_DATA, deleteSaga)                            //Watcher
}