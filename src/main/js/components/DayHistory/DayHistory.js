import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureData, humidityData, lineChartDataSingle } from '../../constants';

export default class DayHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            day: moment(),

        }
    }

    componentWillMount(){
        console.log("const");
        console.log(temperatureData);
        //console.log(this.state.day.format("YYYY-MM-DD"));
        this.loadData("2017-01-02");
        //this.loadData("2017-01-01");
    }

    componentWillUnmount(){
        console.log("unmount"); //Test
    }

    loadData(date){
        let tempTemperatureData = temperatureData;
        let tempHumidityData = humidityData;
        let tempPressureData = lineChartDataSingle;

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getTest(date).then((response) => {
            //console.log(response);
            response = response._embedded.weathers; //DEVMODE (remove later)
            //console.log(response);

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
        let date = moment().startOf('day');
        for (let i = 0; i < 24; i++){
            dateLabels.push(date.format("HH:mm"));
            date.add(1, 'hour');
        }
        return dateLabels;
    }

    setPreviousDay(){
        this.setState({day: this.state.day.subtract(1, 'day')});
        //this.loadData(this.state.day.format("YYYY-MM-DD"));
        this.loadData("2017-01-01");
    }

    setNextDay(){
        let nextDay = this.state.day.add(1, 'day');
        this.setState({day: nextDay})
    }

    isCurrentDate(){
        let today = moment();
        return today.format("YYYY-MM-DD") === this.state.day.format("YYYY-MM-DD");
    }

    render(){
        console.log("const");
        console.log(temperatureData);
        return (
            <div id="graph-container">
                <div className="history-header">
                    <img className="history-arrow" src="/img/arrow-left.png" alt="previousDayArrow" onClick={() => this.setPreviousDay()}/>
                    <p>{this.state.day.format("YYYY-MM-DD")}</p>
                    {this.isCurrentDate() ? <span /> : <img className="history-arrow" src="/img/arrow-right.png" alt="nextDayArrow" onClick={() => this.setNextDay()}/>}
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
