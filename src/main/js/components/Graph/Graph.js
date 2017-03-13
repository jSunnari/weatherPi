import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2'; //https://github.com/gor181/react-chartjs-2
import { lineChartDataSingle, lineChartOptions } from '../../constants';

export default class Graph extends Component {

    constructor(props){
        super(props);
        defaults.global.defaultFontColor = "rgba(255,255,255,.8)";
    }

    componentWillMount(){

    }

    render() {
        return (
            <div id="graph-container">
                <Line
                    data={this.props.lineChartData}
                    height={250}
                    options={lineChartOptions}
                />
            </div>
        )
    }
}
