import React, { Component } from 'react';
import CovidAreaChart from './charts/CovidAreaChart'
import CovidMixBarChart from './charts/CovidMixBarChart'

class CountryGraphWrap extends Component{

    render(){
        const { totalReport } = this.props
        let dataReport = totalReport.reverse()

        console.log(dataReport);

        return(
            <section className="contry-stats">
                <div className="container-fluid">
                    <div className="row section-header">
                        <div className="col-lg-12 mb-3 mb-lg-0">
                            <p className="text-center">Covid19 cases in Bangladesh</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row section-body">
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#ffc107"}}>Daily Infected</h6>
                                <div className="stats-graph">
                                    <CovidAreaChart data={
                                        dataReport.map((item) => {
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
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#28a745"}}>Daily Recovered</h6>
                                <div className="stats-graph">
                                    <CovidAreaChart data={
                                        dataReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                count:item.newrecovered
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
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#dc3545"}}>Daily Death</h6>
                                <div className="stats-graph">
                                    <CovidAreaChart data={
                                        dataReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                count:item.newdeath
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
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left" style={{color:"#17a2b8"}}>Daily Test Conducted</h6>
                                <div className="stats-graph">
                                    <CovidAreaChart data={
                                        dataReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                count:item.newtests
                                            }
                                        })}
                                        color="#17a2b8"
                                        tColor='#000'
                                        tText="tests done"
                                        yText="Number of new death"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left">Daily Death vs Cured</h6>
                                <div className="stats-graph">
                                    <CovidMixBarChart data={
                                        dataReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                death:item.newdeath,
                                                cured: item.newrecovered
                                            }
                                        })}
                                        color1="#28a745"
                                        color2="#dc3545"
                                        tColor='#000'
                                        tText="tests done"
                                        yText="Cases solved daily"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="graph-box">
                                <h6 className="graph-title text-left">Daily Total Active Cases</h6>
                                <div className="stats-graph">
                                    <CovidAreaChart data={
                                        dataReport.map((item) => {
                                            return {
                                                daydate: item.daydate.replace('2020-',''),
                                                count: item.infected - item.recovered - item.death
                                            }
                                        })}
                                        color="#e6ad00"
                                        tColor='#000'
                                        tText="remain infected"
                                        yText="Number of Total Active Cases"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    
}

export default CountryGraphWrap