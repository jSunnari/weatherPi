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
            pressureData: JSON.parse(JSON.stringify(pressureChartData)),
            noData: false,
            shouldRedraw: false
        }
    }

    componentWillMount(){
        this.loadData(this.state.date.year());
    }

    loadData(year){
        serverRequest.getWeatherByYear(year).then((response) => {
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

                response.map((weatherObject) => {
                    let index = dateLabels.indexOf(weatherObject.key);

                    tempTemperatureData.datasets[0].data.splice(index, 1, weatherObject.weather.insideTemperature);
                    tempTemperatureData.datasets[1].data.splice(index, 1, weatherObject.weather.outsideTemperature);
                    tempHumidityData.datasets[0].data.splice(index, 1, weatherObject.weather.outsideHumidity);
                    tempHumidityData.datasets[1].data.splice(index, 1, weatherObject.weather.insideHumidity);
                    tempPressureData.datasets[0].data.splice(index, 1, weatherObject.weather.outsidePressure);
                });
                this.setState({
                    shouldRedraw: response.length < dateLabels.length,
                    noData: false,
                    temperatureData: tempTemperatureData,
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
                    {this.state.noData ? <p className="graph-header">NO DATA</p> :
                        <div>
                            <p className="graph-header">TEMPERATURE</p>
                            <Graph lineChartData={this.state.temperatureData} lineChartOptions={temperatureChartOptions} bar={true}/>
                            <p className="graph-header">HUMIDITY</p>
                            <Graph lineChartData={this.state.humidityData} lineChartOptions={humidityChartOptions} bar={true}/>
                            <p className="graph-header">PRESSURE</p>
                            <Graph lineChartData={this.state.pressureData} lineChartOptions={pressureChartOptions} bar={true}/>
                        </div>
                    }
                </div>
            </StickyContainer>
        )
    }
}
