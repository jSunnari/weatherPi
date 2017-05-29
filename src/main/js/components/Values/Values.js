import React, { Component } from 'react';
import CurrentValue from '../CurrentValue/CurrentValue';
import Separator from '../Separator/Separator'
import { serverRequest } from '../../serverRequest';

import './Values.scss';

export default class Values extends Component {

    constructor(props){
        super(props);
        this.state = ({
            currentWeather: {
                outdoorMaxHum: 0,
                outdoorPressure: 0,
                indoorMinTemp: 0,
                outdoorMinTemp: 0,
                indoorMinHum: 0,
                outdoorMinHum: 0,
                outdoorMaxPressure: 0,
                outdoorTemp: 0,
                indoorTemp: 0,
                outdoorMaxTemp: 0,
                indoorHum: 0,
                outdoorHum: 0,
                indoorMaxHum: 0,
                outdoorMinPressure: 0,
                indoorMaxTemp: 0,
                outdoorTempTrend: "direction-right",
                outdoorHumTrend: "direction-right",
                outdoorPressureTrend: "direction-right",
                indoorTempTrend: "direction-right",
                indoorHumTrend: "direction-right"
            }
        })
    }

    componentWillMount(){
        this.loadCurrentWeather();
        this.loadCurrentWeatherInterval = setInterval(() => this.loadCurrentWeather(), 15000);
    }

    componentWillUnmount(){
        if (this.loadCurrentWeatherInterval !== undefined){
            clearInterval(this.loadCurrentWeatherInterval);
            this.loadCurrentWeatherInterval = undefined;
        }
    }

    loadCurrentWeather(){
        serverRequest.getCurrentWeather().then((response) => {
            this.setState({currentWeather: response});
        }, (error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div id="value-container">

                <div id="outdoor-values-container">
                    <h1 className="location-header">OUTDOOR</h1>
                    <CurrentValue iconName="thermometer" currentValue={this.state.currentWeather.outdoorTemp + "°C"} minValue={this.state.currentWeather.outdoorMinTemp + "°C"} maxValue={this.state.currentWeather.outdoorMaxTemp + "°C"} arrow={this.state.currentWeather.outdoorTempTrend} />
                    <Separator/>
                    <CurrentValue iconName="humidity" currentValue={this.state.currentWeather.outdoorHum + "%"} minValue={this.state.currentWeather.outdoorMinHum + "%"} maxValue={this.state.currentWeather.outdoorMaxHum + "%"} arrow={this.state.currentWeather.outdoorHumTrend} />
                    <Separator/>
                    <CurrentValue iconName="barometer" currentValue={this.state.currentWeather.outdoorPressure + "hPa"} minValue={this.state.currentWeather.outdoorMinPressure + "hPa"} maxValue={this.state.currentWeather.outdoorMaxPressure + "hPa"} arrow={this.state.currentWeather.outdoorPressureTrend} />
                </div>

                <div id="indoor-values-container">
                    <h1 className="location-header">INDOOR</h1>
                    <CurrentValue iconName="thermometer" currentValue={this.state.currentWeather.indoorTemp + "°C"} minValue={this.state.currentWeather.indoorMinTemp + "°C"} maxValue={this.state.currentWeather.indoorMaxTemp + "°C"} arrow={this.state.currentWeather.indoorTempTrend}/>
                    <Separator/>
                    <CurrentValue iconName="humidity" currentValue={this.state.currentWeather.indoorHum + "%"} minValue={this.state.currentWeather.indoorMinHum + "%"} maxValue={this.state.currentWeather.indoorMaxHum + "%"} arrow={this.state.currentWeather.indoorHumTrend}/>
                </div>

            </div>
        )
    }
}
