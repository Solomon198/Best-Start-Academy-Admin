import React from "react";
import Components from "../../components/index";
type Props = {
  history: any;
  location: any;
};
class Verification extends React.Component<Props> {
  render() {
    return (
      <div id="page-top">
        <Components.AppMenu isHome={false} />
        <Components.Verification
          location={this.props.location}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Verification;
