import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureChartData, humidityChartData, pressureChartData, temperatureChartOptions, humidityChartOptions, pressureChartOptions} from '../../constants';
import { StickyContainer, Sticky } from 'react-sticky';


export default class WeekHistory extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: moment(),
            temperatureData: JSON.parse(JSON.stringify(temperatureChartData)),
            humidityData: JSON.parse(JSON.stringify(humidityChartData)),
            pressureData: JSON.parse(JSON.stringify(pressureChartData)),
            noData: false,
            shouldRedraw: false
        }
    }

    componentWillMount(){
        this.loadData(this.state.date.year(), this.state.date.week());
    }

    loadData(year, week){
        serverRequest.getWeatherByWeek(year, week).then((response) => {
            if (response.length > 0) {
                let tempTemperatureData = JSON.parse(JSON.stringify(temperatureChartData));
                let tempHumidityData = JSON.parse(JSON.stringify(humidityChartData));
                let tempPressureData = JSON.parse(JSON.stringify(pressureChartData));

                tempTemperatureData.datasets[0].data = new Array(12);
                tempTemperatureData.datasets[1].data = new Array(12);
                tempHumidityData.datasets[0].data = new Array(12);
                tempHumidityData.datasets[1].data = new Array(12);
                tempPressureData.datasets[0].data = new Array(12);

                let dateLabels = this.getLabels();
                tempTemperatureData.labels = dateLabels;
                tempHumidityData.labels = dateLabels;
                tempPressureData.labels = dateLabels;

                if (response.length < dateLabels.length) {
                    this.setState({shouldRedraw: true})
                } else {
                    this.setState({shouldRedraw: false})
                }

                response.map((weatherObject) => {
                    let index = 0;
                    switch (weatherObject.key.toLowerCase()) {
                        case "monday":
                            index = 0;
                            break;
                        case "tuesday":
                            index = 1;
                            break;
                        case "wednesday":
                            index = 2;
                            break;
                        case "thursday":
                            index = 3;
                            break;
                        case "friday":
                            index = 4;
                            break;
                        case "saturday":
                            index = 5;
                            break;
                        case "sunday":
                            index = 6;
                            break;
                    }
                    tempTemperatureData.datasets[0].data.splice(index, 1, weatherObject.weather.insideTemperature);
                    tempTemperatureData.datasets[1].data.splice(index, 1, weatherObject.weather.outsideTemperature);
                    tempHumidityData.datasets[0].data.splice(index, 1, weatherObject.weather.outsideHumidity);
                    tempHumidityData.datasets[1].data.splice(index, 1, weatherObject.weather.insideHumidity);
                    tempPressureData.datasets[0].data.splice(index, 1, weatherObject.weather.outsidePressure);
                });
                this.setState({
                    shouldRedraw: response.length < dateLabels.length,
                    noData: false,
                    temperatureData:
                    tempTemperatureData,
                    humidityData: tempHumidityData,
                    pressureData: tempPressureData});
            }
            else {
                this.setState({noData: true})
            }
        }, (error) => {
            console.error(error);
        });
    }

    getLabels(){
        return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    }

    setPrevious(){
        this.setState({day: this.state.date.subtract(1, 'week')});
        this.loadData(this.state.date.year(), this.state.date.week());
    }

    setNext(){
        this.setState({day: this.state.date.add(1, 'week')});
        this.loadData(this.state.date.year(), this.state.date.week());
    }

    isCurrent(){
        let today = moment();
        return today.week() === this.state.date.week();
    }

    render(){
        return (
            <StickyContainer>
                <div className="history-graph-container">
                    <Sticky>
                        <div className="history-header" ref={(el) => { this.header = el; }}>
                            <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPrevious()}/>
                            <p>{"Week: " + this.state.date.week() + " " + this.state.date.format("YYYY")}</p>
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
