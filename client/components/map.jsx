import React from 'react';
import $ from 'jquery';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(err, info) {
    
    logErrorToMyService(err, info);
  }

  componentDidMount() {
    const key = this.props.bootstrapURLKeys.key;
    window.initMap = this.initMap;
    window.center = this.props.defaultCenter;
    this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`)
  }

  loadJS(src) {
    var ref = $('#map-container');
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    ref.append(script);
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: center
    });
    var marker = new google.maps.Marker({
      position: center,
      map: map
    });
  }
  
  render() {
    return (
      <div id="map-container">
        <div id="map" style={{"width":"550px","height":"500px"}}/>
        <script id="load-map" />
      </div>);
  }
}

module.exports = Map;