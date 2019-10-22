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
        if (this.props.logged === "LOGGED_IN") {
            this.getItems();
            this.getItembag();
            console.log(this.props.user._id)
        }
        else {
            window.alert("Por favor inicie sesión.")
            this.props.history.push('/signin')
        }
    }
    getItembag = async () => {
        const res = await axios.get('http://localhost:4000/api/itemuser/' + this.props.user._id)
        //console.log("asdasd")
        //console.log(res)
        this.setState({
            itembag: res.data.items,
            cost: res.data.cost
        });
    }
    addItembag = async (id, price, description) => {
        await axios.put('http://localhost:4000/api/itemuser/' + this.props.user._id, {
            article: id,
            price,
            description
        });
        this.getItembag();
    }
    deleteItembag = async (article) => {
        await axios.delete('http://localhost:4000/api/itemuser/' + this.props.user._id, { headers: {}, data: { article } });
        this.getItembag();
    }
    deleteItembags = async () => {
        //console.log("asdasdasd")
        await axios.delete('http://localhost:4000/api/itemuser/', { headers: {}, data: { id: this.props.user._id } });
        this.getItembag();
    }
    getItems = async () => {
        const res = await axios.get('http://localhost:4000/api/item')
        this.setState({
            items: res.data
        });
        //console.log(res)
    }
    buyItems = async () => {
        if (this.state.cost > 0) {
            const response = window.confirm('El pedido tendrá un costó de ' + this.state.cost + ' Bs.');
            try {
                if (response) {
                    await axios.post('http://localhost:4000/api/petition', {
                        user: this.props.user._id,
                        items: this.state.itembag
                    });
                    this.deleteItembags();
                }
            } catch (error) {
                window.alert("Hubo un error. Consulté a un administrativo.")
            }
        }
        else {
            window.alert("Seleccione algunos artículos.")
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {
                            this.state.items.map(item => (
                                <div
                                    className="card card-body m-1 col-2 p-1 align-items-center"
                                    key={item._id}
                                    onDoubleClick={() => this.addItembag(item._id, item.price, item.description)}>
                                    <img
                                        src={"http://localhost:4000/images/" + item.image}
                                        className="rounded float-left"
                                        height="100"
                                        width="100"
                                        alt="Error"
                                        onError={(e) => { e.target.src = "http://localhost:4000/images/item.png" }} />
                                    <h6>{item.description}</h6> <h4>{item.price.toFixed(2)} Bs</h4>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
                <div className="col-md-4 bg-dark text-white p-4">
                    <ul className="list-group">
                        {
                            this.state.itembag.map(itemb => (
                                <li className="list-group-item list-group-item-action list-group-item-secondary " key={itemb._id} onDoubleClick={() => this.deleteItembag(itemb.article)}>
                                    <h5>{itemb.description} </h5>
                                    <h5><strong>Precio:</strong>  {itemb.price.toFixed(2)} Bs <strong>Cantidad:</strong> {itemb.amount}</h5>
                                    <h4> <strong>Precio Total: </strong> {(itemb.amount * itemb.price).toFixed(2)}</h4>
                                </li>
                            ))
                        }
                    </ul>
                    <strong><h2>Precio Total: {this.state.cost.toFixed(2)}</h2></strong>
                    <div >
                        <button className="btn bg-light" onClick={this.deleteItembags}>Limpiar</button>
                        <button className="btn bg-light" onClick={this.buyItems}>Solicitar Petición</button>
                    </div>
                </div>
            </div>
        )
    }
}