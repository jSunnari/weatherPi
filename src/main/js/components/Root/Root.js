import React, { Component } from 'react';
import MediaQuery from 'react-responsive'; //https://github.com/contra/react-responsive
import Header from '../Header/Header';
import Values from '../Values/Values';
import History from '../HistoryContainer/HistoryContainer';
import "./Root.scss";

export default class Root extends Component {

    constructor(props){
        super(props);
        this.state = ({
            //DEVMODE

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


                <MediaQuery minDeviceWidth={1224}>
                    {/* Desktop */}

                    <div className="root-container">
                        <History/>
                        <Values/>
                    </div>

                </MediaQuery>


                <MediaQuery minDeviceWidth={737} maxDeviceWidth={1224} orientation='portrait'>
                    {/* Tablet */}
                    <Header page={this.state.page} changePage={this.changePage.bind(this)} />
                    { this.state.page === "History" ? <History/> : <Values /> }
                </MediaQuery>


                <MediaQuery minDeviceWidth={737} maxDeviceWidth={1224} orientation='landscape'>
                    {/* Tablet landscape */}
                    <div className="root-container">
                        <History/>
                        <Values/>
                    </div>
                </MediaQuery>

                <MediaQuery maxDeviceWidth={736}>
                    {/* Mobile */}
                    <Header page={this.state.page} changePage={this.changePage.bind(this)} />

                    { this.state.page === "History" ? <History/> : <Values /> }

                </MediaQuery>

            </div>
        )
    }
}
