import React, { useState } from 'react'
import './about.css'
import BimNesher from './assets/about/bim nesher-01.png'
import MahleketPituah from './assets/about/Mahleket Pituah.png'
import Base108 from './assets/about/base108.png'
import SCLogo from './assets/about/SCLogo.jpg'


export default function About() {
    return (
        <div className="container">
            <div className="text-center">
                <h2 className="section-heading text-uppercase">About</h2>
                <h3 className="section-subheading text-muted">The Smart Channel™ Origins</h3>
            </div>
            <ul className="timeline">
                <li>
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src={Base108} alt="Our base." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                            <h4 className="subheading about-left-alignment">Smart channel is developed in Unit 108</h4>
                        </div>
                        <div className="timeline-body">
                            <p className="text-muted about-left-alignment">
                                The unit is located in Tzrifin base, and is nowadays referred to as IAF Base Tzrifin.<br />
                                The unit specializes in various software and hardware technological solutions.
                            </p>
                        </div>
                    </div>
                </li>
                <li className="timeline-inverted">
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src={BimNesher} alt="Our systems building." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                            <h4 className="subheading">One of the most prestigious products in our systems</h4>
                        </div>
                        <div className="timeline-body">
                            <p className="text-muted">
                                Smart Channel is considered one of the most iconic and prestigious products in our systems, N.E.S.H.E.R.<br />
                                    Amongts other security products, N.E.S.H.E.R provides sophisticated and advanced solutions and technologies.
                                </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src={MahleketPituah} alt="Our division." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                            <h4 className="subheading about-left-alignment">Our Division</h4>
                        </div>
                        <div className="timeline-body">
                            <p className="text-muted about-left-alignment">
                                Our division has been developing cyber security products and solutions for decades. We're all specialists when it comes to security measures.
                                </p>
                        </div>
                    </div>
                </li>
                <li className="timeline-inverted">
                    <div className="timeline-image"><img className="rounded-circle img-fluid" src={SCLogo} alt="Smart channel logo." /></div>
                    <div className="timeline-panel">
                        <div className="timeline-heading">
                            <h4 className="subheading about-left-alignment">Smart Channel</h4>
                        </div>
                        <div className="timeline-body">
                            <p className="text-muted about-left-alignment">
                                We've started developing Smart Channel on 2018. Since the beginning, the product was potent with security capabilities. Since then, we've collaborated with other special units, who've shown great interest with the product.
                                </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="timeline-image">
                        <h7>
                            <br />
                                We hope you'll
                                <br />
                                 enjoy the security measures our product provides.
                            </h7>
                    </div>
                </li>
            </ul>
        </div>
    )
}