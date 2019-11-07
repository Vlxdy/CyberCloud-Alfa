import React, { Component } from 'react'
import ItemsPetition from './ItemsPetition'
import {format} from 'timeago.js'

export default class PetitionsUser extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        (this.props.petitions.length>0 && (this.props.petitions.map(petition => (
                            <div className="card text-white m-1" key={petition._id}>
                                <div className="card-header  bg-dark">
                                <strong>{format(petition.time, 'es_ES')}</strong>
                                </div>
                                <ItemsPetition items={petition.items}/>
                                <div className="card-footer  bg-dark">
                                    <h4>Costo: <strong>{petition.cost} Bs</strong></h4>
                                </div>
                            </div>)
                        )))
                        ||
                        (this.props.petitions.length===0 &&(
                            <h1>La lista de peticiones está vacía.</h1>
                        ))
                    }
                </div>
            </div>
        )
    }
}
