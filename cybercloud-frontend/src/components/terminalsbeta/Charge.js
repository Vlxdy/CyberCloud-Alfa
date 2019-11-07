import React, { Component } from 'react'

export default class Charge extends Component {
    state = {
        index: this.props.index,
        auxitime: this.props.auxitime,
        cost: this.props.cost,

    };
    componentDidMount() {
        this.timer = setInterval(
            () => { this.updateCost() },
            1000
        );
    }
    componentWillUnmount() {
    }
    reset = () => {
        this.setState(
            {
                index: this.props.index,
                auxitime: 0,
                cost: this.props.cost,
            }
        );
    }
    updateCost = () => {
        if (this.props.time > this.state.auxitime) {

            if (this.state.index === this.props.rate.length) {
                this.setState({
                    index: 0
                });
            }
            //console.log(this.state.index)
            this.setState({
                auxitime: this.state.auxitime + this.props.rate[this.state.index].time,
                cost: this.state.cost + this.props.rate[this.state.index].cost,
                index: this.state.index + 1
            });
        }
    }
    render() {
        return (
                <h4>{(this.state.cost + this.props.costItem).toFixed(2)} Bs.</h4>
        )
    }
}