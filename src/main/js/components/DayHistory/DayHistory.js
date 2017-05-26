import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureChartData, humidityChartData, pressureChartData, temperatureChartOptions, humidityChartOptions, pressureChartOptions} from '../../constants';
import { StickyContainer, Sticky } from 'react-sticky';

export default class DayHistory extends Component {

    constructor(props){
        super(props);

        this.state = {
            date: moment(),
            temperatureData: JSON.parse(JSON.stringify(temperatureChartData)),
            humidityData: JSON.parse(JSON.stringify(humidityChartData)),
            pressureData: JSON.parse(JSON.stringify(pressureChartData))
        }
    }

    componentWillMount(){
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    loadData(day){
        let tempTemperatureData = JSON.parse(JSON.stringify(temperatureChartData));
        let tempHumidityData = JSON.parse(JSON.stringify(humidityChartData));
        let tempPressureData = JSON.parse(JSON.stringify(pressureChartData));

        tempTemperatureData.datasets[0].data = new Array(24);
        tempTemperatureData.datasets[1].data = new Array(24);
        tempHumidityData.datasets[0].data = new Array(24);
        tempHumidityData.datasets[1].data = new Array(24);
        tempPressureData.datasets[0].data = new Array(24);

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getWeatherByDay(day).then((response) => {

            response.map((weather) => {
                let index = weather.time.substring(0,2);

                tempTemperatureData.datasets[0].data.splice(index, 1, weather.insideTemperature);
                tempTemperatureData.datasets[1].data.splice(index, 1, weather.outsideTemperature);

                tempHumidityData.datasets[0].data.splice(index, 1, weather.outsideHumidity);
                tempHumidityData.datasets[1].data.splice(index, 1, weather.insideHumidity);

                tempPressureData.datasets[0].data.splice(index, 1, weather.outsidePressure);
            });

            this.setState({
                temperatureData: tempTemperatureData,
                humidityData: tempHumidityData,
                pressureData: tempPressureData
            });

        }, (error) => {
            console.error(error);
        });
    }

    getLabels(){
        let dateLabels = [];
        let date = moment().startOf('day');
        for (let i = 0; i < 24; i++){
            dateLabels.push(date.format("HH:mm"));
            date.add(1, 'hour');
        }
        return dateLabels;
    }

    setPrevious(){
        this.setState({day: this.state.date.subtract(1, 'day')});
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    setNext(){
        this.setState({day: this.state.date.add(1, 'day')});
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    isCurrent(){
        let today = moment();
        return today.format("YYYY-MM-DD") === this.state.date.format("YYYY-MM-DD");
    }

    render(){

        return (
            <StickyContainer>
                <div className="history-graph-container">
                    <Sticky>
                        <div className="history-header" ref={(el) => { this.header = el; }}>
                            <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPrevious()}/>
                            <p>{this.state.date.format("YYYY-MM-DD")}</p>
                            {this.isCurrent() ? <span /> : <img className="history-arrow" src="/img/chevron-right-icon.png" alt="nextDayArrow" onClick={() => this.setNext()}/>}
                        </div>
                    </Sticky>
                    <p className="graph-header">TEMPERATURE</p>
                    <Graph lineChartData={this.state.temperatureData} lineChartOptions={temperatureChartOptions} redraw={this.isCurrent()}/>
                    <p className="graph-header">HUMIDITY</p>
                    <Graph lineChartData={this.state.humidityData} lineChartOptions={humidityChartOptions} redraw={this.isCurrent()}/>
                    <p className="graph-header">PRESSURE</p>
                    <Graph lineChartData={this.state.pressureData} lineChartOptions={pressureChartOptions} redraw={this.isCurrent()}/>
                </div>
            </StickyContainer>
        )
    }
}
