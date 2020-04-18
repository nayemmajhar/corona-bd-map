import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/index';
import Footer from './components/Footer';
import Home from './pages/Home/index'
import TourMap from './pages/TourMap/index'



function App() {
	return (
		<div className="App">
			
			<BrowserRouter>
				<Header />
				<Route exact path="/" component={Home} />
				<Route path="/divisions/:id" component={TourMap} />
				<Footer/>
			</BrowserRouter>
			
		</div>
	);
}

export default App;
