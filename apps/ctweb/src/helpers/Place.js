import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Place extends Component{

    render(){
        const { place } = this.props.place
        return(
            <div className="tour_grid_item">
                <div className="tour_grid_item_post_thumbnail">
                    <Link to={'/places/' + place.id} title="Bellagio, Italy">
                            <img className="tour_grid_item_inner_image img-fluid" src="http://travelicious.bold-themes.com/main-demo/wp-content/uploads/sites/2/2015/04/post_08-1280x1280.jpg" />
                    </Link>
                </div>
                <div className="tour_grid_item_inner_content">
                    <h5 className="tour_grid_item_post_title">Berlin</h5>
                    <div className="tour_grid_item_post_excerpt">Kiel is a village on a promontory jutting out into Lake Como, in Italy.</div>
                </div>
            </div>
        )
    }
}
export default Place;