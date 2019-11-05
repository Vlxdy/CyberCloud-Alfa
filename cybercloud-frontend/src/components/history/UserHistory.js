import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {getTime} from '../../functions'
import Interval from './Interval'
export default class userhistory extends Component {
    state = {
        usedterminals: [],
        itempurchased: []
    }
    componentDidMount() {
        this.getHistory();
    }
    getHistory = async () => {
        const tempo = JSON.parse(localStorage.getItem('datos'));
        //console.log(tempo.user)
        const res = await axios.get('http://localhost:4000/api/userhistory/' + tempo.user._id);
        this.setState({
            itempurchased: res.data.itempurchased,
            usedterminals: res.data.TerminalsUsed
        });
        console.log(res.data)
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group">
                        {this.state.itempurchased.map(item => (
                            <li key={item._id} type="button" className="list-group-item list-group-item-action">
                                <div className="row">
                                    <div className="col-5">
                                        {item.description}
                                    </div>
                                    <div className="col-3">
                                        PRECIO: {item.price} Bs
                                    </div>
                                    <div className="col-4">
                                        CANTIDAD: {item.amount}
                                    </div>
                                    <div className="col-6">
                                        PRECIO TOTAL: {item.price * item.amount} Bs
                                    </div>
                                    <div className="col-6">
                                       {format(item.createdAt, 'es_ES')}
                                    </div> 
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                <ul className="list-group">
                        {this.state.usedterminals.map(terminal => (
                            <li key={terminal._id} type="button" className="list-group-item list-group-item-action">
                                <div className="row">
                                    <div className="col-3">
                                        {getTime(terminal.time)}
                                    </div>
                                    <div className="col-4">
                                        PRECIO: {terminal.price} Bs
                                    </div>
                                    <div className="col-5">
                                       {format(terminal.createdAt, 'es_ES')}
                                    </div> 
                                </div>
                                <div className="row">
                                    <div className="col-12"><Interval intervals={terminal.terminals}/></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
