import React, { Component } from 'react'
import axios from 'axios'

//import { format } from 'timeago.js'
//import { Link } from 'react-router-dom'

export default class ItemTerminal extends Component {
    state = {
        items: [],
        itembag: [],
        terminals:[],
        cost: 0,
        selected: ""
    }
    componentDidMount() {
        this.getItems();
        this.getItembag();
        this.getTerminals();
        /*
        if (this.props.logged === "LOGGED_IN") {
            this.getItems();
            this.getItembag();
            console.log(this.props.user._id)
        }
        else {
            window.alert("Por favor inicie sesión.")
            this.props.history.push('/signin')
        }*/
    }
    getTerminals = async()=>{
        const res = await axios.get('http://localhost:4000/api/itemterminal');
        this.setState({
            terminals: res.data
        });
        for (let index = 0; index < res.data.length; index++) {
            if(res.data[index].using){
                this.setState({
                    selected: res.data[index]._id
                });
                break;
            }
        }
        console.log(res.data)
    }
    getItembag = async () => {
        const res = await axios.get('http://localhost:4000/api/bagterminal/')
        //console.log("asdasd")
        //console.log(res)
        this.setState({
            itembag: res.data.items,
            cost: res.data.cost
        });
    }
    addItembag = async (id, price, description) => {
        await axios.post('http://localhost:4000/api/bagterminal', {
            id,
            price,
            description
        });
        this.getItembag();
    }
    deleteItembag = async (id) => {
        await axios.delete('http://localhost:4000/api/bagterminal/'+id, { headers: {}, data: { } });
        this.getItembag();
    }
    deleteItembags = async () => {
        //console.log("asdasdasd")
        await axios.delete('http://localhost:4000/api/bagterminal/', { headers: {}, data: { id: this.props.user._id } });
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
        console.log(this.state.selected)
        if (this.state.cost > 0 && this.state.selected!=="") {
            const response = window.confirm('Está seguro de realizar la venta con el costo de ' + this.state.cost + ' Bs.');
            try {
                if (response) {
                    const res = await axios.post('http://localhost:4000/api/itemterminal/'+this.state.selected);
                    console.log(res)
                }
            } catch (error) {
                window.alert("Hubo un error. Consulté a un administrativo.")
                console.log(error)
            }
        }
        else {
            window.alert("Seleccione algun artículos y seleccione una terminal.")
        }
    }
    onChangeTerminal = e => {
        this.setState({
            selected: e.target.value
        })
    }
    onChangeAuxi = (e) => {
        this.setState({
            selected: e
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {
                            this.state.items.map(item => (
                                <button
                                    className="card card-body m-1 col-2 p-1 align-items-center list-group-item-action"
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
                                </button>
                            )
                            )
                        }
                    </div>
                </div>
                <div className="col-md-4 bg-dark text-white p-4">
                    <ul className="list-group">
                        {
                            this.state.itembag.map(itemb => (
                                <li className="list-group-item list-group-item-action list-group-item-secondary " key={itemb._id} onDoubleClick={() => this.deleteItembag(itemb._id)}>
                                    <h5>{itemb.description} </h5>
                                    <h5><strong>Precio:</strong>  {itemb.price.toFixed(2)} Bs <strong>Cantidad:</strong> {itemb.amount}</h5>
                                    <h4> <strong>Precio Total: </strong> {(itemb.amount * itemb.price).toFixed(2)}</h4>
                                </li>
                            ))
                        }
                    </ul>
                    <select value={this.state.selected} className="browser-default custom-select" onChange={this.onChangeTerminal}>
                                {
                                    this.state.terminals.map(terminal => (
                                        terminal.using && (<option value={terminal._id} key={terminal._id} >{terminal.number}</option>)
                                    ))
                                }
                            </select>
                    <strong><h2>Precio Total: {this.state.cost.toFixed(2)}</h2></strong>
                    <div >
                        <button className="btn bg-light m-1" onClick={this.deleteItembags}>Limpiar</button>
                        <button className="btn bg-light" onClick={this.buyItems}>Vender</button>
                    </div>
                </div>
            </div>
        )
    }
}