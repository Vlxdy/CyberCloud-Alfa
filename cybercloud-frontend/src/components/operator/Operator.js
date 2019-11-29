import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class Operator extends Component {
    state = {
        operators: [],
        select: "",
        operator: {},
        permissions: []
    }
    getUser = async (id) => {
        const resp = await axios.get('http://' + global.ip + ':4000/api/operator/' + id);
        this.setState({
            select: id,
            operator: resp.data.auth,
            permissions: resp.data.permission
        });
        //console.log(resp)
    }
    updateOperator = async (number) => {
        await axios.put('http://' + global.ip + ':4000/api/operator/' + this.state.operator._id, {
            number
        });
        this.getUser(this.state.operator._id)
    }
    componentDidMount() {
        this.getOperators();
    }

    getOperators = async () => {
        const req = await axios.get('http://' + global.ip + ':4000/api/operator/')
        this.setState({
            operators: req.data
        })
        //console.log(this.state.operators);
    }
    render() {
        return (
            this.props.user.poperator?
            <div className="container">
                <div className="row m-2">
                <Link to="/useroperator" className="card col-4">
                    <button className="btn">
                        Agregar Administradores
                    </button>
                </Link>
                </div>
            <div className="row">
                
                <div className="col-md-5">
                    <div className="container">
                        <div className="list-group">
                            {
                                this.state.operators.map(user => (
                                    <button type="button" className={
                                        user._id === this.state.select ? "list-group-item list-group-item-action  list-group-item-info active" : "list-group-item list-group-item-action"}
                                        key={user._id}
                                        onClick={() => this.getUser(user._id)}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm">
                                                    {user.name.substring(0, 15)}
                                                </div>
                                                <div className="col-sm">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="container">
                        <div className="list-group">
                            { (this.state.select!=="" &&
                                this.state.permissions.map(permission => (
                                    <button type="button" className={
                                        permission.value? "btn btn-info m-1" : "btn btn-info m-1 disabled"}
                                        key={permission.number}
                                        onClick={() => this.updateOperator(permission.number)}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm">
                                                    {permission.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )))
                                ||
                                (
                                    this.state.select==="" && (
                                        <p>
                                            Seleccione un operador.
                                            Para desactivar y activar permisos, haga click en el permiso.
                                        </p>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>:""
        )
    }
}