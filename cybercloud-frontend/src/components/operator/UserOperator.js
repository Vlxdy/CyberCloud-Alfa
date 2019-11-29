import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class UserOperator extends Component {
    state = {
        auths: []
    }
    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const req = await axios.get('http://' + global.ip + ':4000/api/auth/')
        this.setState({
            auths: req.data
        })
        //console.log(this.state.auths);
    }
    postOperator = async (id) => {
        await axios.post('http://' + global.ip + ':4000/api/operator/' + id);
        this.getUsers();
        //console.log(this.state.auths);
    }
    render() {
        return (
            this.props.user.poperator ?
                <div className="container">
                    <div className="row">
                        <Link to="/operator" className="card col-4">
                            <button className="btn">
                                Administrar Operadores
                    </button>
                        </Link>

                    </div>
                    <div className="row m-2">
                        <div className="col-md-12">
                            <div className="container">
                                <div className="list-group">
                                    {
                                        this.state.auths.map(user => (
                                            <button type="button" className={"btn m-1" + (
                                                user._id === this.state.select ? " active" : "") +
                                                (user.operator ? " btn-info" : " btn-light")
                                            }
                                                key={user._id}
                                                onDoubleClick={() => this.postOperator(user._id)}
                                            >
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            {user.name.substring(0, 15)}
                                                        </div>
                                                        <div className="col-sm">
                                                            {user.email}
                                                        </div>
                                                        <div className="col-sm">
                                                            {user.phone}
                                                        </div>
                                                        <div className="col-sm">
                                                            {user.money} Bs
                                                </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
        )
    }
}
