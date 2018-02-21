import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Details extends React.Component{
  constructor( props ) {
    super( props );
    this.state = {
      e: {
        "host_name": '',
        "experience_category": '',
        "experience_title": '',
        "host_picture_url": '',
        "amenities": '',
        "duration": 0,
        "language": '',
        "host_about":  '',
        "what_well_do": '',
        "what_ill_provide":'',
        "who_can_come": ''
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
        console.log( data);
        this.setState({e: data});
      },
      error: ( err ) => {
        console.log( 'error in client!' );
      }
    });
  }

  render( ) {
    return ( <div className="detail-list">
      <h1>{this.state.e.experience_title}</h1>
      <hr/>
      <div className="info">
        <div className="info-align">
          <p className="e-category-host">{this.state.e.experience_category} experience<br/>Hosted by {this.state.e.host_name}</p>
          <img className="host-picture" src={this.state.e.host_picture_url}></img>
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
    </div> );
  }
}



ReactDOM.render(<Details />,  document.getElementById('details'));