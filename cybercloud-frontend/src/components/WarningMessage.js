import React, { Component } from 'react'
import {Alert} from 'reactstrap'

export default class WarningMessage extends Component {
    state={
        visible: false,
        message: ""
    };
    toggle(){
        this.setState({
            visible:false
        })
    }
    active(){
        this.setState({
            visible:true
        })
    }
    render() {
        return (
            <div>
                <Alert color={this.props.color} isOpen={this.state.visible} toggle={this.toggle.bind(this)} >
                    {this.props.message}
                </Alert>
            </div>
        )
    }
}