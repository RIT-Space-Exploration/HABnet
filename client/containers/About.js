import React from 'react';
//import styles from '../css/App.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: 'foo' };
  }
  render() {
    return (
      <div >
        <h1>This is the About page</h1>
      </div>
    );
  }
}

export default About;
