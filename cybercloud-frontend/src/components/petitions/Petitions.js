import React, { Component } from 'react'
import axios from 'axios'
import ItemsPetition from './ItemsPetition'
import {format} from 'timeago.js'

export default class Petitions extends Component {
    state = {
        PetitionList:[]
    }
    componentDidMount(){
        this.getPetitions();
    }
    deletePetition = async(id)=>{
        await axios.delete('http://localhost:4000/api/petition/'+id);
        this.getPetitions();
    }
    paidPetition = async(items, user, username, id)=>{
        await axios.post('http://localhost:4000/api/itempurchased',{
            items,
            user,
            username,
            operator: this.props.user._id,
            operatorname: this.props.user.name
        });
        await axios.delete('http://localhost:4000/api/petition/'+id);
        this.getPetitions();
    }
    getPetitions = async()=>{
        const petitions = await axios.get('http://localhost:4000/api/petition/');
        this.setState({
            PetitionList: petitions.data
        })
        console.log(this.state)
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        (this.state.PetitionList.length>0 && (this.state.PetitionList.map(petition => (
                            <div className="card text-white m-1" key={petition._id}>
                                <div className="card-header  bg-dark">
                                <h4 className="font-weight-bold">{petition.username}</h4>
                                <h5>Nro Terminal: <strong>{petition.terminal}</strong></h5>
                                <strong>{format(petition.time, 'es_ES')}</strong>
                                </div>
                                <ItemsPetition items={petition.items}/>
                                <div className="card-footer  bg-dark">
                                    <h4>Costo: <strong>{petition.cost} Bs</strong></h4>
                                    <button className="btn btn-primary m-1" onClick={()=>this.paidPetition(petition.items, petition.user, petition.username,petition._id)}>Entregar</button>
                                    <button className="btn btn-primary" onClick={()=>this.deletePetition(petition._id)}>Eliminar</button>
                                </div>
                            </div>)
                        )))
                        ||
                        (this.state.PetitionList.length===0 &&(
                            <h1>La lista de peticiones está vacía.</h1>
                        ))
                    }
                </div>
            </div>
        )
    }
}
