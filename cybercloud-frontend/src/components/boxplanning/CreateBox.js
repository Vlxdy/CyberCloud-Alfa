import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
//import dateFormat from 'dateformat-light';
registerLocale('es', es);

export default class CreateBox extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        groups: [],
        select: "",
        selectGroup: ""
    }
    onChangeGroup = e => {
        this.setState({
            selectGroup: e.target.value
        })
    }
    getGroups = async () => {
        const res = await axios.get('http://' + global.ip + ':4000/api/operatorgroup')
        this.setState({
            groups: res.data,
            selectGroup: res.data.length > 0 ? res.data[0]._id : ""
        });
    }
    componentDidMount() {
        this.getGroups();
    }
    
    addBox = async () => {
        if (Date.parse(this.state.startDate) < Date.parse(this.state.endDate)) {
            await axios.post('http://' + global.ip + ':4000/api/box', {
                group: this.state.selectGroup,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            });
            this.props.getBox();
        }
        else {
            window.alert("Llena correctamente los datos.")
        }
        console.log(this.state)
        this.props.onChangeCreate();
    }
    handleChangeStart = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeEnd = date => {
        this.setState({
            endDate: date
        });
    };
    render() {
        return (
            <div className="card">
                <div className="card-header text-center">
                    <strong className="">Crear Caja</strong>
                </div>
                <div className="card-body text-center">
                    <div className="form-group">
                        <label htmlFor="">Fecha de inicio:</label><br />
                        <DatePicker className="form-control text-center"
                            locale="es"
                            selected={this.state.startDate}
                            onChange={this.handleChangeStart}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy H:mm"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Fecha de fin:</label><br />
                        <DatePicker
                            className="form-control text-center"
                            locale="es"
                            selected={this.state.endDate}
                            onChange={this.handleChangeEnd}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy H:mm"
                            minDate={this.state.startDate}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Grupo encargado de la Caja:</label>
                        <select className="browser-default custom-select" value={this.state.selectGroup} onChange={this.onChangeGroup}>
                            {
                                this.state.groups.map(group => (
                                    <option className="text-center" value={group._id} key={group._id}>{group.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="card-footer text-center">
                <div className="form-group">
                        <button className="btn btn-info m-2" onClick={() => this.addBox()}>Crear</button>
                        <button className="btn btn-danger" onClick={this.props.onChangeCreate}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}
