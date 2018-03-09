import React from 'react';
import $ from 'jquery';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }


  // Here we initilize the center and initMap to use in the URL
  componentDidMount() {
    const { key } = this.props.bootstrapURLKeys;
    window.initMap = this.initMap;
    window.center = this.props.defaultCenter;
    this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`);
  }


  loadJS(src) {
    const ref = $('#map-container');
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    ref.append(script);
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center,
    });
    const marker = new google.maps.Marker({
      position: center,
      map,
    });
  }

  render() {
    return (
      <div id="map-container">
        <div id="map" />
        <script id="load-map" />
      </div>);
  }
}

module.exports = Map;
