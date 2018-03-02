import React from 'react';

class Para extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    this.handleClick = this.handleClick.bind(this);
  } 

  handleClick() {
    this.setState({clicked: true});
  }

  render() {
    if (this.props.paragraph.length > 400) {
      let short;
      let idx = 400;
      while (this.props.paragraph[idx] !== ' ') {
        idx--;
      }
      short = this.props.paragraph.slice(0, idx) +' . . . ';
      if (!this.state.clicked) {
        return (<p className="cond-para">{short}<a className='clickable' onClick={this.handleClick}>+ More</a></p>);
      }
    }
    return (<p className="para">{this.props.paragraph}</p>);
  }
}

export default Para;