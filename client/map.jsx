import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const key = this.props.bootstrapURLKeys.key;
    window.initMap = this.initMap;
    window.center = this.props.defaultCenter;
    this.loadJS(`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`)
  }

  loadJS(src) {
    var ref = window.document.getElementById('load-map');
    var script = window.document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
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
      <div>
        <div id="map" />
        <script id="load-map" />
      </div>);
  }
}

module.exports = Map;