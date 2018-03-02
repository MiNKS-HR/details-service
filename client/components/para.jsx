import React from 'react';

class Para extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      short: '',
      clicked: false
    }
    this.handleClick = this.handleClick.bind(this);
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.p.length > 400){
      this.setState({short: this.condenceParagraph(nextProps.p)});
    }
  }

  condenceParagraph(para) {
    let i = 400;
    while (para[i] !== ' ') {
      i--;
    }
    return para.slice(0, i) + ' . . . ';
  }

  handleClick() {
    this.setState({clicked: true});
  }

  render() {
    if (!this.state.clicked && this.props.p.length > 400) {
        return (<p className="cond-para">{this.state.short}<a className='clickable' onClick={this.handleClick}>+ More</a></p>);
    }
    return (<p className="para">{this.props.p}</p>);
  }
}

export default Para;