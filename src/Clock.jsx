import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      comment: 'Hello ',
    };
  }

  componentDidMount() {
    this.timeID = setInterval(
      () => { this.tick(); },
      1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  tick() {
    this.setState({
      date: new Date(),
      comment: `${this.state.comment}x`,
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.date.toLocaleTimeString()}
        </div>
        <div>
          {this.state.comment}
        </div>
      </div>
    );
  }
}

export default Clock;
