import React, { Component } from 'react'
import axios from 'axios'

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
    }
    getTerminals = async()=>{
        const res = await axios.get('http://'+global.ip+':4000/api/itemterminal');
        const vect =[{
                "user": {
                  "id": "0",
                  "name": ""
                },
                "using": true,
                "accumulated": 0,
                "price": 0,
                "rate": "5dd2a3e869fe5e00f018758c",
                "rate_i": 0,
                "_id": "0",
                "number": 0,
                "times": [],
                "articles": [],
                "items": [],
        }]
        for (let index = 0; index < res.data.length; index++) {
            vect.push(res.data[index])
        }
        console.log(vect);
        this.setState({
            terminals: vect
        });
        this.setState({
            selected: "0"
        });
    }
    getItembag = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/bagterminal/')
        this.setState({
            itembag: res.data.items,
            cost: res.data.cost
        });
    }
    addItembag = async (id, price, description) => {
        await axios.post('http://'+global.ip+':4000/api/bagterminal', {
            id,
            price,
            description
        });
        this.getItembag();
    }
    deleteItembag = async (id) => {
        await axios.delete('http://'+global.ip+':4000/api/bagterminal/'+id, { headers: {}, data: { } });
        this.getItembag();
    }
    deleteItembags = async () => {
        await axios.delete('http://'+global.ip+':4000/api/bagterminal/', { headers: {}, data: { id: this.props.user._id } });
        this.getItembag();
    }
    getItems = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/item')
        this.setState({
            items: res.data
        });
    }
    buyItems = async () => {
        if (this.state.cost > 0 && this.state.selected!=="") {
            const response = window.confirm('Está seguro de realizar la venta con el costo de ' + this.state.cost + ' Bs.');
            try {
                if (response) {
                    const res = await axios.post('http://'+global.ip+':4000/api/itemterminal/'+this.state.selected,{
                        token: this.props.token, operator: this.props.user
                    });
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
        this.getItems();
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
            this.props.user.enabled?
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {
                            this.state.items.map(item => (
                                <button
                                    className={"btn btn-dark m-1 col-2 p-1 align-items-center "+(item.service?"":(item.amount<=0?" disabled":""))}
                                    key={item._id}
                                    disabled={(item.service?false:(item.amount<=0?true:false))}
                                    onClick={() => this.addItembag(item._id, item.price, item.description)}>
                                    <img
                                        src={"http://"+global.ip+":4000/images/" + item.image}
                                        className="rounded float-left m-2"
                                        height="100"
                                        width="100"
                                        alt="Error"
                                        onError={(e) => { e.target.src = "http://"+global.ip+":4000/images/item.png" }} />
                                    <h6>{item.description.toUpperCase()}</h6> <h4>{item.price.toFixed(2)} Bs</h4>
                                    <h4>{(item.service?"SERVICIO":("C: "+item.amount))}</h4>

                                </button>
                            )
                            )
                        }
                    </div>
                </div>
                <div className="col-md-4 bg-dark text-white p-4">
                <div className="form-group">
                    <ul className="list-group">
                        {
                            this.state.itembag.map(itemb => (
                                <li className="list-group-item list-group-item-action list-group-item-secondary " key={itemb._id} onClick={() => this.deleteItembag(itemb._id)}>
                                    <h5>{itemb.description} </h5>
                                    <h5><strong>Precio:</strong>  {itemb.price.toFixed(2)} Bs <strong>Cantidad:</strong> {itemb.amount}</h5>
                                    <h4> <strong>Precio Total: </strong> {(itemb.amount * itemb.price).toFixed(2)}</h4>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                    <div className="form-group">
                    
                    <select value={this.state.selected} className="browser-default custom-select" onChange={this.onChangeTerminal}>
                                {
                                    this.state.terminals.map(terminal => (
                                        terminal.using && (<option value={terminal._id} key={terminal._id} >{terminal.number}</option>)
                                    ))
                                }
                            </select>
                            </div>
                    <strong><h2>Precio Total: {this.state.cost.toFixed(2)}</h2></strong>
                    <div >
                    <div className="form-group">
                        <button className="btn bg-light m-1" onClick={this.deleteItembags}>Limpiar</button>
                        <button className="btn bg-light" onClick={this.buyItems}>Vender</button>
                        </div>
                    </div>
                </div>
            </div>:""
        )
    }
}