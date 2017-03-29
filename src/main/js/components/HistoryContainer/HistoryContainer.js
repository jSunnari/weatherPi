import React, { Component } from 'react';
import DayHistory from '../DayHistory/DayHistory';
import WeekHistory from '../WeekHistory/WeekHistory';

import "./HistoryContainer.scss";

let tabList = [
    {id: 0, title: "Day", active: true},
    {id: 1, title: "Week", active: false},
    {id: 2, title: "Month", active: false},
    {id: 3, title: "Year", active: false}
];

export default class History extends Component {

    constructor(props){
        super(props);
        this.state = {
            tabList: tabList,
            activePage: 0
        }
    }

    changeTab(tab){
        tabList.map((tempTab) => {
           tempTab.active = tempTab.id === tab.id;
        });

        this.setState({tabList: tabList, activePage: tab.id});
    }

    renderTabs(){
        return this.state.tabList.map((tab) => {
            let className = tab.active ? "active-tab" : null;
            return (
                <p className={className} id={tab.title.toLowerCase() + "-tab"} key={tab.id} onClick={() => this.changeTab(tab)}>{tab.title}</p>
            )
        })
    }

    render() {
        let activePage;

        switch (this.state.activePage){
            case 0:
                activePage = <DayHistory/>;
                break;
            case 1:
                activePage = <WeekHistory/>;
                break;
            default:
                activePage = <DayHistory/>;
        }

        return (
            <div id="history-container">
                <div id="history-navbar">
                    {this.renderTabs()}
                </div>

                {activePage}

            </div>
        )
    }
}
