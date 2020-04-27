import React, { Component } from 'react';
import CovidLineChart from './charts/CovidLineChart'
import StatsTable from './StatsTable'

class DivisionGraphWrap extends Component{
    
    render(){
        const { name, reports } = this.props
            
        const last24Hours = reports.divisionStats[0]
        const divReport = [].concat(reports.divisionStats).reverse()

        return(
            <section className="division-stats">
                <div className="container-fluid">
                    <div className="row section-header">
                        <div className="col-lg-12 mb-3 mb-lg-0">
                            <p className="text-center" style={{color:'blue'}}>Covid19 cases of {name}</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row section-body">
                        <div className="col-md-3">
                            <div className="graph-box">
                                <h6 className="graph-title text-left">Overall Cases of {name} </h6>
                                <div className="stats-graph">
                                    <ul className="overall-info">
                                        <li className="infected">
                                            <span className="title">{last24Hours.infected}</span>
                                            <span className="info">Infected</span>
                                        </li>
                                        <li className="recovered">
                                            <span className="title">{last24Hours.recovered}</span>
                                            <span className="info">Recovered</span>
                                        </li>
                                        <li className="death">
                                            <span className="title">{last24Hours.death}</span>
                                            <span className="info">Death</span>
                                        </li>
                                        <li className="newcases">
                                            <span className="title">+{last24Hours.newinfected}</span>
                                            <span className="info">Last 24 Hours</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#17a2b8"}}>Total cases ( Infected, Recovered & Death )</h6>
                                <div className="stats-graph">
                                    <CovidLineChart
                                        data={divReport}
                                        color1="#ffc107"
                                        color2="#28a745"
                                        color3="#dc3545"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#0070C0"}}>Districts of {name}</h6>
                                <div className="stats-graph">
                                    <StatsTable cases={reports.districtStats} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    
}

export default DivisionGraphWrap