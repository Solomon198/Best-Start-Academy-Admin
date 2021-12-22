import React from "react";
import { connect } from "react-redux";
import CustomerInfo from "./customerInfo";
import CustomerSearchBar from "./customerSearchBar";
import DescriptionIcon from "@material-ui/icons/Description";
import CustomersList from "./customersList";
import { Customer, CustomerSearchData, ValueSetters } from "./actions";
import Spinner from "../../../components/app.spinner";
import { Hidden, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { NoRecordsFound } from "../../../components/app.no.records.found";
import AddCustomer from "./addAccount.modal";

type Props = {
  customers: any;
  customersSearchResult: any;
  gettingCustomersStatus: string;
  gettingCustomersError: string;
  gettingCustomersSearchResultStatus: string;
  gettingCustomersSearchResultError: string;
  viewCustomer: any;
  history: any;

  getCustomers: () => void;
  getCustomersSearchResult: (text: string) => void;
  setCustomerToView: (customerData: any) => void;
};

const mapStateToProps = (state: any) => ({
  customers: state.Customer.customers,
  customersSearchResult: state.Customer.customersSearchResult,
  viewCustomer: state.Customer.viewCustomer,
  gettingCustomersStatus: state.Customer.gettingCustomersStatus,
  gettingCustomersError: state.Customer.gettingCustomersError,
  gettingCustomersSearchResultStatus:
    state.Customer.gettingCustomersSearchResultStatus,
  gettingCustomersSearchResultError:
    state.Customer.gettingCustomersSearchResultError,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCustomers: () => dispatch({ type: Customer.GET_CUSTOMER_CALLER }),
  setCustomerToView: (customerData: any) =>
    dispatch({
      type: ValueSetters.SET_CUSTOMER_TO_VIEW_CALLER,
      payload: customerData,
    }),
  getCustomersSearchResult: (text: string) =>
    dispatch({
      type: CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_CALLER,
      payload: text,
    }),
});

class CustomerToView extends React.Component<Props> {
  componentDidMount() {
    this.props.getCustomers();
  }
  render() {
    const loading =
      Customer.GET_CUSTOMER_STARTER === this.props.gettingCustomersStatus;

    return (
      <>
        {loading && (
          <div style={{ marginTop: "3px" }}>
            <Spinner />
          </div>
        )}
        {this.props.customers.length === 0 && !loading && (
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
              <Hidden mdUp>
                <CustomerSearchBar
                  isLoading={
                    this.props.gettingCustomersSearchResultStatus ===
                    CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_STARTED
                  }
                  customers={this.props.customersSearchResult || []}
                  doSearch={(text) => this.props.getCustomersSearchResult(text)}
                  onSelected={(value) => {
                    this.props.setCustomerToView(value);
                    this.props.history.push(
                      "/dashboard/customers/customer-information"
                    );
                  }}
                />
              </Hidden>
              <Hidden smDown>
                <CustomerSearchBar
                  isLoading={
                    this.props.gettingCustomersSearchResultStatus ===
                    CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_STARTED
                  }
                  customers={this.props.customersSearchResult || []}
                  doSearch={(text) => this.props.getCustomersSearchResult(text)}
                  onSelected={(value) => this.props.setCustomerToView(value)}
                />
              </Hidden>

              <div
                className="hide-scroll-bar scroll"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  overflowY: "scroll",
                  paddingBottom: 120,
                  marginTop: 20,
                }}
              >
                {this.props.customers &&
                  this.props.customers.map((customer) => (
                    <div>
                      <Hidden mdUp>
                        <CustomersList
                          onClick={(data) => {
                            this.props.setCustomerToView(data);
                            this.props.history.push(
                              "/dashboard/customers/customer-information"
                            );
                          }}
                          key={customer.id}
                          data={customer}
                        />
                      </Hidden>
                      <Hidden smDown>
                        <CustomersList
                          onClick={(data) => this.props.setCustomerToView(data)}
                          key={customer.id}
                          data={customer}
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
                  {this.props.viewCustomer && (
                    <CustomerInfo customerInfo={this.props.viewCustomer} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <AddCustomer />
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerToView);
