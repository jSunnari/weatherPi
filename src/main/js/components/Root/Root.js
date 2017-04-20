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

                <Header page={this.state.page} changePage={this.changePage.bind(this)} />

                <MediaQuery query='(min-device-width: 1224px)'>
                    {/* Desktop */}

                    <div className="root-container">
                        <History/>
                        <Values/>
                    </div>

                </MediaQuery>


                <MediaQuery query='(max-device-width: 1224px)'>
                    {/* Tablet */}

                    { this.state.page === "History" ? <History/> : <Values /> }

                    <MediaQuery query='(orientation: landscape)'>

                        <div className="root-container">
                            <History/>
                            <Values/>
                        </div>

                    </MediaQuery>

                </MediaQuery>


                <MediaQuery query='(max-device-width: 736px)'>
                    {/* Mobile */}

                    { this.state.page === "History" ? <History/> : <Values /> }

                </MediaQuery>

            </div>
        )
    }
}
