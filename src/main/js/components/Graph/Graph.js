import React, {Component} from "react";
import { Chart, Line, defaults } from "react-chartjs-2"; // https://github.com/gor181/react-chartjs-2
import "./Graph.scss";

export default class Graph extends Component {

    constructor(props){
        super(props);
        defaults.global.defaultFontColor = "rgba(255,255,255, 1)";
        defaults.global.elements.line.fill = "top";
        defaults.global.tooltips.titleFontSize = 15;
        defaults.global.tooltips.bodyFontSize = 15;
        defaults.global.tooltips.titleMarginBottom = 10;
    }

    getMaxPositionY(datasetIndex){
        let datasetArray = this.lineChartObject.chart_instance.getDatasetMeta(datasetIndex).controller._data;
        let minValue = Math.min.apply(null, datasetArray);
        console.log(minValue);
        let index = datasetArray.indexOf(minValue);
        console.log(index);
        return this.lineChartObject.chart_instance.getDatasetMeta(datasetIndex).data[index]._model.y;
    }

    getMinPositionY(datasetIndex){
        let datasetArray = this.lineChartObject.chart_instance.getDatasetMeta(datasetIndex).controller._data;
        let maxValue = Math.max.apply(null, datasetArray);
        console.log(maxValue);
        let index = datasetArray.indexOf(maxValue);
        console.log(index);
        return this.lineChartObject.chart_instance.getDatasetMeta(datasetIndex).data[index]._model.y;
    }

    render() {
        return (
            <div className="graph-container">
                <Line
                    data={this.props.lineChartData}
                    height={250}
                    options={this.props.lineChartOptions}
                />
            </div>
        )
    }
}
