/* eslint-disable */
import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { User } from './types/declarations';
import AuthRoute from './screens/auth.route';
import HomeScreen from './screens/index';
import { Redirect, Switch, Route } from 'react-router-dom';
// import 'devextreme/dist/css/dx.light.css';

type Props = {
  accessToken: string;
};

const mapStateToProps = (store: any) => ({
  accessToken: store.Auth.accessToken,
});

const mapDispatchStateToProps = (dispatch: any) => ({});

class BaseRoute extends React.Component<Props> {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          {this.props.accessToken ? (
            <Redirect to="/dashboard" />
          ) : (
            // <HomeScreen />
            <AuthRoute />
          )}
        </Route>
      </Switch>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(BaseRoute);
