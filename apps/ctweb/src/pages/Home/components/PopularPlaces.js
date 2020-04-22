import React from 'react';
import {Link} from 'react-router-dom'
import DistrictMap from './DistrictMap'
import DivisionMap from './DivisionMap'
import ctKielApi from '../../../helpers/ctKielApi'
import axios from 'axios'


class PopularPlaces extends React.Component{
    constructor() {
        super();
        this.state = {
            division:{},
            totalCases: {},
            map:'division'
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
                totalCases: data.report.totalCases
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
        const {totalCases, division, district} = this.state

        if(Object.keys(division).length == 0) return null;
        
        return(
            <section className="py-4 place-list">
                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 mb-3 mb-lg-0 text-center">
                            {
                            Object.keys(totalCases).length !== 0 &&
                            <div className="overall-report left-sidebar">
                                <h6 className="last-updated text-left">Last update: {totalCases.daydate}</h6>
                                <div className="overall-active-case">
                                    <div class="stats-box">
                                        <h6 className="stats-info">
                                            {totalCases.infected - totalCases.recovered - totalCases.death}
                                        </h6>
                                        <h5 className="stats-title">Active Cases</h5>
                                    </div>
                                </div>
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
                            </div>
                            }
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0 text-center">
                        <div id="current-map" className={this.state.map}>
                            <span id="division" className="map-tab" onClick={this.onClickChangeMap.bind(this, 'division')}>Division Map</span>
                            <span id="district" className="map-tab" onClick={this.onClickChangeMap.bind(this, 'district')}>District Map</span>
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
                        <div className="col-lg-3 mb-3 mb-lg-0 text-center">
                        <div className="overall-report left-sidebar">
                                <div className="overall-active-case">
                                    <div class="stats-box">
                                        <h6 className="stats-info">{totalCases.tests}</h6>
                                        <h5 className="stats-title">Total Tests</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="overall-report right-sidebar-2">
                                <h6 className="last-updated text-left">Emergency Helpline</h6>
                                <div className="help-hotline text-left">
                                    <div class="stats-box">
                                        <ul className="hotline-number">
                                            <li className="institute">
                                                <span className="name">National Call Center</span>
                                                <span className="telephone">
                                                    <a href="tel:333"><i className="fa fa-phone-volume"></i>&nbsp;333</a>
                                                </span>
                                            </li>
                                            <li className="institute">
                                                <span className="name">IEDCR</span>
                                                <span className="telephone">
                                                    <a href="tel:10655"><i className="fa fa-phone-volume"></i>&nbsp;10655</a>
                                                </span>
                                            </li>
                                            <li className="institute">
                                                <span className="name">Health Portal</span>
                                                <span className="telephone">
                                                    <a href="tel:16263"><i className="fa fa-phone-volume"></i>&nbsp;16263</a>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="overall-report right-sidebar-2">
                                <h6 className="last-updated text-left">Site Notice</h6>
                                <div className="important-info text-left">
                                    <div class="stats-box">
                                        <p>The site doesn't ensure correctness of infomation. This site has developed with opensource resources.</p>
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

export default PopularPlaces