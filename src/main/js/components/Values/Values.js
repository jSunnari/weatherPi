import React, { Component } from 'react';
import CurrentValue from '../CurrentValue/CurrentValue';

export default class Values extends Component {

    render() {
        return (
            <div id="value-container">
                <CurrentValue iconName="thermometer" currentValue="4.8°C" minValue="-1°C" maxValue="4.9°C" arrow="direction-right"/>
                <CurrentValue iconName="humidity" currentValue="88%" minValue="79%" maxValue="99%" arrow="direction-up-right"/>
                <CurrentValue iconName="barometer" currentValue="1033hPa" minValue="1020hPa" maxValue="1030hPa" arrow="direction-down-right"/>


            </div>
        )
    }
}
