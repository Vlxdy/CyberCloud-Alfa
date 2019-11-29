import React, { Component } from "react";
import Axios from "axios";

class Stopwatch extends Component {
  state = {
    active: true
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  startTimer = async () => {
    this.setState({
      active: false
    });
    await Axios.put('http://'+global.ip+':4000/api/terminalsbeta/' + this.props.number, { token: this.props.token })
    setTimeout(() => {
      this.setState({
        active: true
      });
    }, 1000)
  }
  stopTimer = async () => {
    this.setState({
      active: false
    });
    await Axios.put('http://'+global.ip+':4000/api/terminalsbeta/' + this.props.number, { token: this.props.token })
    setTimeout(() => {
      this.setState({
        active: true
      });
    }, 1000)
  };
  resetTimer = async () => {
    this.setState({
      active: false
    });
    await Axios.delete('http://'+global.ip+':4000/api/terminalsbeta/' + this.props.number,
      {
        headers: {},
        data: { token: this.props.token, operator: this.props.user }
      })
    setTimeout(() => {
      this.setState({
        active: true
      });
    }, 1000)
  }
  render() {
    let seconds = ("0" + (Math.floor(this.props.time / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(this.props.time / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(this.props.time / 3600000)).slice(-2);
    return (
      <div className="">
        <div className="row justify-content-center">
          {hours} : {minutes} : {seconds}
          <h5>{(this.props.price + this.props.costItem).toFixed(2)} Bs.</h5>
          
        </div>
        <div className="row justify-content-center">
          {this.props.user.operator && this.props.user.enabled &&(
            <div className="">
              {this.props.using === false && this.props.time === 0 && (
                <button className="btn btn-dark m-1" onClick={this.startTimer} disabled={!this.state.active}><i className="fas fa-play"></i></button>
              )}
              {this.props.using === true && (
                <button className="btn btn-dark m-1" onClick={this.stopTimer} disabled={!this.state.active}><i className="fas fa-pause"></i></button>
              )}
              {this.props.using === false && this.props.time > 0 && (
                <button className="btn btn-dark m-1" onClick={this.startTimer} disabled={!this.state.active}><i className="fas fa-play"></i></button>
              )}
              {this.props.using === false && this.props.time > 0 && (
                <button className="btn btn-dark m-1" onClick={this.resetTimer} disabled={!this.state.active}><i className="fas fa-coins"></i></button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Stopwatch;