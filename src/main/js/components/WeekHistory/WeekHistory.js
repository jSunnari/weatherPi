import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { lineChartData, lineChartDataSingle } from '../../constants';

export default class WeekHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: moment()
        }
    }

    componentWillMount(){
        console.log(this.state.date.year(), this.state.date.week());
        this.loadData(this.state.date.year(), this.state.date.week());
    }

    loadData(year, week){
        let tempTemperatureData = JSON.parse(JSON.stringify(lineChartData));
        let tempHumidityData = JSON.parse(JSON.stringify(lineChartData));
        let tempPressureData = JSON.parse(JSON.stringify(lineChartDataSingle));

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getWeatherByWeek(year, week).then((response) => {
            console.log(response);

            response.map((weather) => {
                let index = weather.time.substring(0,2); // by day instead ---------------------------------------------

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

    isCurrentWeek(date){
        let today = moment();
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
