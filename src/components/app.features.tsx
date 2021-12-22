import React from 'react';

class AppFeatures extends React.Component {
    render(){
         return(
                <section className="features" id="features">
                <div className="container">
                    <div className="section-heading text-center">
                    <h2>Get Quick Access, Unlimited Notifications</h2>
                    <p className="text-muted">Check out what you can do with HuntJob application</p>
                    <hr/>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 my-auto">
                        <div className="device-container">
                        <div className="device-mockup  iphone6_plus portrait white">
                            <div className="device">
                            <div className="screen">

                                <img src="img/happy.jpeg" style={{width:"100%",height:"100%"}} alt=""/>

                            </div>
                            <div className="button">

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-8 my-auto">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                            <div className="feature-item">
                                <i className="icon-screen-smartphone text-primary"></i>
                                <h3>Subscription And Plans</h3>
                                <p className="text-muted">
                                Subscribe to get more notifications on latest jobs.
                                </p>
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="feature-item">
                                <i className="icon-camera text-primary"></i>
                                <h3>Uploading Credentials</h3>
                                <p className="text-muted">
                                You can take a snapshot of your credentials as part of your CV before job Offer
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                            <div className="feature-item">
                                <i className="icon-present text-primary"></i>
                                <h3>Free to Use</h3>
                                <p className="text-muted">
                                You can get free notifications when you register for limited amount of jobs!</p>
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="feature-item">
                                <i className="icon-lock-open text-primary"></i>
                                <h3>Security</h3>
                                <p className="text-muted">
                                Trust us to give you a better job offer, and ensure you get paid by your employer
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

         )
    }
}

export default AppFeatures