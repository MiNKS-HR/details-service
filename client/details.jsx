import GoogleMapReact from 'google-map-react';
import React from 'react';
import axios from 'axios';
import key from './config';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      e: {
        id: 0,
        location: {
          lat: 0.0,
          long: 0.0,
        },
        host: {
          name: '',
          about: '',
          picture_url: '',
        },
        experience: {
          title: '',
          category: '',
        },
        notes: '',
        language: '',
        duration: 0,
        amenities: '',
        view_count: 0,
        spots_left: 0,
        what_well_do: '',
        who_can_come: '',
        what_ill_provide: '',
      },
    };
  }


  componentDidMount() {
    axios.get('http://localhost:3004/experience/details')
      .then((response) => {
        this.setState({ e: response.data });
      }).catch((err) => {
        console.log('error in client!', err);
      });
  }

  viewCount() {
    const count = this.state.e.view_count;
    if (count > 1000) {
      return (
        <div>
          <div className="align">
            <p className="count">People are eyeing this experience.
                Over {this.state.e.view_count} people have viewed it this week.
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
    const left = this.state.e.spots_left;
    if (left < 10 && left !== 0) {
      return (
        <div className="align">
          <p className="count">There are only a few spots left. Join {left} others
      at Jacob And Jessica’s experience next Tuesday.
          </p>
          <div className="buffer" />
          <img className="gif" alt="clock" src="https://a0.muscache.com/airbnb/static/page2/icon-number-available-animated-074b392fde3b450acdc18e531e56ce61.gif" />
        </div>);
    }
    return (<div />);
  }

  latLngBounds() {
    const { lat } = this.state.e.location;
    const { lng } = this.state.e.location;
    if (Math.abs(lat) < 90 && Math.abs(lng) < 180) {
      return (<GoogleMapReact
        bootstrapURLKeys={key}
        defaultCenter={{ lat, lng }}
        defaultZoom={15}
      />);
    }
    return (<p>Lat/Long values out of bounds!</p>);
  }

  render() {
    if (this.state.e.id !== 0) {
      return (
        <div className="detail-list">
          <h1>{this.state.e.experience.title}</h1>
          <div className="info section">
            <div className="info-align">
              <div className="e-category-host"> {this.state.e.experience.category} experience
                <br />Hosted by {this.state.e.host.name}
              </div>
              {/* <div className="buffer" /> */}
              <div className="host-picture-container">
                <img className="host-picture" alt="Host" src={this.state.e.host.picture_url} />
              </div>
            </div>
            <ul>
              <li>{this.state.e.amenities}</li>
              <li>{this.state.e.duration} hours long</li>
              <li>Offered in {this.state.e.language}</li>
            </ul>
          </div>
          {this.viewCount()}
          {this.spotsLeft()}
          <div className="about section">
            <h3>{`About your host, ${this.state.e.host.name}`}</h3>
            <p>{this.state.e.host.about}</p>
          </div>
          <div className="about section">
            <h3>{'What we\'ll do'}</h3>
            <p>{this.state.e.what_well_do}</p>
          </div>
          <div className="provide section">
            <h3>{'What I\'ll provide'}</h3>
            <p>{this.state.e.what_ill_provide}</p>
          </div >
          <div className="who section">
            <h3>Who can come</h3>
            <p>{this.state.e.who_can_come}</p>
          </div>
          <div className="notes section">
            <h3>Notes</h3>
            <p>{this.state.e.notes}</p>
          </div>
          <h3>{'Where we\'ll be'}</h3>
          <div className="map">
            {this.latLngBounds()}
          </div>
        </div>);
    }
    return (<div />);
  }
}
export default Details;
