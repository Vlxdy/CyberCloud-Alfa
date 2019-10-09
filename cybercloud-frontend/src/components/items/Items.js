import React, { Component } from 'react'
import axios from 'axios'

//import { format } from 'timeago.js'
//import { Link } from 'react-router-dom'

export default class Items extends Component {
    state = {
        items: [],
        itembag: [],
        cost: 0
    }
    async componentDidMount() {
        this.getItems();
        this.getItembag();
    }
    getItembag = async () => {
        const res = await axios.get('http://localhost:4000/api/itembag')
        console.log(res)
        this.setState({
            itembag: res.data.items,
            cost: res.data.cost
        });
        
    }
    addItembag = async(id, price, description)=>{
        await axios.post('http://localhost:4000/api/itembag', {
            id,
            price,
            description
        });
        this.getItembag();
    }
    deleteItembag = async(id, price)=>{
        console.log(id)
        await axios.delete('http://localhost:4000/api/itembag/'+id)
        this.getItembag();
    }
    getItems = async () => {
        const res = await axios.get('http://localhost:4000/api/item')
        this.setState({
            items: res.data
        });
        console.log(res)
    }                
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <div className="list-group">
                    {
                        this.state.items.map(item => (
                                <li className="list-group-item list-group-item-action list-group-item-secondary" key={item._id} onDoubleClick={() => this.addItembag(item._id, item.price, item.description)}>
                                {item.description} {item.price.toFixed(2)} Bs {item.service}
                                </li>
                            )
                        )
                    }
                </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.itembag.map(itemb => (
                                <li className="list-group-item list-group-item-action" key={itemb._id} onDoubleClick={() => this.deleteItembag(itemb._id, itemb.price)}>
                                    {itemb.description} Precio: {itemb.price.toFixed(2)} Bs Cantidad: {itemb.amount} Precio Total: {(itemb.amount*itemb.price).toFixed(2)}
                                </li>
                            ))
                        }
                    </ul>
                    <h2>{this.state.cost.toFixed(2)}</h2>
                </div>
            </div>
                

        )
    }
}