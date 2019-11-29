import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password: "",
            password_confirmation: "",
            phone: "",
            registrationErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        const { email, name, password, password_confirmation, phone } = this.state;
        if(password===password_confirmation){
            axios
            .post(
                "http://"+global.ip+":4000/api/auth",
                
                {
                        name,
                        email: email,
                        password: password,
                        password_confirmation: password_confirmation,
                        phone
                },

            )
            .then(response => {
                if (response.data.status === "created") {
                    //this.props.handleSuccessfulAuth(response.data);
                    this.props.history.push('/signin') 
                    console.log(response.data.status)
                    //this.props.history.push("http://localhost:3000/");
                }
            })
            .catch(error => {
                window.alert("El nombre o el correo electrónico ya está en uso.");
                console.log("registration error", error);
            });
        
        }
        else{
            window.alert("Repita la contraseña.")
        }
        event.preventDefault();
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="card col-4">
                <form onSubmit={this.handleSubmit}className="mb-4">
                <h1 className="text-center">Registro</h1>
                    <div className="form-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Introduzca su nombre completo"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password_confirmation"
                        placeholder="Password confirmation"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Celular</label>
                    <input
                        type="number"
                        className="form-control"
                        name="phone"
                        placeholder="Introduzca su número de celular"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        required
                    />
                    </div>

                    <button type="submit" className="btn btn-info">Registrar</button>
                </form>
            </div>
            </div>
            </div>
        );
    }
}