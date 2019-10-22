import React, { Component } from 'react'

export default class ItemPetition extends Component {
    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                <ul className="list-group">
                                {
                                    this.props.items.map(item => (
                                        <li className="list-group-item list-group-item-action" key={item._id}>
                                            {item.description} <div><strong>Cantidad: {item.amount}</strong></div>
                                        </li>
                                    ))
                                }
                </ul>
            </div>
        )
    }
}
