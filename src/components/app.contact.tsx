import React from "react";

class Contacts extends React.Component {
  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Follow our social platforms </h1>

        <section style={{ marginTop: -50 }} className="contact " id="contact">
          <div className="container">
            <ul className="list-inline list-social">
              <li className="list-inline-item social-twitter">
                <a target="__blank" href="https://twitter.com/solomonyunana5">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item social-facebook">
                <a
                  target="__blank"
                  href="https://www.facebook.com/solomon.yunana.16"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item social-google-plus">
                <a
                  target="__blank"
                  href="https://www.instagram.com/solomonyunana95/"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </>
    );
  }
}

export default Contacts;
