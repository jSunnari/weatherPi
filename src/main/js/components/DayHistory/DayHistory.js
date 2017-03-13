import React, { Component } from 'react';
import Moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureData, humidityData, lineChartDataSingle } from '../../constants';

export default class DayHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            temperatureData: temperatureData,
            humidityData: humidityData,
            pressureData: lineChartDataSingle
        }
    }

    componentWillMount(){
        console.log("const");
        console.log(temperatureData);
        let date = Moment(new Date()).format("YYYY-MM-DD");
        console.log(date);
        setTimeout(() => this.loadData("2017-01-01"), 2000);
        //this.loadData("2017-01-01");
    }

    componentWillUnmount(){
        console.log("unmount");
    }

    loadData(date){
        serverRequest.getTest(date).then((response) => {
            console.log(response);
            response = response._embedded.weathers; //DEVMODE
            console.log(response);
            let tempData = this.state.temperatureData;
            let humidityData = this.state.humidityData;
            let pressureData = this.state.pressureData;
            let dateLabels = this.getLabels();
            temperatureData.labels = dateLabels;
            humidityData.labels = dateLabels;
            pressureData.labels = dateLabels;

            response.map((weather) => {
                let index = weather.time.substring(0,2);
                tempData.datasets[0].data.splice(index, 0, weather.insideTemperature);
                temperatureData.datasets[1].data.splice(index, 0, weather.outsideTemperature);

                humidityData.datasets[0].data.splice(index, 0, weather.insideHumidity);
                humidityData.datasets[1].data.splice(index, 0, weather.outsideHumidity);

                pressureData.datasets[0].data.splice(index, 0, weather.outsidePressure);
            });

            this.setState({temperatureData: tempData, humidityData: humidityData, pressureData: pressureData});

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
                <Graph lineChartData={this.state.temperatureData}/>
                <Graph lineChartData={this.state.humidityData}/>
                <Graph lineChartData={this.state.pressureData}/>
            </div>
        )
    }
}
