import React, { Component } from 'react'
import dateFormat from 'dateformat-light';
import axios from 'axios';
export default class Panel extends Component {
    state = {
        select: 0
    }
    onChangeTerminal = e => {
        this.setState({
            select: e.target.value
        })
        console.log(this.state)
    }
    onChangeTerminal2 = (e) => {
        this.setState({
            select: e
        })
        console.log(this.state)
    }
    componentDidMount() {
    }
    refresh() {
        for (let index = 0; index < this.props.terminals.length; index++) {
            if (!(this.props.terminals[index].using)) {
                this.setState({
                    select: this.props.terminals[index].number
                })
                break;
            }
        }
    }
    submitChange = async () => {
        if (this.state.select === 0) {
            window.alert("Selecione una opción");
        }
        else {
            const reponse = window.confirm("¿Está seguro que quiere cambiar a la terminal " + this.state.select + "?")
            if (reponse) {
                const res = await axios.patch('http://' + global.ip + ':4000/api/terminalsBeta/' + this.props.terminal.id, {
                    terminal: this.state.select
                });
                this.refresh();
                console.log(res)
            }
        }
        console.log(this.state)
    }
    render() {
        let seconds = ("0" + (Math.floor(this.props.terminal.time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.props.terminal.time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.props.terminal.time / 3600000)).slice(-2);
        return (
            <div id={"panelcyber" + (this.props.terminal.using ? (
                this.props.user.id === "0" ? "1" : "2"
            ) : "")}
                className={"card position-fixed" + (this.props.user.id === "0" ? "" : "")}>
                <div className="card-header text-center">
                    <p className="display-4 font-weight-bolder text-white">{this.props.terminal.number}</p>
                </div>
                <div className="card-body">
                    <h3 className="font-weight-bolder text-white">{hours}:{minutes}:{seconds}</h3>
                    {(this.props.user.id !== "0" ? (
                        <div className="card">
                            Usuario: {this.props.user.name} <br />
                            Credito: {this.props.user.money?(this.props.user.money).toFixed(2):"0"} Bs
                    </div>
                    ) : (
                            <h3 className="font-weight-bolder text-white">
                                {(this.props.terminal.price + this.props.terminal.costItem).toFixed(2)} Bs.
                        </h3>
                        ))}
                    <br />
                    <select size="2" className="browser-default custom-select" disabled>
                        {
                            this.props.times.map(time => (
                                <option value={time._id} key={time._id}>
                                    {dateFormat(time.inittime, "HH:MM:ss")} a {dateFormat(time.endtime, "HH:MM:ss")}
                                </option>
                            ))
                        }
                    </select>
                    <strong className="text-white">Total Terminal: {this.props.terminal.price} Bs</strong>

                    {(this.props.user.id === "0" && (
                        <div>
                            <select size="2" className="browser-default custom-select" disabled>
                                {
                                    this.props.articles.map(article => (
                                        <option value={article._id} key={article._id} title={article.description + " " + article.price + " Bs # " + article.amount + " Total:" + (article.amount * article.price) + " Bs"}>
                                            {article.description} {article.price} Bs - {article.amount} T:{article.amount * article.price}
                                        </option>
                                    ))
                                }
                            </select>
                            <strong className="text-white">Total Articulos: {this.props.terminal.costItem} Bs</strong>
                        </div>
                    ))}
                </div>
                {this.props.terminal.using ? <div className="card-footer">
                    <div className="row">
                        <div className="col-6">
                            <select className="browser-default custom-select"
                                onChange={this.onChangeTerminal}
                                value={this.state.select}
                            >
                                {
                                    this.props.terminals.map(terminal => (
                                        (!terminal.using) ?
                                            <option value={terminal.number} key={terminal.id}
                                                onClick={() => this.onChangeTerminal2(terminal.number)}
                                            >
                                                {terminal.number}
                                            </option> : ""
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-sm float-left"
                                onClick={this.submitChange}
                            >Cambiar</button>
                        </div>
                    </div>
                </div> : ""}
            </div>
        )
    }
}
