import { all } from "redux-saga/effects";
import AuthSaga from "../screens/Auth/redux.saga";
import UtilSaga from "../utilities/utils.saga";
import UserSaga from "../screens/user/user.saga";
import DashboardSaga from "../screens/user/adminDashboard/saga";
import DriverSaga from "../screens/user/driver/saga";
import CustomerSaga from "../screens/user/customer/saga";
import ApplicationSaga from "../screens/user/application/saga";
import AllEnvs from "../screens/user/envConfig/saga";
import Admin from "../screens/user/adminAccounts/saga";
import SubjectSaga from "../screens/user/subject/saga";

export default function* rootSaga() {
  yield all([
    DashboardSaga.watchGetDashboardAnalytics(),
    DashboardSaga.watchGetTripsByStatus(),

    Admin.watchGetAdminAccount(),
    Admin.watchSetAdminToView(),
    Admin.watchRemoveAdmin(),
    Admin.watchUpdateAdminAccount(),
    Admin.watchAddAdminAccount(),

    AllEnvs.watchGetEnvConfigs(),
    AllEnvs.watchSetEnvConfig(),
    AllEnvs.watchSetEnvConfigInput(),

    DriverSaga.watchGetDrivers(),
    DriverSaga.watchSetDriverToView(),
    DriverSaga.watchSearchDriver(),
    DriverSaga.watchGetDriversAnalytics(),
    DriverSaga.watchGetTripInformation(),
    DriverSaga.watchEnableDriverAccount(),
    DriverSaga.watchDisableDriverAccount(),
    DriverSaga.watchUpdateDriverAccount(),
    DriverSaga.watchAddDriverAccount(),

    SubjectSaga.watchGetDrivers(),
    SubjectSaga.watchSetDriverToView(),
    SubjectSaga.watchSearchDriver(),
    SubjectSaga.watchGetDriversAnalytics(),
    SubjectSaga.watchGetTripInformation(),
    SubjectSaga.watchEnableDriverAccount(),
    SubjectSaga.watchDisableDriverAccount(),
    SubjectSaga.watchUpdateDriverAccount(),
    SubjectSaga.watchAddDriverAccount(),
    SubjectSaga.watchDeleteSubject(),

    CustomerSaga.watchGetCustomers(),
    CustomerSaga.watchSetCustomerToView(),
    CustomerSaga.watchGetCustomersSearchResult(),
    CustomerSaga.watchGetCustomerAnalytics(),
    CustomerSaga.watchEnableCustomerAccount(),
    CustomerSaga.watchDisableCustomerAccount(),
    CustomerSaga.watchAddAdmin(),
    CustomerSaga.watchRemoveAdmin(),
    CustomerSaga.watchUpdateCustomer(),
    CustomerSaga.watchAddUserAccount(),

    ApplicationSaga.watchGetApplications(),
    ApplicationSaga.watchSetApplicationToView(),
    ApplicationSaga.watchGetAcceptedApplication(),
    ApplicationSaga.watchGetDeclinedApplication(),

    UserSaga.watchGetCvs(),
    UserSaga.watchDeleteCredentials(),
    UserSaga.watchAddCredentials(),

    UtilSaga.configureSnackBar(),
    AuthSaga.watchSetNewPassword(),
    AuthSaga.watchSetConfirmNewPassword(),

    AuthSaga.watchSetSignupFullName(),
    AuthSaga.watchSetSignupPassword(),
    AuthSaga.watchSetSignupPhoneNumber(),
    AuthSaga.watchSetLoginPassword(),
    AuthSaga.watchSetVerifcationCode(),
    AuthSaga.watchSetLoginPhoneNumber(),

    AuthSaga.watchLoginAccount(),
    AuthSaga.watchSignUpAccount(),
    AuthSaga.watchVerifyPin(),
    AuthSaga.watchSendVerificationPin(),
    AuthSaga.watchRessetPassword(),
    AuthSaga.watchLogOut(),
    AuthSaga.watchSetRessetPasswordPhoneNumber(),
  ]);
}
