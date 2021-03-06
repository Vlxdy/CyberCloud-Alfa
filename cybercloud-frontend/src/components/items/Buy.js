import React, { Component } from 'react'
import axios from 'axios'

//import { format } from 'timeago.js'
//import { Link } from 'react-router-dom'

export default class Buy extends Component {
    state = {
        items: [],
        itembag: [],
        cost: 0
    }
    componentDidMount() {
            this.getItems();
            this.timer = setTimeout(() => {
                this.getItembag();
            }, 1000)
    }
    getItembag = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/itemuser/' + this.props.user._id)
        //console.log("asdasd")
        //console.log(res)
        this.setState({
            itembag: res.data.items,
            cost: res.data.cost
        });
    }
    addItembag = async (id, price, description) => {
        await axios.put('http://'+global.ip+':4000/api/itemuser/' + this.props.user._id, {
            article: id,
            price,
            description
        });
        this.getItembag();
    }
    deleteItembag = async (article) => {
        await axios.delete('http://'+global.ip+':4000/api/itemuser/' + this.props.user._id, { headers: {}, data: { article } });
        this.getItembag();
    }
    deleteItembags = async () => {
        //console.log("asdasdasd")
        await axios.delete('http://'+global.ip+':4000/api/itemuser/', { headers: {}, data: { id: this.props.user._id } });
        this.getItembag();
    }
    getItems = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/item')
        this.setState({
            items: res.data
        });
        //console.log(res)
    }
    buyItems = async () => {
        if (this.state.cost > 0) {
            const response = window.confirm('El pedido tendrá un costó de ' + this.state.cost + ' Bs.');
            console.log(this.props.user.money)
            if (this.props.user.money >= this.state.cost) {
                try {
                    if (response) {
                        const response = await axios.post('http://'+global.ip+':4000/api/petition', {
                            user: this.props.user._id,
                            username: this.props.user.name,
                            items: this.state.itembag
                        });
                        if (response.data.status) {
                            this.deleteItembags();
                        }
                        else{
                            window.alert("Comprueba la disponibilidad del producto.")
                        }
                        
                    }
                } catch (error) {
                    window.alert("Hubo un error. Consulté a un administrativo.")
                }
            }
            else { window.alert("Credito insuficiente.") }
        }
        else {
            window.alert("Seleccione algunos artículos.")
        }
        this.getItems();
    }
    render() {
        return (
            this.props.logged === "LOGGED_IN"?
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {
                            this.state.items.map(item => ((!item.service)?
                                <button
                                    className={"btn btn-dark m-1 col-2 p-1 align-items-center "+(item.amount<=0?" disabled":"")}
                                    key={item._id}
                                    disabled={item.amount<=0?true:false}
                                    onClick={() => this.addItembag(item._id, item.price, item.description)}>
                                    <img
                                        src={"http://"+global.ip+":4000/images/" + item.image}
                                        className="rounded float-left m-2"
                                        height="100"
                                        width="100"
                                        alt="Error"
                                        onError={(e) => { e.target.src = "http://"+global.ip+":4000/images/item.png" }} />
                                    <h6>{item.description.toUpperCase()}</h6> <h4>{item.price.toFixed(2)} Bs</h4>
                                    <h4>C: {item.amount}</h4>
                                    
                                </button>:""
                            )
                            )
                        }
                    </div>
                </div>
                <div className="col-md-4 bg-info text-white p-4">
                    <ul className="list-group">
                        {
                            this.state.itembag.map(itemb => (
                                <li className="list-group-item list-group-item-action list-group-item-info" key={itemb._id} onClick={() => this.deleteItembag(itemb.article)}>
                                    <h5>{itemb.description} </h5>
                                    <h5><strong>Precio:</strong>  {itemb.price.toFixed(2)} Bs <strong>Cantidad:</strong> {itemb.amount}</h5>
                                    <h4> <strong>Precio Total: </strong> {(itemb.amount * itemb.price).toFixed(2)}</h4>
                                </li>
                            ))
                        }
                    </ul>
                    <strong><h2>Precio Total: {this.state.cost.toFixed(2)}</h2></strong>
                    <div >
                        <button className="btn bg-light m-1" onClick={this.deleteItembags}>Limpiar</button>
                        <button className="btn bg-light" onClick={this.buyItems}>Solicitar Petición</button>
                    </div>
                </div>
            </div>:""
        )
    }
}