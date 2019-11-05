import React, { Component } from 'react'

export default class TimeRate extends Component {
    render() {
        //let seconds = ("0" + (Math.floor(this.props.time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.props.time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.props.time / 3600000)).slice(-2);
        return (
            <div>
                {hours}:{minutes}
            </div>
        )
    }
}
