import React, { Component } from "react";
import axios from "axios";

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit (event){
      console.log("entró")
    const { email, password } = this.state;
    axios.post(
        'http://localhost:4000/api/signin',
        {
            email: email,
            password: password
        }
      ).then(response => {
        
          this.props.handleLogin(response.data);
          this.props.history.push('/') 
        
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }
  render() {
    return (
        <div className="container">
        <div className="row justify-content-center align-items-center">
            <div className="card col-4">
            <h1 className="text-center">Iniciar Sesión</h1>
        <form onSubmit={this.handleSubmit} className="mb-4">
            <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Introduzca su correo"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
            </div>
          <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Introduzca su contraseña"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          </div>
          <button type="submit" className="btn btn-secondary">Iniciar Sesión</button>
        </form>
      </div>
      </div>
      </div>
    );
  }
}
