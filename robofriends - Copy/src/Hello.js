import React, { Component } from 'react';
import './Hello.css';

const Hello = (props) => {
    return (
      <div className="f1 tc">
        <h1>Hello World!!</h1>
        <p>{props.greetings} </p>
      </div>

    );
}

/*
class Hello extends Component {
  render() {
    return (
      <div className="f1 tc">
        <h1>Hello World!!</h1>
        <p>{this.props.greetings} </p>
      </div>

    );
  }
}
*/


export default Hello;
