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
    const angleOfMinute = (minute / 60) * 360;
    const angleOfHour = ((hour / 12) + (minute / (12 * 60))) * 360;
    const style = {
      secondAngle: {
        transform: `rotate(${angleOfSecond}deg)`,
      },
      minuteAngle: {
        transform: `rotate(${angleOfMinute}deg)`,
      },
      hourAngle: {
        transform: `rotate(${angleOfHour}deg)`,
      },
    };
    return (
      <div className="clock">
        <div className="top" />
        <div className="right" />
        <div className="bottom" />
        <div className="left" />
        <div className="center" />
        <div className="shadow" />
        <div className="hands second" style={style.secondAngle} />
        <div className="hands minute" style={style.minuteAngle} />
        <div className="hands hour" style={style.hourAngle} />
      </div>
    );
  }
}

export default Clock;
