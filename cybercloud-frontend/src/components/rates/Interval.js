import React, { Component } from 'react'
import TimeRate from './TimeRate'
export default class Interval extends Component {
    render() {
        return (
            <ul className="list-group list-group-flush">
                {
                    this.props.intervals.map(interval => (
                        <li className="list-group-item list-group-item-action" key={interval._id}>
                            <TimeRate time={interval.time} ingrementarTime={this.ingrementarTime} /><div><strong>Precio: {interval.cost} Bs</strong></div>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
