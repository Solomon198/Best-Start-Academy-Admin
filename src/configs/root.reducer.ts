import { combineReducers } from "redux";
import AuthReducer from "../screens/Auth/auth.reducer";
import UserReducer from "../screens/user/user.reducer";
import UtilsReducer from "../utilities/utils.reducer";
import DashboardReducer from "../screens/user/adminDashboard/reducer";
import DriverReducer from "../screens/user/driver/reducer";
import CustomerReducer from "../screens/user/customer/reducer";
import ApplicationReducer from "../screens/user/application/reducer";
import EnvironmentConfiguration from "../screens/user/envConfig/reducer";
import Admin from "../screens/user/adminAccounts/reducer";
import Subject from "../screens/user/subject/reducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  User: UserReducer,
  Utils: UtilsReducer,
  Dashboard: DashboardReducer,
  Driver: DriverReducer,
  Customer: CustomerReducer,
  Application: ApplicationReducer,
  EnvironmentConfig: EnvironmentConfiguration,
  Admin,
  Subject,
});

export default rootReducer;
