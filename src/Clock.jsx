import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
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
      now: moment(),
    });
  }

  render() {
    const t = this.state.now;
    const second = t.second();
    const minute = t.minutes();
    const hour = t.hour() % 12;
    const angleOfSecond = (second / 60) * 360;
    const angleOfMinute = ((minute / 60) * 360) + angleOfSecond;
    const angleOfHour = ((hour / 12) * 360) + angleOfMinute;
    return (
      <div className="container">
        <div className="clock">
          <div className="hour" />
          <div className="minute" />
        </div>
      </div>
    );
  }
}

export default Clock;
