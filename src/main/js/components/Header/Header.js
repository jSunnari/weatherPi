import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        return (
            <div id="header-container">
                <h1 id="header">{this.props.header}</h1>
                <img id="graph-icon" src="/img/bar-graph.png" alt="graphs"/>
            </div>
        )
    }
}
