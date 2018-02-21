import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Details extends React.Component{
  constructor( props ) {
    super( props );
  }

  render( ) {
    return ( <h1>Details!</h1> );
  }
}



var experience = {
  
}
ReactDOM.render(<Details />, document.getElementById('details'));