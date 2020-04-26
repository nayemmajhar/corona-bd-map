import React from 'react';
import {Link} from 'react-router-dom'
import DistrictMap from './DistrictMap'
import DivisionMap from './DivisionMap'
import ctKielApi from '../../../helpers/ctKielApi'
import DivHomeChart from './charts/DivHomeChart'
import CountryGraphWrap from './CountryGraphWrap'
import axios from 'axios'


class PopularPlaces extends React.Component{
    constructor() {
        super();
        this.state = {
            division:{},
            totalCases: {},
            map:'district'
        };
    }

    componentDidMount() {
    
        const url = ctKielApi.URL + '/reports'
        axios.get(url).then(response => response.data)
        .then((data) => {
            let divisions = {}
            data.report.divisionCases.map((item)=> divisions[item.title.toLowerCase()] = item )

            this.setState({
                division: divisions,
                district: data.report.districtCases,
                totalReport: data.report.totalCases,
                totalCases: data.report.totalCases[0]
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    onClickDivision(id){
        let element = document.getElementById(id)
        element.classList.add('hover-color')
    }

    onClickChangeMap(name){
        this.setState({ map: name })
    }

    render(){
        const {totalCases, totalReport, division, district} = this.state

        const helpline = [
            {name: 'National Call Center', tel: '333'},
            {name: 'Health Portal', tel: '16263'},
            {name: 'IEDCR', tel: '10655'}
        ]

        if(Object.keys(division).length == 0) return null;
        
        return(
            <div>
                <section className="stat-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-3 mb-lg-0">
                                <ul className="new-stats text-center">
                                    <li>Today's Cases:</li>
                                    <li className="infected"><i className="fa fa-circle"></i> <span>Infected: &nbsp;{totalCases.newinfected}</span></li>
                                    <li className="cured"><i className="fa fa-circle"></i> <span>Recovred: &nbsp;{totalCases.newrecovered}</span></li>
                                    <li className="death"><i className="fa fa-circle"></i> <span>Death: &nbsp;{totalCases.newdeath}</span></li>
                                    <li className="info"><i className="fa fa-circle"></i> <span>Tests: &nbsp;{totalCases.newtests}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            
                <section className="py-4 place-list">
                    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 mb-3 mb-lg-0 text-center">
                                {
                                Object.keys(totalCases).length !== 0 &&
                                <div className="overall-report left-sidebar">
                                    <div className="overall-infected">
                                        <div class="stats-box">
                                            <h6 className="stats-info">{totalCases.infected}</h6>
                                            <h5 className="stats-title">Number of Cases</h5>
                                        </div>
                                    </div>
                                    <div className="overall-recovered">
                                        <div class="stats-box">
                                            <h6 className="stats-info">{totalCases.recovered}</h6>
                                            <h5 className="stats-title">Official Cured</h5>
                                        </div>
                                    </div>
                                    <div className="overall-death">
                                        <div class="stats-box">
                                            <h6 className="stats-info">{totalCases.death}</h6>
                                            <h5 className="stats-title">Official Deaths</h5>
                                        </div>
                                    </div>
                                    <div className="overall-tests">
                                        <div class="stats-box">
                                            <h6 className="stats-info">{totalCases.tests}</h6>
                                            <h5 className="stats-title">Total Tests</h5>
                                        </div>
                                    </div>
                                    <div className="help-hotline text-left">
                                        <h6 className="last-updated text-left">Emergency Helpline</h6>
                                        <div class="stats-box">
                                            <ul className="hotline-number">
                                                {
                                                    helpline.map((item,index) => {
                                                        return(
                                                            <li key={index} className="institute">
                                                                <span className="name">{item.name}</span>
                                                                <span className="telephone">
                                                                    <a href={'tel:'+item.tel}><i className="fa fa-phone-volume"></i>&nbsp;{item.tel}</a>
                                                                </span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="col-lg-6 mb-3 mb-lg-0">
                            <div id="current-map" className={this.state.map}>
                                <div className="map-tab-nav">
                                    <span id="district" className="map-tab" onClick={this.onClickChangeMap.bind(this, 'district')}>District Map</span>
                                    <span id="division" className="map-tab" onClick={this.onClickChangeMap.bind(this, 'division')}>Division Map</span>
                                </div>
                                <div className="map-tab-content">
                                {
                                    this.state.map == 'division' &&
                                    <DivisionMap division={division} />
                                }
                                {
                                    this.state.map == 'district' &&
                                    <DistrictMap district={district} />
                                }
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-3 mb-3 mb-lg-0 text-center">
                                <div className="overall-report">
                                    <div className="overall-active-case">
                                        <div class="stats-box">
                                            <h6 className="stats-info">
                                                {totalCases.infected - totalCases.recovered - totalCases.death}
                                            </h6>
                                            <h5 className="stats-title">Active Cases</h5>
                                        </div>
                                    </div>
                                    <div className="overall-active-case">
                                        <h6 className="last-updated division-info text-left">Covid19 Cases by Division</h6>
                                        <div class="stats-box">
                                            <ul className="mini-division-counter">
                                                <li>
                                                    <span className="name-h">Name</span>
                                                    <span className="infected-h">Infected</span>
                                                </li>
                                                {
                                                    Object.keys(division).map((key) =>{
                                                        return(
                                                            <li>
                                                                <span className="name">{division[key].title}</span>
                                                                <span className="infected">{division[key].infected}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="pie-map text-left">
                                        <h6 className="last-updated text-left">Division Charts</h6>
                                        <div class="stats-box">
                                            <DivHomeChart division={division} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CountryGraphWrap totalReport={totalReport} />
            </div>
        )
    }
}

export default PopularPlaces