import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import Configuration from './Configuration'
import Rates from '../rates/Rates'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
export default class Settings extends Component {
    state = {
        activeTab: '1'
    }
    toggle = (tab)=>{
        this.setState({
            activeTab:tab
        })
    }
    active=(tab)=>{
        if(tab === this.state.activeTab)
        return "active"
        else
        return ""
    }
    render() {
        return (

            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab==='1' ? "active": "" }
                            onClick={() =>  this.toggle('1')}
                        >
                            General
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab==='2' ? "active": "" }
                            onClick={() =>  this.toggle('2')}
                        >
                            Tarífa
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Configuration/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Rates />
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}