import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
      clockStatus: 'normal',
      pomodorosDone: 0,
      pomodorosPerSet: 4,
      pomodoroMinutes: 25,
      shortBreakMinutes: 5,
      longBreakMinutes: 20,
    };
    this.clickClock = this.clickClock.bind(this);
    this.setWorking = this.setWorking.bind(this);
    this.cancelWorking = this.cancelWorking.bind(this);
    this.cancelBreak = this.cancelBreak.bind(this);
  }

  componentDidMount() {
    this.timeID = setInterval(
      () => { this.tick(); },
      1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  setWorking() {
    console.log('working');
    this.setState({ clockStatus: 'working' });
  }

  cancelWorking() {
    console.log('cancel working');
    this.setState({ clockStatus: 'normal' });
  }

  cancelBreak() {
    console.log('cancel break');
    this.setState({ clockStatus: 'normal' });
  }

  tick() {
    this.setState({
      now: moment(),
    });
  }

  clickClock() {
    const clockStatus = this.state.clockStatus;
    const action = {
      normal: this.setWorking,
      working: this.cancelWorking,
      break: this.cancelBreak,
    };
    if (clockStatus in action) {
      action[clockStatus]();
    }
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
      <div className="clock" onClick={this.clickClock}>
        <div className="top" />
        <div className="right" />
        <div className="bottom" />
        <div className="left" />
        <div className="center" />
        <div className="hands second" style={style.secondAngle} />
        <div className="hands minute" style={style.minuteAngle} />
        <div className="hands hour" style={style.hourAngle} />
      </div>
    );
  }
}

export default Clock;
