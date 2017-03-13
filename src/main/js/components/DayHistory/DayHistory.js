import React, { Component } from 'react';
import Moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { lineChartData, lineChartDataSingle } from '../../constants';

export default class DayHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: Moment(new Date()).format("YYYY-MM-DD"),
            temperatureData: lineChartdata,
            humidityData: lineChartData,
            pressureData: lineChartDataSingle
        }
    }

    componentWillMount(){
        console.log("const");
        console.log(lineChartData);
        console.log(this.state.date);
        setTimeout(() => this.loadData("2017-01-01"), 2000);
        //this.loadData("2017-01-01");
    }

    componentWillUnmount(){
        console.log("unmount");
    }

    loadData(date){
        let tempTemperatureData = this.state.temperatureData;
        let tempHumidityData = this.state.humidityData;
        let tempPressureData = this.state.pressureData;

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getTest(date).then((response) => {
            console.log(response);
            response = response._embedded.weathers; //DEVMODE (remove later)
            console.log(response);

            response.map((weather) => {
                let index = weather.time.substring(0,2);

                tempTemperatureData.datasets[0].data.splice(index, 0, weather.insideTemperature);
                tempTemperatureData.datasets[1].data.splice(index, 0, weather.outsideTemperature);

                tempHumidityData.datasets[0].data.splice(index, 0, weather.insideHumidity);
                tempHumidityData.datasets[1].data.splice(index, 0, weather.outsideHumidity);

                tempPressureData.datasets[0].data.splice(index, 0, weather.outsidePressure);
            });

            this.setState({temperatureData: tempTemperatureData, humidityData: tempHumidityData, pressureData: tempPressureData});

        }, (error) => {
            console.error(error);
        });
    }

    getLabels(){
        let dateLabels = [];
        let date = new Date();
        date.setHours(0,0,0,0);
        for (let i = 0; i < 24; i++){
            dateLabels.push(Moment(date).format("HH:mm"));
            date.setHours(date.getHours() + 1);
        }
        return dateLabels;
    }

    render(){

        return (
            <div id="graph-container">
                <div>
                    <p>{this.state.date}</p>
                </div>
                <p>Temperature</p>
                <Graph lineChartData={this.state.temperatureData}/>
                <p>Humidity</p>
                <Graph lineChartData={this.state.humidityData}/>
                <p>Pressure</p>
                <Graph lineChartData={this.state.pressureData}/>
            </div>
        )
    }
}
