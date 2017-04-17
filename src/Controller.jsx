import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      count: 0,
    };

    this.updateMyState = this.updateMyState.bind(this);
    this.updateRandomNumber = this.updateRandomNumber.bind(this);
    this.findMyDOMNode = this.findMyDOMNode.bind(this);
  }

  updateMyState() {
    let count = this.state.count;
    count += 1;
    const item = `Click - ${count} `;
    const arr = this.state.data;
    arr.push(item);
    this.setState({
      data: arr,
      count,
    });
  }

  updateRandomNumber() {
    this.forceUpdate();
  }

  findMyDOMNode() {
    const myDiv = document.getElementById('myDiv');
    ReactDOM.findDOMNode(myDiv).style.color = 'red';
  }

  render() {
    return (
      <div>
        <button onClick={this.updateMyState}>Click Me</button>
        <h4>State Data: {this.state.data}</h4>
        <button onClick={this.updateRandomNumber}>Random Number</button>
        <h4>random Number: {Math.random()}</h4>
        <button onClick={this.findMyDOMNode}>Find Node</button>
        <div id="myDiv">Find Me</div>
      </div>
    );
  }
}

export default Controller;
