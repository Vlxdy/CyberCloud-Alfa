import React, { Component } from 'react'
import axios from 'axios'
import dateFormat from 'dateformat-light';
export default class Registry extends Component {
    state = {
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
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    getBox = async () => {
        const res = await axios.get('http://'+global.ip+':4000/api/box');
        res.data.reverse()
        this.setState({
            boxs: res.data,
            select: res.data.length
        })
        
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
        const res = await axios.get('http://'+global.ip+':4000/api/registry/' + this.state.select);
        this.setState({
            registry: res.data,
            articles: res.data.articles,
            recharges: res.data.recharges
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
                    <table className="table table-hover table-primary">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Detalle</th>
                                <th scope="col">Monto de Usuarios anonimos</th>
                                <th scope="col">Monto de Usuarios Registrados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Artículos Vendidos</td>
                                <td>{this.state.registry.itemPrice} Bs</td>
                                <td>{this.state.registry.itemPriceUser} Bs</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Uso de Terminales</td>
                                <td>{this.state.registry.terminalPrice} Bs</td>
                                <td>{this.state.registry.terminalPriceUser} Bs</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Recargas a usuarios:</td>
                                <td>{this.state.registry.userRecharge} Bs</td>
                                <td></td>
                                
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th scope="row">#</th>
                                <th>Total:</th>
                                <th>Total en caja: {this.state.registry.itemPrice + this.state.registry.terminalPrice+this.state.registry.userRecharge} Bs</th>
                                <th>Total Gasto de Usuarios: {this.state.registry.itemPriceUser + this.state.registry.terminalPriceUser} Bs</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="row">
                    <div className="col">
                    <table className="table table-hover table-info">
                    <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio/unidad</th>
                            <th scope="col">Compra Anónima</th>
                            <th scope="col">Total Anónima en Bs</th>
                            <th scope="col">Compra por Cliente</th>
                            <th scope="col">Total Cliente en Bs</th>
                            </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.articles.map(article => (
                                    <tr key={article.id_item}>
                                        <th scope="row"  className="text-center">-</th>
                                        <td className="text">{article.description.toUpperCase()}</td>
                                        <td className="text-center">{article.price} Bs</td>
                                        <td className="text-center">{article.itemAmount}</td>
                                        <td className="text-center">{article.itemAmount*article.price} Bs</td>
                                        <td className="text-center">{article.itemAmountUser}</td>
                                        <td className="text-center">{article.itemAmountUser*article.price} Bs</td>
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
                            <th scope="col" className="text-center">{this.state.registry.itemPrice} Bs</th>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col" className="text-center">{this.state.registry.itemPriceUser} Bs</th>
                            </tr>
                    </tfoot>
                    </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <table className="table table-hover table-success">
                    <thead>
                            <tr>
                            <th className="text-center" scope="col">#</th>
                            <th className="text-center" scope="col">Usuario</th>
                            <th className="text-center" scope="col">Operador</th>
                            <th className="text-center" scope="col">Monto</th>
                            <th className="text-center" scope="col">Fecha</th>
                            </tr>
                    </thead>
                    <tbody>
                            {
                                this.state.recharges.map(recharge => (
                                    <tr key={recharge.recharge._id}>
                                        <th scope="row"  className="text-center">-</th>
                                        <td  className="text-center">{recharge.user.email}</td>
                                        <td className="text-center">{recharge.operator.email}</td>
                                        <td className="text-center">{recharge.recharge.amount} Bs</td>
                                        <td className="text-center">{dateFormat(recharge.recharge.createdAt, "m/d/yy HH:MM:ss")}</td>
                                    </tr>
                                    
                                ))
                            }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col"  className="text-center">Total</th>
                            <th scope="col" className="text-center">{this.state.registry.userRecharge}</th>
                            <th scope="col" className="text-center">#</th>
                            </tr>
                    </tfoot>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}
