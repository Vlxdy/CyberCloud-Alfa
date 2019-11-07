import React, { Component } from 'react'
import axios from 'axios'
import Interval from './Interval'

function moment(num){
    let minutes = ("0"+ (Math.floor(num/60000)%60)).slice(-2);
    let hours = ("0"+ Math.floor(num/3600000)).slice(-2);
    return hours + ":"+minutes;
}

export default class Rates extends Component {
    state={
        name: "",
        rates: [],
        times: [],
        hours: 0,
        minutes: 0,
        price: 0
    }
    componentDidMount(){
        this.getRates();
        this.getTimes();
    }
    getRates = async ()=>{
        const res = await axios.get('http://'+global.ip+':4000/api/rate');
        this.setState({
            rates:res.data
        });
    }
    getTimes = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/interval');
        this.setState({
            times: res.data
        });
    }
    onChangeName = e => {
        this.setState({
            name: e.target.value
        });
    }
    onChangeHours = e => {
        this.setState({
            hours: e.target.value
        });
    }
    onChangeMinutes = e => {
        this.setState({
            minutes: e.target.value
        });
    }
    onChangePrice = e => {
        this.setState({
            price: e.target.value
        });
    }
    onSubmitTime = async () =>{
        if(this.state.hours > 0 || this.state.minutes>0){
            const milise = this.state.hours*3600000 + this.state.minutes*60000;
            await axios.post('http://'+global.ip+':4000/api/interval',{
                time: milise,
                price: this.state.price
            });
            this.setState({
                hours: 0,
                minutes: 0,
                price: 0
            });
            this.getTimes();
        }
        else window.alert("Llene los campos necesarios.")
    }
    onSubmitRate = async () => {
        if(this.state.times.length > 0 && this.state.name !== ""){
            await axios.post('http://'+global.ip+':4000/api/rate',{
                name: this.state.name
            });
            this.getTimes();
            this.getRates();
            this.setState({
                name:""
            });
        }
        else window.alert("Llene los campos necesarios.");
    }
    deleteTime = async (id) => {
        await axios.delete('http://'+global.ip+':4000/api/interval/' + id);
        this.getTimes();
    }
    deleteRate = async (id) =>{
        const response = window.confirm("¿Está seguro que desea eliminarlo?")
        if(response){
            await axios.delete('http://'+global.ip+':4000/api/rate/'+id);
            setTimeout(() => {
                this.getRates();
            }, 500);
        }
    }
    render() {
        return (
            <div className="row m-2">
                <div className="col-md-4">

                    <div className="card card-body">
                        <h3>Crear Tarifa</h3>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                value={this.state.name}
                                type="text"
                                onChange={this.onChangeName}
                                placeholder="Escribe algo"
                                maxLength="20"
                            />
                        </div>
                        <div className="card card-body">
                            <strong>Intervalo de tiempo</strong>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Horas</label>
                                        <input
                                            className="form-control"
                                            value={this.state.hours}
                                            type="number"
                                            onChange={this.onChangeHours}
                                            placeholder="00"
                                            max="59"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Minutos</label>
                                        <input
                                            className="form-control"
                                            value={this.state.minutes}
                                            type="number"
                                            onChange={this.onChangeMinutes}
                                            placeholder="00"
                                            max="59"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Costo</label>
                                <input
                                    className="form-control"
                                    value={this.state.price}
                                    type="number"
                                    onChange={this.onChangePrice}
                                    placeholder="0 Bs."
                                />
                            </div>
                            <div className="form-group">
                                <div className="form-group">
                                    <button className="btn btn-primary" onClick={this.onSubmitTime}>Añadir Intervalo</button>
                                </div>
                                <div className="form-group">
                                    <select size="4" className="browser-default custom-select">
                                        {
                                            this.state.times.map(time => (
                                                <option value={time.time} key={time._id} onDoubleClick={() => this.deleteTime(time._id)}>Tiempo: {moment(time.time)} Costo: {time.price} Bs</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        <button onClick={this.onSubmitRate} className="btn btn-secondary">Guardar</button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="container">
                        <div className="row">
                            {
                                this.state.rates.map(rate => (
                                    <div className="card text-white m-1" key={rate._id}>
                                        <div className="card-header  bg-dark">
                                            <h4 className="font-weight-bold">{rate.name}</h4>
                                        </div>
                                        <Interval intervals={rate.interval} />
                                        <div className="card-footer  bg-dark">
                                            <button onClick={this.deleteRate.bind(this,rate._id)} className="btn btn-primary">Eliminar</button>
                                        </div>
                                    </div>)
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
