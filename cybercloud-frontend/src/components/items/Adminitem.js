import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class Adminitem extends Component {

    state = {
        description: '',
        price: 0,
        image: "",
        items: [],
        images: []
    }

    async componentDidMount() {
        this.getItems();
        this.getImages();
    }
    getImages = async () => {
        const res = await axios.get('http://localhost:4000/api/image')
        this.setState({
            images: res.data
        });
        console.log(res)
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
    onChangeImage = e => {
        this.setState({
            image: e.target.value
        })
        console.log(this.state)
    }
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/item', {
            description: this.state.description,
            price: this.state.price,
            service: false,
            image: this.state.image
        });
        this.setState({
            description: '',
            price: 0,
            image: ''
        });
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
                                <label>Descripción:</label>
                                <input
                                    className="form-control"
                                    value={this.state.description}
                                    type="text"
                                    onChange={this.onChangeDescription}
                                    placeholder="Escribe algo"
                                    maxLength="20"
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del artículo:</label>
                                <input
                                    className="form-control"
                                    value={this.state.price}
                                    type="text"
                                    onChange={this.onChangePrice}
                                />
                            </div>
                            <div className="form-group">
                            <select size="6" className="browser-default custom-select" onChange={this.onChangeImage}>
                                {
                                    this.state.images.map(image => (
                                        <option value={image.name} key={image._id}>{image.detail}</option>
                                    ))
                                }
                            </select>
                            <div className="form-group">
                            <Link className="navbar-brand" to="/image">
                            <h6>Administrar íconos</h6>
                            </Link>
                            </div>
                            
                            </div>
                            
                            <button type="submit" className="btn btn-secondary">Guardar</button>
                        </form>
                    </div>
                    
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.items.map(item => (

                                <li className="list-group-item list-group-item-action" key={item._id} onDoubleClick={() => this.deleteItem(item._id)}>
                                    <div className="row">
                                        <div className="col-sm">
                                            <img src={"http://localhost:4000/images/" + item.image} className="rounded float-left" height="30" width="30" alt="http://localhost:4000/images/item.png" />
                                            {item.description.toUpperCase()}
                                        </div>
                                        <div className="col-sm">
                                            PRECIO:  {item.price} Bs
                                    </div>
                                        <div className="col-sm">
                                            CANTIDAD:
                                    </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
