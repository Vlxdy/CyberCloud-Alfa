import React, { Component } from 'react'
import axios from 'axios'
export default class RegistryOperator extends Component {
    state = {
        operators: [],
        boxs: [],
        select: 0,
        registry: {},
        articles: [],
        recharges: []
    }
    componentDidMount() {
        this.getBox();
        this.timer = setTimeout(() => {
            this.getRegistry()
        }, 1000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    getBox = async () => {
        const res = await axios.get('http://' + global.ip + ':4000/api/box');
        res.data.reverse()
        this.setState({
            boxs: res.data,
            select: res.data.length
        });
    }
    onChangeBox = e => {
        this.setState({
            select: e.target.value
        })
        setTimeout(() => {
            this.getRegistry()
        }, 1000)
        // console.log(this.state)
        //console.log(this.props.user.box)
    }
    getRegistry = async () => {
        const res = await axios.patch('http://' + global.ip + ':4000/api/registry/' + this.state.select);
        this.setState({
            operators: res.data
        })
        console.log(res.data)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="form-group">
                            <strong>Nro de Caja:</strong>
                            <select value={this.state.select} className="browser-default custom-select" onChange={this.onChangeBox}>
                                {
                                    this.state.boxs.map(box => (
                                        <option value={box.number} key={box._id}>{box.number}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    {
                        this.state.operators.map(operator => (
                            <div className="col" key={operator.user._id}>
                                <div className="card m-1">
                                    <div className="card-header bg-dark text-center text-white">
                                        {operator.user.name}
                                    </div>
                                    <div className="card-body bg-secondary">
                                        <div className="card m-1">
                                            <div className="card-header">
                                                Resumen de Operador
                                        </div>
                                            <div className="card-body">
                                                <table className="table table-hover table-primary">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Detalle</th>
                                                            <th scope="col">Monto Recaudado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">1</th>
                                                            <td>Artículos Vendidos</td>
                                                            <td>{operator.itemPrice} Bs</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">2</th>
                                                            <td>Uso de Terminales</td>
                                                            <td>{operator.terminalPrice} Bs</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">3</th>
                                                            <td>Recargas a usuarios:</td>
                                                            <td>{operator.userRecharge} Bs</td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th scope="row">#</th>
                                                            <th>Total:</th>
                                                            <th>{operator.itemPrice + operator.terminalPrice + operator.userRecharge} Bs</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header">
                                                Resumen Artículos
                                        </div>
                                            <div className="card-body">
                                                <table className="table table-hover table-info">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Descripción</th>
                                                            <th scope="col">Precio/unidad</th>
                                                            <th scope="col">Cantidad</th>
                                                            <th scope="col">Total en Bs</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            operator.articles.map(article => (
                                                                <tr key={article.id_item}>
                                                                    <th scope="row" className="text-center">-</th>
                                                                    <td className="text">{article.description.toUpperCase()}</td>
                                                                    <td className="text-center">{article.price} Bs</td>
                                                                    <td className="text-center">{article.itemAmount}</td>
                                                                    <td className="text-center">{article.itemAmount * article.price} Bs</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th scope="col" className="text-center">#</th>
                                                            <th scope="col" className="text">Total</th>
                                                            <th scope="col" className="text-center">#</th>
                                                            <th scope="col" className="text-center">#</th>
                                                            <th scope="col" className="text-center">{operator.itemPrice} Bs</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-dark">
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
