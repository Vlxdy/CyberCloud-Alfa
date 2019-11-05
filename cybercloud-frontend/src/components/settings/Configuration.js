import React, { Component } from 'react'
import axios from 'axios'
import Alert from '../WarningMessage'
export default class Configuration extends Component {
    state={
        terminals:[],
        rates:[],
        name: "",
        selectedRate: "",
        rateReally: "",
        message: ""
    }
    getConfiguration = async () => {
        const res = await axios.get('http://localhost:4000/api/configuration')
        this.setState({
            terminals: res.data.terminals,
            rates: res.data.rates,
            name: res.data.setting.name,
            rateReally: res.data.setting.rate,
            selectedRate: res.data.setting.rate
        });
    }
    addTerminal = async()=>{
        await axios.post('http://localhost:4000/api/configuration');
        this.getConfiguration();
    }
    deleteTerminal = async()=>{
        await axios.delete('http://localhost:4000/api/configuration');
        this.getConfiguration();
    }
    componentDidMount(){
        this.getConfiguration()
    }
    updateSetting=async()=>{
        const resp = await axios.put('http://localhost:4000/api/configuration',{
            name: this.state.name,
            rate: this.state.selectedRate
        })
        this.getConfiguration();
        if(resp.status===200){
            this.setState({
                message: "Se guardo correctamente."
            })
            this.Alert.active();
        }
    }
    nameChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
          });
    }
    onChangeRate = e => {
        this.setState({
            selectedRate: e.target.value
        })
    }
    render() {
        return (
            <div className="m-2">
            <Alert color="success" ref={element => {this.Alert = element}} message={this.state.message}/>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="card col-4">
                            <h1 className="text-center">Configuración</h1>
                            <div className="form-group">
                                <label>Nombre del Ciber</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Introduzca un nombre"
                                    value={this.state.name}
                                    onChange={this.nameChange}
                                    required
                                />
                                </div>
                                <div className="form-group">
                                <label> Elegir tarifa a utilizar</label>
                            <select value={this.state.selectedRate} className="browser-default custom-select" onChange={this.onChangeRate}>
                                {
                                    this.state.rates.map(rate => (
                                        <option value={rate._id} key={rate._id} >{rate.name}</option>
                                    ))
                                }
                            </select>
                            </div>
                            <div className="form-group"><button onClick={this.updateSetting}  className="btn btn-secondary">Guardar</button></div>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="card col-4">
                            <h1 className="text-center">Terminales:</h1>
                                <label>Numero de terminales</label>
                                <div className="form-group">
                            <button onClick={this.deleteTerminal}  className="btn btn-secondary"><i className="fas fa-arrow-alt-circle-down"></i></button><strong>Cantidad: {this.state.terminals.length}</strong><button onClick={this.addTerminal}  className="btn btn-secondary"><i className="fas fa-arrow-alt-circle-up"></i></button></div>
                        
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
