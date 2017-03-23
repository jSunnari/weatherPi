import React, { Component } from 'react';
import { Chart, Line, defaults } from 'react-chartjs-2'; //https://github.com/gor181/react-chartjs-2
import { lineChartOptions } from '../../constants';
import './Graph.scss';

export default class Graph extends Component {

    constructor(props){
        super(props);
        defaults.global.defaultFontColor = "rgba(255,255,255, 1)";
        defaults.global.elements.line.fill = "top";
    }


    componentDidMount(){
        console.log(this.temperatureChart.chart_instance.getDatasetMeta(0));
    }


    render() {

        return (
            <div className="graph-container">
                <Line
                    type="NegativeTransparentLine"
                    data={this.props.lineChartData}
                    height={250}
                    options={lineChartOptions}
                    ref={(el) => { this.temperatureChart = el; }}
                />
            </div>
        )
    }
}
