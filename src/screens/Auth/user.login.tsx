import React from 'react';
import Components from '../../components/index';

type Props = {
  history: any;
};
class Login extends React.Component<Props> {
  render() {
    return (
      <div id="page-top">
        <Components.AppMenu />
        <Components.LoginComponent history={this.props.history} />
      </div>
    );
  }
}

export default Login;
