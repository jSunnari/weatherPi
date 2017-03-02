import React, { Component } from 'react';
import CurrentValue from '../CurrentValue/CurrentValue';
import { serverRequest } from '../../serverRequest';

export default class Values extends Component {

    constructor(props){
        super(props);
        this.state = {
            outsideTemp: 0,
            outsideTempMin: 0,
            outsideTempMax: 0,
            outsideHum: 0,
            outsideHumMin: 0,
            outsideHumMax: 0,
            outsidePressure: 0,
            outsidePressureMin: 0,
            outsidePressureMax: 0,
            insideTemp: 0,
            insideTempMin: 0,
            insideTempMax: 0,
            insideHum: 0,
            insideHumMin: 0,
            insideHumMax: 0,
            outsideTempTrend: "direction-right",
            outsideHumTrend: "direction-right",
            outsidePressureTrend: "direction-right",
            insideTempTrend: "direction-right",
            insideHumTrend: "direction-right"
        }
    }

    componentWillMount(){
        serverRequest.getCurrentWeather().then((response) => {
            console.log(response);
            console.log(response.indoorTemp);
        }, (error) => {
            console.error(error);
        });
    }

    test(){
        serverRequest.getWeatherByWeek(2017, 9).then((response) => {
            console.log(response);
        }, (error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div id="value-container">

                <div id="outdoor-values-container">
                    <h1 className="location-header">Outdoor</h1>
                    <CurrentValue iconName="thermometer" currentValue="4.8°C" minValue="-1°C" maxValue="4.9°C" arrow="direction-right"/>
                    <CurrentValue iconName="humidity" currentValue="88%" minValue="79%" maxValue="99%" arrow="direction-up-right"/>
                    <CurrentValue iconName="barometer" currentValue="1033hPa" minValue="1020hPa" maxValue="1030hPa" arrow="direction-down-right"/>
                </div>

                <div id="indoor-values-container">
                    <h1 className="location-header">Indoor</h1>
                    <CurrentValue iconName="thermometer" currentValue="4.8°C" minValue="-1°C" maxValue="4.9°C" arrow="direction-right"/>
                    <CurrentValue iconName="humidity" currentValue="88%" minValue="79%" maxValue="99%" arrow="direction-up-right"/>
                </div>

                <p onClick={() => this.test()}>Click me</p>

            </div>
        )
    }
}
