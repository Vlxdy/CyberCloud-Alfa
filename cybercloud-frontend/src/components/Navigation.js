import React, { Component } from 'react'
//import logo from './image2vector.svg';
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    componentDidMount(){
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
                                  <a className="nav-link dropdown-toggle text-white bg-secondary" data-toggle="dropdown" href="\" role="button" aria-haspopup="true" aria-expanded="false">{this.props.user.name.toUpperCase() }</a>
                                  <div className="dropdown-menu bg-secondary">
                                    <Link to="/" className="dropdown-item bg-secondary">Cerrar Sesión</Link>
                                    <Link onClick={this.props.handleLogout} to="/" className="dropdown-item bg-secondary">salir</Link>
                                  </div>
                                </li>
                              </ul>
                            )}
                            
                    </div>
                </div>
            </nav>
        )
    }
}
