import React, { Component } from 'react';
import WeatherIcons from 'react-weathericons';
import './CurrentValue.scss';

export default class CurrentValue extends Component {

    render() {
        return (
            <div id="currentvalue-container">
                <div id="value-icon-container">
                    <WeatherIcons id="value-icon" name={this.props.iconName}  />
                </div>

                <div id="values">
                    <p id="currentvalue">{this.props.currentValue}</p>

                    <div id="minmax-container">

                        <WeatherIcons className="minmax-icon" name="direction-down" size="lg" />
                        <p className="minmax-value">{this.props.minValue}</p>

                        <WeatherIcons id="max-value-icon" className="minmax-icon" name="direction-up" size="lg"  />
                        <p className="minmax-value">{this.props.maxValue}</p>

                    </div>
                </div>

                <div id="arrow-icon-container">
                    <WeatherIcons id="arrow-icon" name={this.props.arrow} size="2x" />
                </div>

            </div>
        )
    }
}
