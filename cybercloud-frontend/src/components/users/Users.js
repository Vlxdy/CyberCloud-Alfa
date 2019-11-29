import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
export default class Users extends Component {
    state = {
        users: [],
        user: {},
        recharges:[],
        select: "",
        mont: 0
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers = async () => {
        const req = await axios.get('http://'+global.ip+':4000/api/auth/')
        this.setState({
            users: req.data
        })
        console.log(this.state.users)
    }
    getUser = async (id) =>{
        const req = await axios.get('http://'+global.ip+':4000/api/auth/'+id);
        this.setState({
            select: id,
            user: req.data.user,
            recharges: req.data.recharges
        });
        console.log(req)
    }
    onChangePrice = e => {
        this.setState({
            mont: e.target.value
        });
    }
    onSubmitRecharge=async()=>{
        const response = window.confirm("¿Está seguro de asigando "+parseFloat(this.state.mont)+" Bs a "+this.state.user.name+ "?");
        if(response){
            await axios.post('http://'+global.ip+':4000/api/recharge',{
                user_id:this.state.user._id,
                operator_id:this.props.user._id,
                amount: this.state.mont
            });
            this.setState({
                mont:0
            })
            this.getUsers();
            this.getUser(this.state.user._id);
        }
    }
    render() {
        return (
            <div className="row m-2">
               <div className="col-md-4">
                   {
                       (this.state.select==="" && (<h3>Seleccione un usuario</h3>))||
                       (this.state.select!=="" &&
                       (
                    <div className="card card-body">
                        <div className="card card-body">    
                        <h3>Datos del Usuario</h3>
                        Usuario: <strong>{this.state.user.name}</strong>
                        Correo Electrónico:
                        <strong>{this.state.user.email}</strong>
                        Celular:
                        <strong>{this.state.user.phone}</strong>
                        <h5>Credito actual: </h5>
                        <h4><strong>{this.state.user.money.toFixed(2)} Bs</strong></h4>
                        </div>
                    <div className="card card-body m-1">
                    <h3>Agregar Saldo</h3>                        
                            <div className="form-group">
                                <label>Cantidad:</label>
                                <input
                                    className="form-control"
                                    value={this.state.mont}
                                    type="number"
                                    onChange={this.onChangePrice}
                                    placeholder="0 Bs."
                                    disabled={!this.props.user.enabled}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={this.onSubmitRecharge} disabled={!this.props.user.enabled}>Recargar</button>
                            </div>
                            <div className="form-group">
                                <h4>Historial</h4>
                                <div className="form-group">
                                    <select size="4" className="browser-default custom-select">
                                        {
                                            this.state.recharges.map(recharge => (
                                                <option value={recharge._id} key={recharge._id}>{recharge.amount} Bs {format(recharge.createdAt, 'es_ES')}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        
                       ))}
                </div>
                <div className="col-md-8">
                    <div className="container">
                        <div className="list-group">
                            {
                                this.state.users.map(user => (
                                    <button type="button" className={
                                        user._id === this.state.select ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                                        key={user._id}
                                        onClick={()=>this.getUser(user._id)}
                                        >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-3">
                                                    {user.name.substring(0, 15)}
                                                </div>
                                                <div className="col-4">
                                                    {user.email}
                                                </div>
                                                <div className="col-3">
                                                    {user.phone}
                                                </div>
                                                <div className="col-2">
                                                    {user.money.toFixed(2)} Bs
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
