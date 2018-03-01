import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Map from './map.jsx';
import Para from './Para.jsx';
import key from '../config';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherExp: [],
      id: props.details.id,
      location: props.details.location,
      host: props.details.host,
      experience: props.details.experience,
      notes: props.details.notes,
      language: props.details.language,
      duration: props.details.duration,
      city: props.details.city,
      view_count: props.details.view_count,
      spots_left: props.details.spots_left,
      what_well_do: props.details.what_well_do,
      who_can_come: props.details.who_can_come,
      what_ill_provide: props.details.what_ill_provide,
    
    };
    this.getHost = this.getHost.bind(this);
    this.getExperience = this.getExperience.bind(this);
    this.viewCount = this.viewCount.bind(this);
    this.spotsLeft = this.spotsLeft.bind(this);
  }


  componentWillMount() {
    this.getExperience(console.log);
  }

  getExperience(callback) {
    axios.get('http://localhost:3004/experience/details')
      .then(({ data }) => {
        this.setState({
          id: data.id,
          location: data.location,
          host: data.host,
          experience: data.experience,
          notes: data.notes,
          language: data.language,
          duration: data.duration,
          city: data.city,
          view_count: data.view_count,
          spots_left: data.spots_left,
          what_well_do: data.what_well_do,
          who_can_come: data.who_can_come,
          what_ill_provide: data.what_ill_provide,
        });
        callback();
      }).catch(console.log);
  }

  getHost() {
    axios.get(`http://localhost:3004/host/${this.state.host.name}`)
      .then((({ data }) => {
        this.setState({ otherExp: data });
        console.log(this.state.otherExp);
      })).catch(console.log);
  }

  viewCount() {
    const count = this.state.view_count;
    if (count > 1000) {
      return (
        <div>
          <div className="align">
            <p className="count">People are eyeing this experience.
                Over {count} people have viewed it this week.
            </p>
            <div className="buffer" />
            <img
              className="gif"
              alt="Binoculars"
              src={`https://a0.muscache.com/airbnb/static/page2/icon-p2-competing-views-animated-1aa77ba0a52fd0d37a210a0f5176ddc6.gif?
              ${new Date().getTime()}`}
            />
          </div>
        </div>);
    }
    return (<div />);
  }

  spotsLeft() {
    const left = this.state.spots_left;
    if (left < 10 && left !== 0) {
      return (
        <div className="align">
          <p className="count">There are only a few spots left. Join {left} others
      at Jacob And Jessica’s experience next Tuesday.
          </p>
          <div className="buffer" />
          <img className="gif" alt="clock" src={`https://a0.muscache.com/airbnb/static/page2/icon-number-available-animated-074b392fde3b450acdc18e531e56ce61.gif?
              ${new Date().getTime()}`} />
        </div>);
    }
    return (<div />);
  }

  latLngBounds() {
    const { lat } = this.state.location;
    const { lng } = this.state.location;
    if (Math.abs(lat) < 90 && Math.abs(lng) < 180) {
      return (<Map
        bootstrapURLKeys={key}
        defaultCenter={{ lat, lng }}
      />);
    }
    return (<p>Lat/Long values out of bounds!</p>);
  }


  render() {
    return (
      <div className="detail-list">
        <h1>{this.state.experience.title}</h1>
        <div className="info">
          <div className="info-align section">
            <div className="e-category-host"> {this.state.experience.category} experience
              <br />Hosted by 
              <div className="clickable get-host" onClick={this.getHost}>
              &thinsp; {this.state.host.name}
              </div>
            </div>
            <div className="host-picture-container">
              <img className="host-picture" alt="Host" src={this.state.host.picture_url} />
            </div>
          </div>
          <ul>
            <li>
              <div
                className="clickable show-map"
                onClick={() => {
              $('html, body').animate({
                scrollTop: $('.map').offset().top,
              }, 1000);
            }}
              >{this.state.city}
              </div>
            </li>
            <li>{this.state.duration} hours long</li>
            <li>Offered in {this.state.language}</li>
          </ul>
        </div>
        {this.viewCount()}
        {this.spotsLeft()}
        <div className="about section">
          <h3>{`About your host, ${this.state.host.name}`}</h3>
          <Para paragraph={this.state.host.about} />
        </div>
        <div className="about section">
          <h3>{'What we\'ll do'}</h3>
          <Para paragraph={this.state.what_well_do} />
        </div>
        <div className="provide section">
          <h3>{'What I\'ll provide'}</h3>
          <Para paragraph={this.state.what_ill_provide} />

        </div >
        <div className="who section">
          <h3>Who can come</h3>
          <Para paragraph={this.state.who_can_come} />

        </div>
        <div className="notes section">
          <h3>Notes</h3>
          <Para paragraph={this.state.notes} />
        </div>
        <h3>{'Where we\'ll be'}</h3>
          {this.latLngBounds()}
      </div>);

  }
}
export default Details;
