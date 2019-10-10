import React, { Component } from 'react'
import axios from 'axios'

export default class Adminitem extends Component {

    state = {
        description: '',
        price: 0,
        items: []
    }

    async componentDidMount() {
        this.getItems();
    }

    getItems = async () => {
        const res = await axios.get('http://localhost:4000/api/item')
        this.setState({
            items: res.data
        });
        console.log(res)
    } 
    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }
    onChangePrice = e => {
        this.setState({
            price: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/item', {
            description: this.state.description,
            price: this.state.price,
            service: false
        });
        this.setState({
            description: '',
            price: 0 });
        this.getItems();
    }

    deleteItem = async (itemId) => {
        const response = window.confirm('¿Desea eliminar el producto?');
        if (response) {
            await axios.delete('http://localhost:4000/api/item/' + itemId);
            this.getItems();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear Nuevo Articulo</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    value={this.state.description}
                                    type="text"
                                    onChange={this.onChangeDescription}
                                />
                                <input
                                    className="form-control"
                                    value={this.state.price}
                                    type="text"
                                    onChange={this.onChangePrice}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                    </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.items.map(item => (
                                <li className="list-group-item list-group-item-action" key={item._id} onDoubleClick={() => this.deleteItem(item._id)}>
                                    {item.description} Precio: {item.price} Bs
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
