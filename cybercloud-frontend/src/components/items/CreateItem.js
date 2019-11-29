import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class CreateItem extends Component {
    state = {
        description: '',
        price: 0,
        image: "",
        images: [],
        isChecked: false
    }
    componentDidMount() {
        this.getImages();
    }
    getImages = async () => {
        const res = await axios.get('http://' + global.ip + ':4000/api/image')
        this.setState({
            images: res.data
        });
        console.log(res)
    }
    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
        console.log(this.props.permissions)
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
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }
    onSubmit = async () => {
        try {
            if(this.state.description!=="" && this.state.price>0 && this.state.image!== "")
            {
            const result = await axios.post('http://' + global.ip + ':4000/api/item', {
                description: this.state.description,
                price: this.state.price,
                service: this.state.isChecked,
                image: this.state.image
            });
            console.log(result)
            this.setState({
                description: '',
                price: 0,
                image: '',
                isChecked: false
            });
            this.props.getItems();
        }
        else{
            window.alert("Llene todos los datos necesarios.");
        }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div className="card">
                <div className="card-header text-center">
                    <strong>Crear Nuevo Articulo</strong>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Descripción:</label>
                        <input
                            className="form-control"
                            value={this.state.description}
                            type="text"
                            onChange={this.onChangeDescription}
                            placeholder="Escribe algo"
                            maxLength="20"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio del artículo:</label>
                        <input
                            className="form-control"
                            value={this.state.price}
                            type="number"
                            onChange={this.onChangePrice}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked={this.state.isChecked} onChange={this.toggleChange} />
                            <label className="form-check-label" value={this.state.service} onClick={this.onChangeService}>Servicio, no tiene limite de Stock</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Seleccione un ícono:</label>
                        <select size="4" className="browser-default custom-select" onChange={this.onChangeImage} required>
                            {
                                this.state.images.map(image => (
                                    <option value={image.name} key={image._id}>{image.detail}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Link className="navbar-brand" to="/image">
                        <strong>Administrar íconos</strong>
                    </Link>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-info m-2" onClick={this.onSubmit}>Crear Artículo</button>
                    <button className="btn btn-danger" onClick={this.props.onChangeCreate}>Cancelar</button>
                </div>
            </div>
        )
    }
}
