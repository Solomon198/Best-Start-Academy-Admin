import React from "react";
import Components from "../../components/index";
type Props = {
  history: any;
};
class SignUp extends React.Component<Props> {
  render() {
    return (
      <div id="page-top">
        <Components.AppMenu isHome={false} />
        <Components.SignUpComponent history={this.props.history} />
      </div>
    );
  }
}

export default SignUp;
