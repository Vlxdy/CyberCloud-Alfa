import React, { Component } from 'react'
import axios from 'axios'
//import Modal from 'react-bootstrap-modal'
export default class Group extends Component {
    state = {
        groups: [],
        selected: "",
        operatorG: [],
        operatorS: []
    };
    componentDidMount() {
        this.getGroups();
    }
    addOperatorToGroup = async (id) => {
        console.log("blabla")
        const resp = await axios.put('http://' + global.ip + ':4000/api/operatorgroup/' + this.state.selected, {
            operator: id
        });
        this.onChangeSelected(this.state.selected);
        console.log(resp)
    }
    deleteOperatorToGroup = async (id) => {
        console.log("blabla")
        const resp = await axios.patch('http://' + global.ip + ':4000/api/operatorgroup/' + this.state.selected, {
            operator: id
        });
        this.onChangeSelected(this.state.selected);
        console.log(resp)
    }
    getGroups = async () => {
        const res = await axios.get('http://' + global.ip + ':4000/api/operatorgroup')
        this.setState({
            groups: res.data,
            selected: "",
            operatorS: [],
            operatorG: []
        });
        console.log(res)
    }
    onChangeSelected = async (e) => {
        const res = await axios.get('http://' + global.ip + ':4000/api/operatorgroup/' + e);
        this.setState({
            selected: e,
            operatorS: res.data.operatorS,
            operatorG: res.data.operatorG
        });
        console.log(res.data);
    }
    createGroup = async () => {
        const resp = window.prompt("Introduce el nombre del grupo", "");
        if (resp !== null && resp !== "") {
            await axios.post('http://' + global.ip + ':4000/api/operatorgroup', {
                name: resp
            });
            this.getGroups();
        }
        else {
            console.log(resp)
        }
    }
    deleteGroup = async (id) => {
        const resp = window.confirm("¿Está seguro de eliminar ese grupo?");
        if (resp) {
            await axios.delete('http://' + global.ip + ':4000/api/operatorgroup/' + id);
            this.getGroups();
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <strong className="text-center">Grupos de Operadores</strong>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-primary m-2" onClick={() => this.createGroup()}>Crear un nuevo grupo</button>
                                <br />
                                <ul className="list-group">
                                    {
                                        (this.state.groups.length===0 && (
                                            <label htmlFor="">Lista Vacía</label>
                                        )
                                        ) ||(
                                        this.state.groups.map(group => (
                                            <li className={"list-group-item list-group-item-action list-group-item-secondary" + (this.state.selected === group._id ? " active" : "")}
                                                key={group._id}
                                                onClick={() => this.onChangeSelected(group._id)}>
                                                {group.name}
                                                <button className="btn btn-danger float-right btn-sm" onClick={() => this.deleteGroup(group._id)}>Eliminar</button>
                                            </li>
                                        )))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header text-center">
                                <strong className="text-center">Miembros del grupo</strong>
                            </div>
                            <div className="card-body">
                            <label htmlFor="">Miembros del grupo:</label>
                                <ul className="list-group">
                                    {
                                        (this.state.operatorG.length===0 && (
                                            <label htmlFor="">Lista Vacía</label>
                                        )

                                        ) ||(
                                        this.state.operatorG.map(operator => (
                                            <li className="list-group-item list-group-item-action list-group-item-secondary"
                                                key={operator._id}
                                                onClick={() => this.onChangeSelected(operator._id)}>
                                                    <div className="row">
                                                    <div className="col-4">
                                                        {operator.name.toUpperCase()}
                                                    </div>
                                                    <div className="col-4">
                                                        {operator.email}
                                                    </div>
                                                    <div className="col-4">
                                                    <button className="btn btn-danger float-right btn-sm" onClick={() => this.deleteOperatorToGroup(operator._id)}>Quitar</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )))
                                    }
                                </ul>
                            </div>
                            <div className="card-body">
                                <label htmlFor="">Otros Operadores:</label>
                                <ul className="list-group">
                                    {
                                        (this.state.operatorS.length===0 && (
                                            <label htmlFor="">Lista Vacía</label>
                                        )

                                        ) ||(this.state.operatorS.length>0 &&
                                        this.state.operatorS.map(operator => (
                                            <li className="list-group-item list-group-item-action list-group-item-secondary"
                                                key={operator._id}
                                            >
                                                <div className="row">
                                                    <div className="col-4">
                                                        {operator.name.toUpperCase()}
                                                    </div>
                                                    <div className="col-4">
                                                        {operator.email}
                                                    </div>
                                                    <div className="col-4">
                                                        <button className="btn btn-success float-right btn-sm" onClick={() => this.addOperatorToGroup(operator._id)}>Agregar</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                        )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
