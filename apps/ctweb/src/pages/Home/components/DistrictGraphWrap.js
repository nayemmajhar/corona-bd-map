import React, { Component } from 'react';
import CovidAreaChart from './charts/CovidAreaChart'
import GraphHeroSection from './GraphHeroSection'

class DistrictGraphWrap extends Component{
    
    render(){
        const { name, reports } = this.props
            
        const todayStats = reports.districtStats[0]
        const divReport = [].concat(reports.districtStats).reverse()
        
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
                <div className="row section-body">
                    <div className="col-lg-4 col-md-6">
                        <div className="graph-box">
                            <h6 className="graph-title text-left" style={{color:"#ffc107"}}>Total Infected Cases</h6>
                            <div className="stats-graph">
                                <CovidAreaChart data={
                                    divReport.map((item) => {
                                        return {
                                            daydate: item.daydate.replace('2020-',''),
                                            count: item.infected
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
                    <div className="col-lg-4 col-md-6">
                        <div className="graph-box">
                            <h6 className="graph-title text-left" style={{color:"#28a745"}}>Total Recovered Cases</h6>
                            <div className="stats-graph">
                            <CovidAreaChart data={
                                divReport.map((item) => {
                                    return {
                                        daydate: item.daydate.replace('2020-',''),
                                        count:item.recovered
                                    }
                                })}
                                color="#28a745"
                                tColor='#000'
                                tText="persons cured"
                                yText="Number of new cured"
                            />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="graph-box">
                            <h6 className="graph-title text-left" style={{color:"#dc3545"}}>Total Death Cases</h6>
                            <div className="stats-graph">
                                <CovidAreaChart data={
                                    divReport.map((item) => {
                                        return {
                                            daydate: item.daydate.replace('2020-',''),
                                            count:item.death
                                        }
                                    })}
                                    color="#dc3545"
                                    tColor='#000'
                                    tText="persons died"
                                    yText="Number of new death"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    
}

export default DistrictGraphWrap