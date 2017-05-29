import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureChartData, humidityChartData, pressureChartData, temperatureChartOptions, humidityChartOptions, pressureChartOptions} from '../../constants';
import { StickyContainer, Sticky } from 'react-sticky';

export default class MonthHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            temperatureData: JSON.parse(JSON.stringify(temperatureChartData)),
            humidityData: JSON.parse(JSON.stringify(humidityChartData)),
            pressureData: JSON.parse(JSON.stringify(pressureChartData)),
            noData: false
        }
    }

    componentWillMount(){
        this.loadData(this.state.date.year(), this.state.date.month());
    }

    loadData(year, month){
        let tempTemperatureData = JSON.parse(JSON.stringify(temperatureChartData));
        let tempHumidityData = JSON.parse(JSON.stringify(humidityChartData));
        let tempPressureData = JSON.parse(JSON.stringify(pressureChartData));

        tempTemperatureData.datasets[0].data = new Array(this.state.date.daysInMonth());
        tempTemperatureData.datasets[1].data = new Array(this.state.date.daysInMonth());
        tempHumidityData.datasets[0].data = new Array(this.state.date.daysInMonth());
        tempHumidityData.datasets[1].data = new Array(this.state.date.daysInMonth());
        tempPressureData.datasets[0].data = new Array(this.state.date.daysInMonth());

        serverRequest.getWeatherByMonth(year, month).then((response) => {
            if (response.length > 0) {
                let dateLabels = this.getLabels();
                tempTemperatureData.labels = dateLabels;
                tempHumidityData.labels = dateLabels;
                tempPressureData.labels = dateLabels;

                response.map((weatherObject) => {
                    let index = (weatherObject.key - 1);

                    tempTemperatureData.datasets[0].data.splice(index, 1, weatherObject.weather.insideTemperature);
                    tempTemperatureData.datasets[1].data.splice(index, 1, weatherObject.weather.outsideTemperature);
                    tempHumidityData.datasets[0].data.splice(index, 1, weatherObject.weather.outsideHumidity);
                    tempHumidityData.datasets[1].data.splice(index, 1, weatherObject.weather.insideHumidity);
                    tempPressureData.datasets[0].data.splice(index, 1, weatherObject.weather.outsidePressure);
                });

                this.setState({noData: false, temperatureData: tempTemperatureData, humidityData: tempHumidityData, pressureData: tempPressureData});

            }
            else {
                this.setState({noData: true})
            }


        }, (error) => {
            console.error(error);
        });
    }

    getLabels(){
        let days = [];
        for (let i = 0; i <= this.state.date.daysInMonth(); i++) {
            days[i-1] = i + " " + this.state.date.format("MMMM");
        }
        return days;
    }

    setPrevious(){
        this.setState({day: this.state.date.subtract(1, 'month')});
        this.loadData(this.state.date.year(), this.state.date.month());
    }

    setNext(){
        this.setState({day: this.state.date.add(1, 'month')});
        this.loadData(this.state.date.year(), this.state.date.month());
    }

    isCurrent(){
        let today = moment();
        return today.month() === this.state.date.month();
    }

    render(){

        return (
            <StickyContainer>
                <div className="history-graph-container">
                    <Sticky>
                        <div className="history-header" ref={(el) => { this.header = el; }}>
                            <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPrevious()}/>
                            <p>{this.state.date.format("MMMM") + " " + this.state.date.format("YYYY")}</p>
                            {this.isCurrent() ? <span /> : <img className="history-arrow" src="/img/chevron-right-icon.png" alt="nextDayArrow" onClick={() => this.setNext()}/>}
                        </div>
                    </Sticky>
                    {this.state.noData ? <p className="graph-header">NO DATA</p> :
                        <div>
                            <p className="graph-header">TEMPERATURE</p>
                            <Graph lineChartData={this.state.temperatureData} lineChartOptions={temperatureChartOptions} redraw={this.isCurrent()}/>
                            <p className="graph-header">HUMIDITY</p>
                            <Graph lineChartData={this.state.humidityData} lineChartOptions={humidityChartOptions} redraw={this.isCurrent()}/>
                            <p className="graph-header">PRESSURE</p>
                            <Graph lineChartData={this.state.pressureData} lineChartOptions={pressureChartOptions} redraw={this.isCurrent()}/>
                        </div>
                    }
                </div>
            </StickyContainer>
        )
    }
}
