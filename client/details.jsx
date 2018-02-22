import GoogleMapReact from 'google-map-react';
import ReactDOM from 'react-dom';
import key from './config';
import React from 'react';
import $ from 'jquery';

class Details extends React.Component{
  constructor( props ) {
    super( props );
    this.state = {
      e: {
        experience_category: '',
        experience_title: '',
        host_picture_url: '',
        what_ill_provide:'',
        what_well_do: '',
        who_can_come: '',
        host_about:  '',
        host_name: '',
        amenities: '',
        language: '',
        duration: 0,
        notes : '',
        long: 0,
        lat: 0
      }
      };
    }
  

  componentDidMount() {
    this.getExperience();
  }
  
  getExperience( ) {
  
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3004/experience/details',
      success: ( data ) => {
        this.setState({e: data});
        
      },
      error: ( err ) => {
        console.log( 'error in client!' );
      }
    });
  }

  latLngBounds() {
    if (Math.abs(this.state.e.lat) < 90 && Math.abs(this.state.e.lat) < 180){
      return (<GoogleMapReact
            bootstrapURLKeys={ key }
            defaultCenter={ {lat: this.state.e.lat, lng: this.state.e.long} }
            defaultZoom={ 12 }>
          </GoogleMapReact>)
    }
    return (<p>Lat/Long values out of bounds!</p>)
  }

  render( ) {
    return ( <div className="detail-list">
      <h1>{this.state.e.experience_title}</h1>
      <hr/>
      <div className="info">
        <div className="info-align">
          <p className="e-category-host">{this.state.e.experience_category} experience<br/>Hosted by {this.state.e.host_name}</p>
          <img className="host-picture" alt="Host Picture" src={this.state.e.host_picture_url}></img>
        </div>
        <ul>
          <li>{this.state.e.amenities}</li>
          <li>{this.state.e.duration} hours long</li>
          <li>Offered in {this.state.e.language}</li>
        </ul>
      </div> 
      <hr/>
      <h3>About your host, {this.state.e.host_name}</h3>
      <p>{this.state.e.host_about}</p>
      <hr/>
      <h3>What we'll do</h3>
      <p>{this.state.e.what_well_do}</p>
      <hr/>
      <h3>What I'll provide</h3>
      <p>{this.state.e.what_ill_provide}</p>
      <hr/>
      <h3>Who can come</h3>
      <p>{this.state.e.who_can_come}</p>
      <hr/>
      <h3>Notes</h3>
      <p>{this.state.e.notes}</p>
      <hr/>
      <h3>Where we'll be</h3>
      <div className="map"> 
       {this.latLngBounds()}
      </div>
    </div> );

  }
}



ReactDOM.render(<Details />,  document.getElementById('details'));