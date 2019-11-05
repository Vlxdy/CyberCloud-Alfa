import React, { Component } from 'react'
import axios from 'axios'
import Stopwatch from './Stopwatch'

export default class Terminals extends Component {

    state = {
        terminals: []
    }
    async componentDidMount() {
        this.timer = setInterval(() => {
            this.getTerminals();
          }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
      }
    getTerminals = async () => {
        const res = await axios.get('http://localhost:4000/api/terminals')
        if (res.data.error === "interval" || res.data.status === false) {
            this.props.history.push('/setting')
        }
        else {
            this.setState({
                terminals: res.data
            });
        }
        console.log(res)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-11">
                    {
                        this.state.terminals.map(terminal => (
                            <div className="btn btn-info m-2 col-2 p-2 text-white" key={terminal.id}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="row justify-content-center">
                                        <h1 className="display-4 font-weight-bold">{terminal.number}</h1>
                                        </div>
                                        <div className="row">
                                        
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <Stopwatch id={terminal.id} using={terminal.using} times={terminal.times} rate={terminal.rate} auxitime={terminal.auxitime} index={terminal.index} cost={terminal.cost} user={this.props.user} token={this.props.token} costItem={terminal.costItem} getTerminals={this.getTerminals} />
                                    </div>
                                </div>
                            </div>)
                        )
                    }
                    </div>
                    <div className="col-1 bg-primary">
                    </div>
                </div>
                </div>
        )
    }
}