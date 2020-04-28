import React, { Component } from 'react';
import CovidLineChart from './charts/CovidLineChart'
import StatsTable from './StatsTable'
import DailyReportGraphWrap from './DailyReportGraphWrap'
import GraphHeroSection from './GraphHeroSection'

class DivisionGraphWrap extends Component{
    
    render(){
        const { name, reports } = this.props
            
        const todayStats = reports.divisionStats[0]
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
                <GraphHeroSection todayStats={todayStats} />
                <div className="container-fluid">
                    <DailyReportGraphWrap dataReport={divReport} />
                    <div className="row section-body">
                        <div className="col-md-5">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#17a2b8"}}>Total cases ( Infected, Recovered & Death )</h6>
                                <div className="stats-graph">
                                    <CovidLineChart
                                        data={divReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                infected: item.infected,
                                                recovered: item.recovered,
                                                death: item.death
                                            }
                                        })}
                                        color1="#ffc107"
                                        color2="#28a745"
                                        color3="#dc3545"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
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