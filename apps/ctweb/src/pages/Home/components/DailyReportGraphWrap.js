import React, { Component } from 'react';
import CovidAreaChart from './charts/CovidAreaChart'

class DailyReportGraphWrap extends Component{

    render(){
        const { dataReport } = this.props 
        return(
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
            </div>
        )
    }
    
}

export default DailyReportGraphWrap