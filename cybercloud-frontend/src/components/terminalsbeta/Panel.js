import React, { Component } from 'react'
import dateFormat from 'dateformat-light';
export default class Panel extends Component {
    render() {
        let seconds = ("0" + (Math.floor(this.props.terminal.time / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(this.props.terminal.time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(this.props.terminal.time / 3600000)).slice(-2);
        return (
            <div id={"panelcyber"+(this.props.terminal.using?(
                this.props.user.id==="0"?"1":"2"
            ):"")}
            className={"card position-fixed" + (this.props.user.id === "0" ? "" : "")}>
                <div className="card-header text-center">
                <p className="display-2 font-weight-bolder text-white">{this.props.terminal.number}</p>
                </div>
                <div className="card-body">
                <h3 className="font-weight-bolder text-white">{hours}:{minutes}:{seconds}</h3>
                {(this.props.user.id !== "0" ? (
                    <div className="card">
                        Usuario: {this.props.user.name} <br />
                        Credito: {this.props.user.money} Bs
                    </div>
                ):(
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
            </div>
        )
    }
}
