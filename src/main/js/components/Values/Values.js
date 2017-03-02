import React, { Component } from 'react';
import CurrentValue from '../CurrentValue/CurrentValue';
import { serverRequest } from '../../serverRequest';

export default class Values extends Component {

    constructor(props){
        super(props);
        this.state = ({
            currentWeather: {}
        })
    }

    componentWillMount(){
        serverRequest.getCurrentWeather().then((response) => {
            this.setState({currentWeather: response});
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
                    <CurrentValue iconName="thermometer" currentValue={this.state.currentWeather.outdoorTemp}"°C" minValue={this.state.currentWeather.outdoorMinTemp}"°C" maxValue={this.state.currentWeather.outdoorMaxTemp}"°C" arrow={this.state.currentWeather.outdoorTempTrend}/>
                    <CurrentValue iconName="humidity" currentValue={this.state.currentWeather.outdoorHum}"%" minValue={this.state.currentWeather.outdoorMinHum}"%" maxValue={this.state.currentWeather.outdoorMaxHum}"%" arrow={this.state.currentWeather.outdoorHumTrend}/>
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
