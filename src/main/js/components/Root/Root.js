import React, { Component } from 'react';
import MediaQuery from 'react-responsive'; //https://github.com/contra/react-responsive
import Header from '../Header/Header';
import Values from '../Values/Values';
import History from '../History/History';

export default class Root extends Component {

    constructor(props){
        super(props);
        this.state = ({
           page: "Current"
        });
    }

    changePage(page){
        switch (page){
            case "CURRENT":
                this.setState({page: "Current"});
                break;
            case "HISTORY":
                this.setState({page: "History"});
                break;
            default:
                this.setState({page: "Current"});
        }
    }

    render() {
        return (
            <div id="app-root">

                <Header page={this.state.page} changePage={this.changePage.bind(this)} />
                { this.state.page === "History" ? <History/> : <Values /> }

            </div>
        )
    }
}
