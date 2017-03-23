import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2'; //https://github.com/gor181/react-chartjs-2
import { lineChartOptions } from '../../constants';
import './Graph.scss';

export default class Graph extends Component {

    constructor(props){
        super(props);
        defaults.global.defaultFontColor = "rgba(255,255,255, 1)";
        defaults.global.elements.line.fill = "top";
    }

    componentWillMount(){
        console.log(defaults.global);
    }

    render() {
        return (
            <div className="graph-container">
                <Line
                    data={this.props.lineChartData}
                    height={250}
                    options={lineChartOptions}
                />
            </div>
        )
    }
}
