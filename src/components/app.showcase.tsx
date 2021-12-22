import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  scrollTo: (id: string) => void;
};

class ShowCase extends React.Component<Props> {
  render() {
    return (
      <section className="cta">
        <div className="cta-content">
          <div className="container">
            <h2>Stop waiting. Find a job</h2>

            <NavLink to="/auth/signup" className="btn  btn-outline btn-xl">
              Signup and Get a Job Now
            </NavLink>
          </div>
        </div>
        <div className="overlay"></div>
      </section>
    );
  }
}

export default ShowCase;
