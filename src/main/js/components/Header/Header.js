import React, { Component } from 'react';
import "./Header.scss";

export default class Header extends Component {

    render() {
        return (
            <div id="header-container">
                <h1 id="header">{this.props.page}</h1>

                {this.props.page === "Current" ?
                    <img id="graph-icon" src="/img/bar-graph.png" alt="graphs" onClick={() => this.props.changePage("HISTORY")}/>
                    :
                    <img id="back-icon" src="/img/chevron-left-icon.png" alt="back" onClick={() => this.props.changePage("CURRENT")}/>
                }

            </div>
        )
    }
}
