import React, { Component } from 'react'
//import logo from './image2vector.svg';
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
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
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Terminales</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/items" className="nav-link">Artículos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/adminitem" className="nav-link">Administrar Artículos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
