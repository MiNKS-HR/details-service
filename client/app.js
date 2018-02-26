import ReactDOM from 'react-dom';
import React from 'react';
import Details from './details.jsx';

ReactDOM.render(<Details 
  details={{
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
      category: '',
      title: '',
    },
    notes: '',
    language: '',
    duration: 0,
    city: '',
    view_count: 0,
    spots_left: 0,
    what_well_do: '',
    who_can_come: '',
    what_ill_provide: ''}}
/>, document.getElementById('details'));
