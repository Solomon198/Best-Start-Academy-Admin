import React from "react";
import { connect } from "react-redux";
import AdminInfo from "./adminInfo";
import DescriptionIcon from "@material-ui/icons/Description";
import AdminList from "./adminList";
import { GetAdminAccount, ValueSetters, AdminSearchData } from "./actions";
import Spinner from "../../../components/app.spinner";
import { Hidden, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { NoRecordsFound } from "../../../components/app.no.records.found";
import AddAccount from "./addAccount.modal";

type Props = {
  admins: any;
  adminsSearchResult: any;
  gettingAdminsStatus: string;
  gettingAdminsError: string;
  gettingAdminsSearchResultStatus: string;
  gettingAdminsSearchResultError: string;
  viewAdmin: any;
  history: any;

  getAdmins: () => void;
  getAdminsSearchResult: (text: string) => void;
  setAdminToView: (adminData: any) => void;
};

const mapStateToProps = (state: any) => ({
  admins: state.Admin.admins,
  adminSearchResult: state.Admin.adminSearchResult,
  viewAdmin: state.Admin.viewAdmin,
  gettingAdminsStatus: state.Admin.gettingAdminsStatus,
  gettingAdminsError: state.Admin.gettingAdminsError,
  gettingAdminsSearchResultStatus: state.Admin.gettingAdminsSearchResultStatus,
  gettingAdminsSearchResultError: state.Admin.gettingAdminsSearchResultError,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAdmins: () => dispatch({ type: GetAdminAccount.GET_ADMINS_CALLER }),
  setAdminToView: (adminData: any) =>
    dispatch({
      type: ValueSetters.SET_ADMIN_TO_VIEW_CALLER,
      payload: adminData,
    }),
  getAdminsSearchResult: (text: string) =>
    dispatch({
      type: AdminSearchData.GET_ADMIN_SEARCH_RESULT_CALLER,
      payload: text,
    }),
});

class AdminPage extends React.Component<Props> {
  componentDidMount() {
    this.props.getAdmins();
  }
  render() {
    const loading =
      GetAdminAccount.GET_ADMINS_STARTED === this.props.gettingAdminsStatus;

    return (
      <>
        {loading && (
          <div style={{ marginTop: "3px" }}>
            <Spinner />
          </div>
        )}
        {this.props.admins.length === 0 && !loading && (
          <NoRecordsFound icon={<DescriptionIcon />} title="No Records Found" />
        )}

        <div
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          className="hide-scroll-bar"
        >
          <div
            className="d-flex hide-scroll-bar scroll"
            style={{ height: "100%" }}
          >
            <div
              className="col-sm-12 col-lg-6 hide-scroll-bar "
              style={{ height: "100%", overflow: "hidden" }}
            >
              {this.props.admins.length > 0 ? (
                <p
                  style={{
                    fontWeight: "bold",
                    marginLeft: 20,
                  }}
                  className=""
                >
                  Admin Accounts
                </p>
              ) : null}

              <div
                className="hide-scroll-bar scroll"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  overflowY: "scroll",
                  paddingBottom: 120,
                }}
              >
                {this.props.admins &&
                  this.props.admins.map((admin) => (
                    <div>
                      <Hidden mdUp>
                        <AdminList
                          onClick={(data) => {
                            this.props.setAdminToView(data);
                            this.props.history.push(
                              "/dashboard/admins/admin-information"
                            );
                          }}
                          key={admin.id}
                          data={admin}
                        />
                      </Hidden>
                      <Hidden smDown>
                        <AdminList
                          onClick={(data) => this.props.setAdminToView(data)}
                          key={admin.id}
                          data={admin}
                        />
                      </Hidden>
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-sm-12 col-lg-6 d-none d-lg-block hide-scroll-bar scroll">
              <div
                className="hide-scroll-bar scroll"
                style={{
                  height: "100%",
                  width: "100%",
                  overflowY: "scroll",
                  paddingRight: "37px",
                  position: "absolute",
                  left: "28px",
                }}
              >
                <div>
                  {this.props.viewAdmin && (
                    <AdminInfo adminInfo={this.props.viewAdmin} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddAccount />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
