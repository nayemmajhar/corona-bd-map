import React, { Component } from 'react';

class GraphHeroSection extends Component{

    render(){
        const { todayStats } = this.props
        
        return(
            <div className="container-fluid">
                <div className="row section-hero">
                    <div className="col-lg-12 mb-3 mb-lg-0">
                        <ul className="overall-info">
                            <li className="infected">
                                <span className="title">{todayStats.infected}</span>
                                <span className="info">Total Infected</span>
                            </li>
                            <li className="recovered">
                                <span className="title">{todayStats.recovered}</span>
                                <span className="info">Total Recovered</span>
                            </li>
                            <li className="death">
                                <span className="title">{todayStats.death}</span>
                                <span className="info">Total Death</span>
                            </li>
                            <li className="newcases">
                                <span className="title">+{todayStats.newinfected}</span>
                                <span className="info">24 Hours Infected</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default GraphHeroSection