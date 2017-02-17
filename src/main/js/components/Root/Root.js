import React, { Component } from 'react';
import Header from '../Header/Header';
import Values from '../Values/Values';

export default class Root extends Component {

    constructor(props){
        super(props);
        this.state = ({
           header: "Current"
        });
    }


    render() {
        return (
            <div id="root">
                <Header header={this.state.header} />

                <Values />


            </div>
        )
    }
}
