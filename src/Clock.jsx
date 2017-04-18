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
    this.setBreak = this.setBreak.bind(this);
    this.cancelWorking = this.cancelWorking.bind(this);
    this.cancelBreak = this.cancelBreak.bind(this);
    this.renderTimeLeft = this.renderTimeLeft.bind(this);
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
    const pomodoroMinutes = this.state.pomodoroMinutes;
    this.endTime = this.state.now.add(pomodoroMinutes, 'm');
    this.setState({
      now: moment(),
      clockStatus: 'working',
    });
  }

  setBreak() {
    console.log('break');
    const pomodorosDone = this.state.pomodorosDone + 1;
    let clockStatus;
    let breakTime;
    if (pomodorosDone % 4 === 0) {
      clockStatus = 'longbreak';
      breakTime = this.state.longBreakMinutes;
    } else {
      clockStatus = 'shortbreak';
      breakTime = this.state.shortBreakMinutes;
    }
    this.endTime = this.state.now.add(breakTime, 'm');
    this.setState({
      clockStatus,
      pomodorosDone,
    });
  }

  cancelWorking() {
    console.log('cancel work');
    this.setState({ clockStatus: 'normal' });
  }

  cancelBreak() {
    console.log('cancel break');
    this.setState({ clockStatus: 'normal' });
  }

  tick() {
    const clockStatus = this.state.clockStatus;
    this.setState({
      now: moment(),
    });
    if (this.state.now.isSameOrAfter(this.endTime)) {
      if (clockStatus === 'working') {
        this.setBreak();
      }
      if (clockStatus === 'shortbreak' || clockStatus === 'longbreak') {
        this.setWorking();
      }
    }
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

  renderTimeLeft() {
    if (this.state.clockStatus === 'normal') return null;
    const timeLeft = this.endTime.diff(this.state.now, 'second');
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;
    const info = {
      working: 'Working',
      shortbreak: 'Short Break',
      longbreak: 'Long Break',
    };
    return (
      <div className="info">
        <div>
          {info[this.state.clockStatus]}
        </div>
        <div>
          {`${minutesLeft}:${secondsLeft}`}
        </div>
      </div>
    );
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
      <div>
        <div className="clock" onClick={this.clickClock}>
          <div className="top" />
          <div className="right" />
          <div className="bottom" />
          <div className="left" />
          <div className="center" />
          <div className="hands second" style={style.secondAngle} />
          <div className="hands minute" style={style.minuteAngle} />
          <div className="hands hour" style={style.hourAngle} />
          {this.renderTimeLeft()}
        </div>
      </div>
    );
  }
}

export default Clock;
