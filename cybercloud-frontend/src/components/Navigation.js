import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
export default class Navigation extends Component {
    closeBox=async()=>{
        if(this.props.user.permissions>0)
        {
            const response = window.confirm("Esta seguro que desea cerrar la caja: "+this.props.box.number);
            if(response)
            await Axios.post('http://'+global.ip+':4000/api/box/');
        }
    }
    render() {
        return (
            <div className="pos-f-t" >
            <nav id="narvar" className="navbar navbar-expand-lg navbar-dark p-3">

                <div className="container">       
                        {this.props.user.permissions>0 && (
                            <Link to="/registry" className="card col-4">
                            <div >
                            Numero de Caja: {this.props.box.number} <br />
                            Monto Recaudado: {(this.props.box.itemPrice+this.props.box.terminalPrice+this.props.box.userRecharge).toFixed(2)} Bs
                            </div>
                            </Link>
                        )}
                        <div className="col-2 row align-items-center">
                            <div>
                            <Link className="navbar-brand" to="/">
                            <img src="../../logo.png" height="70%" width="70%" alt="error"/>
                            </Link>
                            </div>
                        </div>
                    <div className="col-6">
                    <div className="collapse navbar-collapse" id="navbarNav">
                            { this.props.logged==="NOT_LOGGED_IN" && (
                                <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">
                                <span className="badge badge-info">Iniciar Sesión</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                                <span className="badge badge-info">Registrarse</span>
                                </Link>
                            </li>
                            </ul>
                            )}
                            { this.props.logged==="LOGGED_IN" && (
                                <ul className="nav nav-tabs ml-auto">
                                <li className="nav-item dropdown bg-info">
                                  <a className="nav-link dropdown-toggle text-white bg-info" data-toggle="dropdown" href="\" role="button" aria-haspopup="true" aria-expanded="false">{this.props.user.name.toUpperCase()+"    " }<strong className="text-white">CREDITO: {this.props.user.money.toFixed(2)} Bs.</strong></a>
                                  <div className="dropdown-menu bg-info">
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/adminitem" className="dropdown-item bg-info text-white">Administrar Items</Link>
                                          )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/petitions" className="dropdown-item bg-info text-white">Pedidos: {this.props.petitionsUsers.length}</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/setting" className="dropdown-item bg-info text-white">Configuraciones</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/users" className="dropdown-item bg-info text-white">Usuarios</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/itemterminal" className="dropdown-item bg-info text-white">Vender Productos</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/" onClick={this.closeBox} className="dropdown-item bg-info text-white">Cerrar la caja</Link>
                                            )
                                      }
                                      {
                                          this.props.user.permissions>0 && (
                                            <Link to="/registry" className="dropdown-item bg-info text-white">Registros</Link>
                                            )
                                      }
                                    
                                    <Link to="/petitionsuser" className="dropdown-item bg-info text-white">Mis Peticiones: {this.props.petitions.length}</Link>
                                    <Link to="/history" className="dropdown-item bg-info text-white">Historial</Link>
                                    <Link onClick={this.props.handleLogout} to="/" className="dropdown-item bg-info text-white">Cerrar Sesión</Link>
                                    
                                  </div>
                                </li>
                              </ul>
                              
                            )}
                    <div className="p-4">
                    {this.props.logged==="LOGGED_IN" && (
                    <Link to="/petitionsuser">
                    <i className="fas fa-shopping-basket icon-white fa-lg" title="Comprar Artículos"></i>
                    <span className="badge badge-primary badge-pill">{this.props.petitions.length}</span>
                    </Link>
                    )}
                    </div>
                    <div className="p-1">
                    {this.props.logged==="LOGGED_IN" && this.props.user.permissions>0 && (
                    <Link to="/petitions">
                    <i className="fas fa-bell icon-white fa-lg" title="Notificación de Peticiones"></i>
                    <span className="badge badge-primary badge-pill">{this.props.petitionsUsers.length}</span>
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