import { put, takeEvery } from "redux-saga/effects";
import { SnackBarActions } from "./utils.actions";

function* configureSnackBar() {
  yield takeEvery(
    SnackBarActions.CONFIGURE_SNACKBAR_CALLER,
    function* (action: any) {
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: action.payload,
      });
    }
  );
}
const allSaga = {
  configureSnackBar,
};

export default allSaga;
