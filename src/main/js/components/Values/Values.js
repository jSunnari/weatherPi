import React, { Component } from 'react';
import CurrentValue from '../CurrentValue/CurrentValue';
import { serverRequest } from '../../serverRequest';

export default class Values extends Component {

    constructor(props){
        super(props);
        this.state = ({
            currentWeather: {
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
            console.log(response);
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
                    <CurrentValue iconName="thermometer" currentValue={this.state.currentWeather.outdoorTemp + "°C"} minValue={this.state.currentWeather.outdoorMinTemp + "°C"} maxValue={this.state.currentWeather.outdoorMaxTemp + "°C"} arrow={this.state.currentWeather.outdoorTempTrend} />
                    <CurrentValue iconName="humidity" currentValue={this.state.currentWeather.outdoorHum + "%"} minValue={this.state.currentWeather.outdoorMinHum + "%"} maxValue={this.state.currentWeather.outdoorMaxHum + "%"} arrow={this.state.currentWeather.outdoorHumTrend} />
                    <CurrentValue iconName="barometer" currentValue={this.state.currentWeather.outdoorPressure + "hPa"} minValue={this.state.currentWeather.outdoorMinPressure + "hPa"} maxValue={this.state.currentWeather.outdoorMaxPressure + "hPa"} arrow={this.state.currentWeather.outdoorPressureTrend} />
                </div>

                <div id="indoor-values-container">
                    <h1 className="location-header">Indoor</h1>
                    <CurrentValue iconName="thermometer" currentValue={this.state.currentWeather.indoorTemp + "°C"} minValue={this.state.currentWeather.indoorMinTemp + "°C"} maxValue={this.state.currentWeather.indoorMaxTemp + "°C"} arrow={this.state.currentWeather.indoorTempTrend}/>
                    <CurrentValue iconName="humidity" currentValue={this.state.currentWeather.indoorHum + "%"} minValue={this.state.currentWeather.indoorMinHum + "%"} maxValue={this.state.currentWeather.indoorMaxHum + "%"} arrow={this.state.currentWeather.indoorHumTrend}/>
                </div>

                <p onClick={() => this.test()}>Click me</p>

            </div>
        )
    }
}
