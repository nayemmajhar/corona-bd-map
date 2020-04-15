import React, { Component } from "react";
import axios from 'axios'
import ctKielApi from './../../helpers/ctKielApi'
import {Link} from 'react-router-dom'
import Image from './../../helpers/Image'
import { ClipLoader, DotLoader, BarLoader, PropagateLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  z-index: 1000;
  position: absolute;
  top: 80px;
  left: 50%;
`;


class Tours extends Component {

	constructor() {
		super();
		this.state = {
          loading: true,
		  tours: []
		}
	}
	

	componentDidMount() {
    
		const url = ctKielApi.URL + '/tours'
		axios.get(url).then(response => response.data)
		.then((data) => {
		  console.log(data);
		  
			this.setState({
                tours: data.tours,
                loading: false,
			})
		}).catch(function (error) {
			console.log(error);
		})
	}

	render() {
		
		return (
			<section className="py-6 bg-gray-100">
                <div className="container">
                    <PropagateLoader
                        css={override}
                        //size={"150px"} this also works
                        color={"#123abc"}
                        loading={this.state.loading}
                    />
                    <div className="text-center pb-lg-4">
                        <p className="subtitle text-secondary">Explore the beauty of Kiel </p>
                        <h2 className="mb-5">Our Tours</h2>
                    </div>
                    <div className="row">

                    {
                        this.state.tours &&
                        this.state.tours.map((x) => {

                        const link = '/tour/'+x.id
                        
                        return(
                            <div className="col-lg-4 mb-3 mb-lg-0 text-center">
                                <div className="tour-grid-item">
                                    <Link to={link}>
                                        <div className="image">
                                            <Image src={'/images/tours/'+x.image} alt={x.title} class="img-fluid" />
                                        </div>
                                        <div className="content clearfix">
                                            <h5>{x.title}</h5>
                                            <p>Donec euismod bibendum dapibus. Cras sollicitudin posuere.</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            )
                        })
                    }

                    </div>
                </div>
            </section>
		);
	}
}

export default Tours;