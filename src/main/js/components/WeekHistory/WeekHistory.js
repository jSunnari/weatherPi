import React, { Component } from 'react';
import Moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { lineChartData, lineChartDataSingle } from '../../constants';

export default class WeekHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            week: Moment(new Date()).week(),
            temperatureData: lineChartData,
            humidityData: lineChartData,
            pressureData: lineChartDataSingle
        }
    }

    componentWillMount(){
        //this.loadData(this.state.date);
        console.log(this.state.week);
    }

    loadData(date){
        let tempTemperatureData = this.state.temperatureData;
        let tempHumidityData = this.state.humidityData;
        let tempPressureData = this.state.pressureData;

        let dateLabels = WeekHistory.getLabels();
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
        return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    }

    setPreviousWeek(){
        let previousDate = this.state.date.setDate(this.state.date.getDay() - 1);
        this.setState({date: previousDate})
    }

    setNextWeek(){
        let previousDate = this.state.date.setDate(this.state.date.getDay() + 1);
        this.setState({date: previousDate})
    }

    isCurrentDate(date){
        let today = new Date();
        return today.getDay() === date.getDay();
    }

    render(){

        return (
            <div id="graph-container">
                <div>
                    <img src="" alt="previousDayArrow" onClick={() => this.setPreviousDay()}/>
                    <p>{Moment(this.state.date).format("YYYY-MM-DD")}</p>
                    {this.isCurrentDate() ? <img src="" alt="nextDayArrow" onClick={() => this.setNextDay()}/>: null}
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
