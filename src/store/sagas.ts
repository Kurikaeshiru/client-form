import { takeLatest, put } from 'redux-saga/effects';
import { SAVE_FORM_DATA, INITIALIZE_FORM_DATA } from './actions';
import { all } from 'redux-saga/effects';
// import { watchSaveFormData } from './formData/sagas'; // Example saga import

function* saveFormDataSaga(action: any) {
  yield localStorage.setItem('formData', JSON.stringify(action.payload));
}

export function* watchSaveFormData() {
  yield takeLatest(SAVE_FORM_DATA, saveFormDataSaga);
}

export function* rootSaga() {
  yield all([
    watchSaveFormData(),
  ]);
}
