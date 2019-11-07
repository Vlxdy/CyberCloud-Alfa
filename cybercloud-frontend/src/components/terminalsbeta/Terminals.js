import React, { Component } from 'react'
import axios from 'axios'
import Stopwatch from './Stopwatch'
import Panel from './Panel'
import { Link } from 'react-router-dom'
export default class Terminals extends Component {

    state = {
        terminals: [],
        terminal: {},
        select: 1
    }
    async componentDidMount() {
        this.timer = setInterval(() => {
            this.getTerminals();
        }, 800);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    getTerminals = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/terminalsBeta')
        if (res.data.status === false) {
            this.props.history.push('/setting')
        }
        else {
            this.setState({
                terminals: res.data,
                terminal: res.data[this.state.select - 1]
            });
        }
        //console.log(res.data)
    }
    onChangeTerminal = (number) => {
        this.setState({
            select: number
        })
        console.log(this.state.terminal)
    }
    render() {
        return (
            <div id="panel1" className="container-fluid">
                <div className="row">
                    <div className="col-12 col-fluid">
                        {
                            this.state.terminals.map(terminal => (
                                <div className={"btn m-2 col-2 p-2 text-white btn-" +(terminal.using?(terminal.user.id === "0" ? "info" : "success"):"primary")+(terminal.number===this.state.select?" active":"")}

                                    key={terminal.id} onClick={() => this.onChangeTerminal(terminal.number)}>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="row justify-content-center">
                                                <h1 className="display-4 font-weight-bold">{terminal.number}</h1>
                                            </div>
                                            <div className="row">
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Stopwatch id={terminal.id} number={terminal.number} using={terminal.using} accumulated={terminal.accumulated} time={terminal.time} rate_i={terminal.rate_i} price={terminal.price} user={this.props.user} token={this.props.token} costItem={terminal.costItem} />
                                        </div>
                                    </div>
                                </div>))
                        }
                    </div>
                    <Panel
                        terminal={this.state.terminal}
                        times={this.state.terminal.times ? this.state.terminal.times : []}
                        user={this.state.terminal.user ? this.state.terminal.user : {}}
                        articles={this.state.terminal.articles ? this.state.terminal.articles : []}
                    />
                </div>

                {this.props.logged==="LOGGED_IN" &&
                ((this.props.user.permissions>0)?(
                <Link to="/itemterminal" className="card col-4">
                    <button id="buycyber" className="btn btn-warning position-fixed">
                        <i className="fas fa-shopping-cart fa-3x"></i>
                    </button>
                </Link>

                    ):(
                        <Link to="/buy" className="card col-4">
                            <button id="buycyber" className="btn btn-warning position-fixed">
                            <i className="fas fa-shopping-basket fa-3x" title="Comprar Artículos"></i>
                            </button>
                        </Link>
        
                            ))
                }
                {
                    this.props.logged==="LOGGED_IN" && this.props.user.permissions>0 &&(
                <Link to="/users" className="card col-4">
                    <button id="usercyber" className="btn btn-warning position-fixed">
                        <i className="fas fa-users fa-3x"></i>
                    </button>
                </Link>
                   )
                }
            </div>
        )
    }
}