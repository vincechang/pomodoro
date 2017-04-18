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
      <div className="clock">
        <div className="top" />
        <div className="right" />
        <div className="bottom" />
        <div className="left" />
        <div className="center" />
        <div className="shadow" />
        <div className="hands hour" />
        <div className="hands minute" />
        <div className="hands second" />
      </div>
    );
  }
}

export default Clock;
