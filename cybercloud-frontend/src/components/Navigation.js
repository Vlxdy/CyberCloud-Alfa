import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';

export default class Navigation extends Component {
    state={
        notifications:0,
        box:{}
    };
    componentDidMount(){
        this.timer = setInterval(() => {
            this.getNotifications();
            if(this.props.user.permissions>0)
                this.getBox()
          }, 1000);
    };
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    closeBox=async()=>{
        if(this.props.user.permissions>0)
        {
            const response = window.confirm("Esta seguro que desea cerrar la caja: "+this.state.box.number);
            if(response)
            await Axios.post('http://localhost:4000/api/box/');
        }
    }
    getBox= async()=>{
        const box = await Axios.delete('http://localhost:4000/api/box/');
        this.setState({
            box: box.data
        })
    }
    getNotifications = async()=>{
        const petitions = await Axios.get('http://localhost:4000/api/petition/');
        this.setState({
            notifications: petitions.data.length
        })
    }
    render() {
        return (
            <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">

                <div className="container">       
                        {this.props.user.permissions>0 && (
                            <div className="card col-4">
                            Numero de Caja: {this.state.box.number} <br />
                            Monto Recaudado: {(this.state.box.itemPrice+this.state.box.terminalPrice).toFixed(2)} Bs
                            </div>
                        )}
                        <div className="col-2 row align-items-center">
                            <div>
                            <Link className="navbar-brand" to="/">
                            <h3>CyberCloud</h3>
                            </Link>
                            </div>
                        </div>
                    <div className="col-6">
                    <div className="collapse navbar-collapse" id="navbarNav">
                            { this.props.logged==="NOT_LOGGED_IN" && (
                                <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Registrarse</Link>
                            </li>
                            </ul>
                            )}
                            { this.props.logged==="LOGGED_IN" && (
                                <ul className="nav nav-tabs ml-auto">
                                <li className="nav-item dropdown bg-secondary">
                                  <a className="nav-link dropdown-toggle text-white bg-secondary" data-toggle="dropdown" href="\" role="button" aria-haspopup="true" aria-expanded="false">{this.props.user.name.toUpperCase()+"    " }<strong className="text-white">SALDO: {this.props.user.money.toFixed(2)} Bs.</strong></a>
                                  <div className="dropdown-menu bg-secondary">
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/adminitem" className="dropdown-item bg-secondary text-white">Administrar Items</Link>
                                          )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/petitions" className="dropdown-item bg-secondary text-white">Pedidos: {this.state.notifications}</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/setting" className="dropdown-item bg-secondary text-white">Configuraciones</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/users" className="dropdown-item bg-secondary text-white">Usuarios</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/itemterminal" className="dropdown-item bg-secondary text-white">Vender Productor a las Terminales</Link>
                                            )
                                      }
                                    <Link to="/" onClick={this.closeBox} className="dropdown-item bg-secondary text-white">Cerrar la caja</Link>
                                    <Link to="/history" className="dropdown-item bg-secondary text-white">Historial</Link>
                                    <Link onClick={this.props.handleLogout} to="/" className="dropdown-item bg-secondary text-white">Cerrar Sesión</Link>
                                    
                                  </div>
                                </li>
                              </ul>
                              
                            )}
                            <div className="p-4">
                        {this.props.logged==="LOGGED_IN" && (
                    <Link to="/buy">
                    <i className="fas fa-shopping-cart icon-white fa-lg" title="Comprar Artículos"></i>
                    <span className="badge badge-danger badge-pill">{this.state.notifications}</span>
                    </Link>
                    )}
                    </div>
                    </div>
                    </div>
                    
                    
                </div>
            </nav>
            </div>
        )
    }
}