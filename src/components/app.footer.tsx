import React from "react";
import Config from "../configs/env.config";
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="container">
          <p>&copy; {Config().APP_NAME} 2020. All Rights Reserved.</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
