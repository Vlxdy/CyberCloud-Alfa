import React, { Component } from 'react';
import dateFormat from 'dateformat-light';
export default class Interval extends Component {
    render() {
        return (
            <ul className="list-group">
                <li className="list-group-item disabled">
                    <div className="row">
                        <div className="col-3 text-center">
                            <p className="text-center">Terminal</p>
                        </div>
                        <div className="col-5">
                            <p className="text-center">Inicio</p>
                        </div>
                        <div className="col-4">
                            <p className="text-center">Fin</p>
                        </div>
                    </div>
                </li>
                {this.props.intervals.map(interval => (
                    <li key={interval._id} className="list-group-item disabled">
                        <div className="row">
                            <div className="col-3">
                                <p className="text-center">{interval.number}</p>
                            </div>
                            <div className="col-5">
                                <p className="text-center">{dateFormat(interval.inittime, "m/d/yy HH:MM:ss")}</p>
                            </div>
                            <div className="col-4">
                                <p className="text-center">{dateFormat(interval.endtime, "m/d/yy HH:MM:ss")}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}
