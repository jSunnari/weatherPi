import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { lineChartData, lineChartDataSingle } from '../../constants';

export default class DayHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            //temperatureData: lineChartData,
            //humidityData: lineChartData,
            //pressureData: lineChartDataSingle
        }
    }

    componentWillMount(){
        console.log("const");
        console.log(this.state.temperatureData);
        //console.log(this.state.date.format("YYYY-MM-DD"));
        this.loadData(this.state.date.format("YYYY-MM-DD"));
        //this.loadData("2017-01-01");
    }

    componentWillUnmount(){
        console.log("unmount"); //Test
    }

    loadData(day){
        let tempTemperatureData = JSON.parse(JSON.stringify(lineChartData));
        let tempHumidityData = JSON.parse(JSON.stringify(lineChartData));
        let tempPressureData = JSON.parse(JSON.stringify(lineChartDataSingle));

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
        console.log("const");
        console.log(this.state.temperatureData);
        return (
            <div className="history-graph-container">
                <div className="history-header">
                    <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPreviousDay()}/>
                    <p>{this.state.date.format("YYYY-MM-DD")}</p>
                    {this.isCurrentDate() ? <span /> : <img className="history-arrow" src="/img/chevron-right-icon.png" alt="nextDayArrow" onClick={() => this.setNextDay()}/>}
                </div>
                <p className="graph-header">Temperature</p>
                <Graph lineChartData={this.state.temperatureData}/>
                <p className="graph-header">Humidity</p>
                <Graph lineChartData={this.state.humidityData}/>
                <p className="graph-header">Pressure</p>
                <Graph lineChartData={this.state.pressureData}/>
            </div>
        )
    }
}
