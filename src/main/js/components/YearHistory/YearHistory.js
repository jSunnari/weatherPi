import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureChartData, humidityChartData, pressureChartData, temperatureChartOptions, humidityChartOptions, pressureChartOptions} from '../../constants';
import { StickyContainer, Sticky } from 'react-sticky';

export default class YearHistory extends Component {

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
        this.loadData(this.state.date.year());
    }

    loadData(year){
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

        serverRequest.getWeatherByYear(year).then((response) => {

            response.map((weatherObject) => {

                console.log(weatherObject);

                let index = dateLabels.map((month, index) => {
                    if (month.toLowerCase() === weatherObject.key.toLowerCase()){
                        return index;
                    }
                });

                tempTemperatureData.datasets[0].data.splice(index, 0, weatherObject.weather.insideTemperature);
                tempTemperatureData.datasets[1].data.splice(index, 0, weatherObject.weather.outsideTemperature);
                tempHumidityData.datasets[0].data.splice(index, 0, weatherObject.weather.insideHumidity);
                tempHumidityData.datasets[1].data.splice(index, 0, weatherObject.weather.outsideHumidity);
                tempPressureData.datasets[0].data.splice(index, 0, weatherObject.weather.outsidePressure);
            });

            this.setState({temperatureData: tempTemperatureData, humidityData: tempHumidityData, pressureData: tempPressureData});

        }, (error) => {
            console.error(error);
        });
    }

    getLabels(){
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    }

    setPrevious(){
        this.setState({day: this.state.date.subtract(1, 'year')});
        this.loadData(this.state.date.year(), this.state.date.month());
    }

    setNext(){
        this.setState({day: this.state.date.add(1, 'year')});
        this.loadData(this.state.date.year(), this.state.date.month());
    }

    isCurrent(){
        let today = moment();
        return today.year() === this.state.date.year();
    }

    render(){

        return (
            <StickyContainer>
                <div className="history-graph-container">
                    <Sticky>
                        <div className="history-header" ref={(el) => { this.header = el; }}>
                            <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPrevious()}/>
                            <p>{this.state.date.format("YYYY")}</p>
                            {this.isCurrent() ? <span /> : <img className="history-arrow" src="/img/chevron-right-icon.png" alt="nextDayArrow" onClick={() => this.setNext()}/>}
                        </div>
                    </Sticky>
                    <p className="graph-header">TEMPERATURE</p>
                    <Graph lineChartData={this.state.temperatureData} lineChartOptions={temperatureChartOptions} />
                    <p className="graph-header">HUMIDITY</p>
                    <Graph lineChartData={this.state.humidityData} lineChartOptions={humidityChartOptions}/>
                    <p className="graph-header">PRESSURE</p>
                    <Graph lineChartData={this.state.pressureData} lineChartOptions={pressureChartOptions}/>
                </div>
            </StickyContainer>
        )
    }
}
