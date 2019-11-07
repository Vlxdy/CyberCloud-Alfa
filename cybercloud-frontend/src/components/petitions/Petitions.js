import React, { Component } from 'react'
import axios from 'axios'
import ItemsPetition from './ItemsPetition'
import { format } from 'timeago.js'

export default class Petitions extends Component {
    deletePetition = async (id) => {
        await axios.delete('http://'+global.ip+':4000/api/petition/' + id);
    }
    paidPetition = async (items, user, username, id, cost) => {
        const response = window.confirm("¿Está seguro que desea entregar este pedido de "+cost+" Bs?");
        if (response) {
            await axios.post('http://'+global.ip+':4000/api/itempurchased', {
                id,
                items,
                user,
                username,
                operator: this.props.user._id,
                operatorname: this.props.user.name
            });
            //await axios.delete('http://localhost:4000/api/petition/' + id);
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        (this.props.petitionsUsers.length > 0 && (this.props.petitionsUsers.map(petition => (
                            <div className="card text-white m-1" key={petition._id}>
                                <div className="card-header  bg-primary">
                                    <h4 className="font-weight-bold">{petition.username}</h4>
                                    <h5>Nro Terminal: <strong>{petition.terminal}</strong></h5>
                                    <strong>{format(petition.time, 'es_ES')}</strong>
                                </div>
                                <ItemsPetition items={petition.items} />
                                <div className="card-footer  bg-primary">
                                    <h4>Costo: <strong>{petition.cost} Bs</strong></h4>
                                    <button className="btn btn-warning m-1" onClick={() => this.paidPetition(petition.items, petition.user, petition.username, petition._id, petition.cost)}>Entregar</button>
                                    <button className="btn btn-warning" onClick={() => this.deletePetition(petition._id)}>Eliminar</button>
                                </div>
                            </div>)
                        )))
                        ||
                        (this.props.petitionsUsers.length === 0 && (
                            <h1>La lista de peticiones está vacía.</h1>
                        ))
                    }
                </div>
            </div>
        )
    }
}
