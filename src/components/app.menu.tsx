import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import $ from "jquery";
import { scrollTo } from "atomize";
import Config from "../configs/env.config";
interface Props extends RouteComponentProps {
  isHome?: boolean;
}
class AppMenu extends React.Component<Props> {
  navigate(path: string) {
    this.props.history.push("/");
  }
  initJqueryFuncs() {
    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
      $(".navbar-collapse").collapse("hide");
    });

    // // Activate scrollspy to add active class to navbar items on scroll
    // $('body').scrollspy({
    //   target: '#mainNav',
    //   offset: 54
    // });

    // Collapse Navbar
    var navbarCollapse = function () {
      try {
        if ($("#mainNav")) {
        }
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        }
      } catch (e) {}
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  }

  componentDidMount() {
    this.initJqueryFuncs();
  }

  render() {
    return (
      <nav className="navbar  navbar-expand-lg fixed-top" id="mainNav">
        <div className="container">
          <a
            onClick={() =>
              this.props.isHome ? scrollTo("#page-top") : this.navigate("/")
            }
            className={`navbar-brand`}
            href="#page-top"
          >
            {Config().APP_NAME}
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-2x fa-bars"></i>
          </button>
          <div
            style={{ fontWeight: "bold" }}
            className="collapse navbar-collapse"
            id="navbarResponsive"
          >
            {this.props.isHome && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className={`nav-link`} to="/auth/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={`nav-link`} to="/auth/signup">
                    SignUp
                  </NavLink>
                </li>

                <>
                  <li
                    onClick={() => scrollTo("#features")}
                    className="nav-item"
                  >
                    <NavLink to="/nill" className={`nav-link`}>
                      About
                    </NavLink>
                  </li>
                  <li onClick={() => scrollTo("#contact")} className="nav-item">
                    <NavLink to="/nill" className={`nav-link`}>
                      Contact
                    </NavLink>
                  </li>
                </>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(AppMenu);
