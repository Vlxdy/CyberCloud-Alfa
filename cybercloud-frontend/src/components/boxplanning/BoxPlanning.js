import React, { Component } from 'react'
import axios from 'axios';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import dateFormat from 'dateformat-light';
import CreateBox from './CreateBox';
import EditBox from './EditBox';
registerLocale('es', es);
//setDefaultLocale('es');
export default class BoxPlanning extends Component {
    state = {
        boxes: [],
        select: "",
        create: false,
        edit: false
    }
    onChangeBox = (e) => {
        this.setState({
            select: e
        })
    }
    onChangeCreate = () => {
        this.setState({
            create: !this.state.create
        })
    }
    onChangeEdit = (number) => {
        this.setState({
            edit: !this.state.edit,
            create: false,
            select: number
        })
    }
    onCancelEdit = () => {
        this.setState({
            edit: false,
            create: false,
            select: ""
        })
    }
    componentDidMount() {
        this.getBox();
    }
    getBox = async () => {
        const res = await axios.get('http://' + global.ip + ':4000/api/box');
        res.data.reverse()
        this.setState({
            boxes: res.data
        })
        console.log(res.data)
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header text-center">
                                <strong className="text-center">Lista de Cajas</strong>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-action list-group-item-dark active">
                                        <div className="row">
                                            <div className="col-1">
                                                #
                                            </div>
                                            <div className="col-3">
                                                Fecha de inicio
                                            </div>
                                            <div className="col-3">
                                                Fecha de Fin
                                            </div>
                                            <div className="col-3">
                                                Grupo Encargado
                                            </div>
                                            <div className="col-2">

                                            </div>
                                        </div>
                                    </li>
                                    {
                                        (this.state.boxes.length === 0 && (
                                            <label htmlFor="">Lista Vacía</label>
                                        )
                                        ) ||
                                        (
                                            this.state.boxes.map(box => (
                                                <li className={"list-group-item list-group-item-action list-group-item-light" + (this.state.select === box.number ? " active" : "") + (box.used ? " disabled" : "")}
                                                    key={box._id}
                                                    aria-disabled={box.used}
                                                >
                                                    <div className="row">
                                                        <div className="col-1">
                                                            {box.number}
                                                        </div>
                                                        <div className="col-3">
                                                            {box.calendar ? dateFormat(box.calendar.init, "m/d/yy HH:MM:ss") : ""}
                                                        </div>
                                                        <div className="col-3">
                                                            {box.calendar ? dateFormat(box.calendar.end, "m/d/yy HH:MM:ss") : ""}
                                                        </div>
                                                        <div className="col-5">
                                                            {box.namegroup ? box.namegroup : ""}
                                                            {box.used ? "" :
                                                                <button className={"btn btn-danger float-right btn-sm" + (box.used ? " disabled" : "")} onClick={() => this.onChangeEdit(box.number)} disabled={this.state.edit}>Editar</button>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {this.state.edit ? <EditBox onCancelEdit={this.onCancelEdit} onChangeEdit={this.onChangeEdit} getBox={this.getBox} box={this.state.select} /> :
                            (this.state.create ? <CreateBox onChangeCreate={this.onChangeCreate} getBox={this.getBox} /> :
                                <button type="button" className="btn btn-info btn-block" onClick={this.onChangeCreate}>Añadir Nueva Caja</button>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
