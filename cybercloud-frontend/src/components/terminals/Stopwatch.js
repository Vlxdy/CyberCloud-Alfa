import React, { Component } from "react";
import Axios from "axios";
import Charge from "./Charge"

class Stopwatch extends Component {

  state = {
      timerOn: this.props.using,
      timerTime: this.props.times,
      timerStart: 0,
      cost: this.props.cost,
      index: this.props.index
    };
  componentDidMount ()  {
    if (this.props.using) {
      this.setState({
        timerOn: true,
        timerTime: this.state.timerTime,
        timerStart: Date.now() - this.state.timerTime
      });
      this.timer = setInterval(() => {
        this.setState({
          timerTime: Date.now() - this.state.timerStart
        });
      }, 10);
    }
    
  }
  componentWillUnmount() {
  }
  startTimer = async() => {
    await Axios.put('http://localhost:4000/api/terminals/' + this.props.id);
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };
  stopTimer = async() => {
    await Axios.put('http://localhost:4000/api/terminals/' + this.props.id);
    this.setState({
      timerOn: false
    });
    clearInterval(this.timer);
  };

  resetTimer = async() => {
    await Axios.delete('http://localhost:4000/api/terminals/' + this.props.id);
    this.setState({
      timerStart: 0,
      timerTime: 0,
      cost: 0,
      index:0
    });
    this.charge.reset();
  };

  render() {

    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <div className="col align-items-center">
        <div className="col">
          {hours} : {minutes} : {seconds}
        </div>
        <Charge ref={element => {this.charge = element}} cost={this.state.cost} index={this.state.index} rate={this.props.rate} time={this.state.timerTime} auxitime={this.props.auxitime}/>
        <div className="col">
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button className="btn btn-secondary m-1" onClick={this.startTimer}><i className="fas fa-play"></i></button>
          )}
          {this.state.timerOn === true && (
            <button className="btn btn-secondary m-1" onClick={this.stopTimer}><i className="fas fa-pause"></i></button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="btn btn-secondary m-1" onClick={this.startTimer}><i className="fas fa-play"></i></button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="btn btn-secondary m-1" onClick={this.resetTimer}><i className="fas fa-coins"></i></button>
          )}
        </div>
      </div>
    );
  }
}
export default Stopwatch;