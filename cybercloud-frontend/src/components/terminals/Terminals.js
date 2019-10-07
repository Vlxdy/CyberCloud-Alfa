import React, { Component } from 'react'
import axios from 'axios'

import Stopwatch from './Stopwatch'

//import { format } from 'timeago.js'
//import { Link } from 'react-router-dom'

export default class Terminals extends Component {

    state = {
        terminals: []
    }

    async componentDidMount() {
        this.getTerminals();
    }

    getTerminals = async () => {
        const res = await axios.get('http://localhost:4000/api/terminals')
        this.setState({
            terminals: res.data
        });
        console.log(res)
    }
    render() {
        return (
            <div className="container p-1">
                <div className="row">
                    {
                        this.state.terminals.map(terminal => (
                            <div className="card m-2 col-2 p-2  text-cent align-items-center bg-dark text-white" key={terminal.id}>
                                <h1 className="display-4 font-weight-bold">{terminal.number}</h1>
                                <Stopwatch id={terminal.id} using={terminal.using} times={terminal.times} rate={terminal.rate} auxitime={terminal.auxitime} index={terminal.index} cost={terminal.cost} />
                            </div>)
                        )
                    }
                </div>
            </div>
        )
    }
}