import { SnackBarActions } from "./utils.actions";
const intialState = {
  snackBarStatus: "success",
  snackBarShow: false,
  snackBarMessage: "",
};

function UtilsReducer(state = intialState, action: any) {
  switch (action.type) {
    case SnackBarActions.CONFIGURE_SNACKBAR: {
      state = {
        ...state,
        snackBarShow: action.payload.show,
        snackBarStatus: action.payload.status,
        snackBarMessage: action.payload.message,
      };
      return state;
    }
    default:
      return state;
  }
}

export default UtilsReducer;
