import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { lineChartData, lineChartDataSingle } from '../../constants';

import './DayHistory.scss';

export default class DayHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            temperatureData: JSON.parse(JSON.stringify(lineChartData)),
            humidityData: JSON.parse(JSON.stringify(lineChartData)),
            pressureData: lineChartDataSingle
        }
    }

    componentWillMount(){
        console.log("const");
        console.log(this.state.temperatureData);
        //console.log(this.state.date.format("YYYY-MM-DD"));
        this.loadData(this.state.date.format("YYYY-MM-DD"));
        //this.loadData("2017-01-01");
    }

    componentDidMount(){
        const node = this.temperatureHeader;
        console.log(this.temperatureHeader);
        node.scrollIntoView();
    }

    componentWillUnmount(){
        console.log("unmount"); //Test
    }

    clearData(){
        this.state.temperatureData.labels = [];
        this.state.temperatureData.datasets.data = new Array(24);
        this.state.humidityData.labels = [];
        this.state.humidityData.datasets.data = new Array(24);
        this.state.pressureData.labels = [];
        this.state.pressureData.datasets.data = new Array(24);
    }

    loadData(day){
        //this.clearData();

        let tempTemperatureData = this.state.temperatureData;
        let tempHumidityData = this.state.humidityData
        let tempPressureData = JSON.parse(JSON.stringify(this.state.pressureData));

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getTest(day).then((response) => {
            //console.log(response);
            response = response._embedded.weathers; //DEVMODE (remove later)
            //console.log(response);

            response.map((weather) => {
                let index = weather.time.substring(0,2);

                tempTemperatureData.datasets[0].data.splice(index, 1, weather.insideTemperature);
                tempTemperatureData.datasets[1].data.splice(index, 1, weather.outsideTemperature);

                tempHumidityData.datasets[0].data.splice(index, 1, weather.insideHumidity);
                tempHumidityData.datasets[1].data.splice(index, 1, weather.outsideHumidity);

                tempPressureData.datasets[0].data.splice(index, 1, weather.outsidePressure);
            });

            this.setState({temperatureData: tempTemperatureData, humidityData: tempHumidityData, pressureData: tempPressureData});

        }, (error) => {
            console.error(error);
        });
    }

    getLabels(){
        let dateLabels = [];
        let date = moment().startOf('day');
        for (let i = 0; i < 24; i++){
            dateLabels.push(date.format("HH:mm"));
            date.add(1, 'hour');
        }
        return dateLabels;
    }

    setPreviousDay(){
        this.setState({day: this.state.date.subtract(1, 'day')});
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    setNextDay(){
        this.setState({day: this.state.date.add(1, 'day')});
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    isCurrentDate(){
        let today = moment();
        return today.format("YYYY-MM-DD") === this.state.date.format("YYYY-MM-DD");
    }

    render(){
        const temperatureData = (canvas) => {
            console.log(canvas);
            let minIndoorTemperature = Math.min.apply(null, this.state.temperatureData.datasets[0].data);
            let maxIndoorTemperature = Math.max.apply(null, this.state.temperatureData.datasets[0].data);

            console.log(this.temperatureChart);

            let indoorGradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, 120);
            let outdoorGradient = canvas.getContext("2d").createLinearGradient(0, 50, 0, 220);
            indoorGradient.addColorStop(0, 'rgba(122, 189, 192, 1)');
            indoorGradient.addColorStop(1, 'rgba(122, 189, 192, 0)');
            outdoorGradient.addColorStop(0, 'rgba(96, 135, 179, 1)');
            outdoorGradient.addColorStop(1, 'rgba(96, 135, 179, 0)');

            this.state.temperatureData.datasets[0].backgroundColor = indoorGradient;
            this.state.temperatureData.datasets[1].backgroundColor = outdoorGradient;
          return (this.state.temperatureData)
        };

        const humidityData = (canvas) => {
            console.log(canvas);
            let indoorGradient = canvas.getContext("2d").createLinearGradient(0, 150, 0, 220);
            let outdoorGradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, 110);
            indoorGradient.addColorStop(0, 'rgba(122, 189, 192, 1)');
            indoorGradient.addColorStop(1, 'rgba(122, 189, 192, 0)');
            outdoorGradient.addColorStop(0, 'rgba(96, 135, 179, 1)');
            outdoorGradient.addColorStop(1, 'rgba(96, 135, 179, 0)');

            this.state.humidityData.datasets[0].backgroundColor = indoorGradient;
            this.state.humidityData.datasets[1].backgroundColor = outdoorGradient;
            return (this.state.humidityData)
        };

        const pressureData = (canvas) => {
            console.log(canvas);
            return (this.state.pressureData)
        };

        return (
            <div className="history-graph-container">
                <div className="history-header">
                    <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPreviousDay()}/>
                    <p>{this.state.date.format("YYYY-MM-DD")}</p>
                    {this.isCurrentDate() ? <span /> : <img className="history-arrow" src="/img/chevron-right-icon.png" alt="nextDayArrow" onClick={() => this.setNextDay()}/>}
                </div>
                <p className="graph-header" ref={(el) => { this.temperatureHeader = el; }}>Temperature</p>
                <Graph lineChartData={temperatureData} ref={(el) => { this.temperatureChart = el; }}/>
                <p className="graph-header">Humidity</p>
                <Graph lineChartData={humidityData}/>
                <p className="graph-header">Pressure</p>
                <Graph lineChartData={this.state.pressureData}/>
            </div>
        )
    }
}
