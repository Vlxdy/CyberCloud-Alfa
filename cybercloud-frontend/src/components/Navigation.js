import React, { Component } from 'react'
//import logo from './image2vector.svg';
import { Link } from 'react-router-dom'
import Axios from 'axios';

export default class Navigation extends Component {
    state={
        notifications:0
    };
    
    componentDidMount(){
        this.getNotifications();
        this.timer = setInterval(() => {
            this.getNotifications();
          }, 3000);
    };
    componentWillUnmount() {
        clearInterval(this.timer);
      }
    getNotifications = async()=>{
        const petitions = await Axios('http://localhost:4000/api/petition/');
        this.setState({
            notifications: petitions.data.length
        })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <h3>CyberCloud</h3>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
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
                                    <Link onClick={this.props.handleLogout} to="/" className="dropdown-item bg-secondary text-white">Cerrar Sesión</Link>
                                  </div>
                                </li>
                              </ul>
                              
                            )}
                    </div>
                    <div className="p-4">
                        {this.props.logged==="LOGGED_IN" && (
                    <Link to="/buy">
                    <i className="fas fa-shopping-cart icon-white fa-lg" title="Comprar Artículos"></i>
                    </Link>
                    )}
                    </div>
                </div>
            </nav>
            
        )
    }
}