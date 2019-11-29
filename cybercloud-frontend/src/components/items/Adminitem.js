import React, { Component } from 'react';
import axios from 'axios';
import CreateItem from './CreateItem'
import EditItem from './EditItem'
export default class Adminitem extends Component {
    state = {
        select: "",
        items: [],
        item: {},
        create: false,
        edit: false
    }
    onCancelEdit = () => {
        this.setState({
            edit: false,
            create: false,
            select: ""
        })
    }
    onChangeCreate = () => {
        this.setState({
            create: !this.state.create
        })
    }
    onChangeEdit = (item) => {
        this.setState({
            edit: !this.state.edit,
            create: false,
            select: item._id,
            item: item
        })
    }
    componentDidMount() {
        this.getItems();
    }
    getItems = async () => {
        const res = await axios.get('http://' + global.ip + ':4000/api/item')
        this.setState({
            items: res.data
        });
        //console.log(res)
    }
    deleteItem = async (itemId) => {
        const response = window.confirm('¿Desea eliminar el producto?');
        try {
            if (response) {
                await axios.delete('http://' + global.ip + ':4000/api/item/' + itemId);
                this.getItems();
            }
        } catch (error) {
            console.log(error)
        }
    }
    availableItem = async (itemId) => {
        try {
            await axios.patch('http://' + global.ip + ':4000/api/item/' + itemId);
            this.getItems();
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            this.props.user.particle ? (
                <div className="row">
                    <div className="col-8">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-action list-group-item-info active">
                                <div className="row">
                                    <div className="col-4">
                                        Descripción
                                            </div>
                                    <div className="col-2">
                                        Precio
                                            </div>
                                    <div className="col-2">
                                        Cantidad
                                            </div>
                                    <div className="col-4">
                                        Opciones
                                            </div>
                                </div>
                            </li>
                            {
                                this.state.items.map(item => (
                                    <li className={"list-group-item list-group-item-action" + (item._id === this.state.select ? " active" : "") + (item.available ? "" : " list-group-item-secondary")} key={item._id} >
                                        <div className="row">
                                            <div className="col-4">
                                                <img src={"http://" + global.ip + ":4000/images/" + item.image} className="rounded float-left" height="30" width="30" alt="Error" onError={(e) => { e.target.src = "http://localhost:4000/images/item.png" }} />
                                                {item.description.toUpperCase()}
                                            </div>
                                            <div className="col-2">
                                                {item.price} Bs
                                            </div>
                                            <div className="col-2">
                                                {item.service ? "Servicio" : item.amount}
                                            </div>
                                            <div className="col-4">
                                                <div className="btn-group btn-group-toggle " data-toggle="buttons">
                                                    <button className="btn btn-danger float-right btn-sm" onClick={() => this.deleteItem(item._id)} disabled={this.state.edit}>Eliminar</button>
                                                    <button className={"btn float-right btn-sm " + (item.available ? "btn-warning" : "btn-success")} onClick={() => this.availableItem(item._id)} disabled={this.state.edit}>{item.available ? "Deshabilitar" : "Habilitar"}</button>
                                                    <button className="btn btn-info float-right btn-sm" onClick={() => this.onChangeEdit(item)} disabled={this.state.edit}>Editar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        {this.state.edit ? <EditItem item={this.state.item} getItems={this.getItems} onCancelEdit={this.onCancelEdit} /> :
                            (this.state.create ? <CreateItem onChangeCreate={this.onChangeCreate} getItems={this.getItems} /> :
                                <button type="button" className="btn btn-info btn-block" onClick={this.onChangeCreate}>Crear Nuevo Artículo</button>)
                        }
                    </div>
                </div>
            ) : ""
        )
    }
}
