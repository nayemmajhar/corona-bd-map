import React, { Component } from 'react';
import StatsTable from './StatsTable'
import GraphHeroSection from './GraphHeroSection'
import CovidAreaChart from './charts/CovidAreaChart'

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
                    <div className="row section-body">
                        <div className="col-lg-5 col-md-6">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#ffc107"}}>Daily New Infected</h6>
                                <div className="stats-graph">
                                    <CovidAreaChart data={
                                        divReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                count:item.newinfected
                                            }
                                        })}
                                        color="#ffc107"
                                        tColor='#000'
                                        tText="persons infected"
                                        yText="Number of new cases"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12">
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