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
            pressureData: JSON.parse(JSON.stringify(pressureChartData))
        }
    }

    componentWillMount(){
        console.log(this.state.date.year(), this.state.date.week());
        this.loadData(this.state.date.year(), this.state.date.week());
    }

    loadData(year, week){
        let tempTemperatureData = JSON.parse(JSON.stringify(temperatureChartData));
        let tempHumidityData = JSON.parse(JSON.stringify(humidityChartData));
        let tempPressureData = JSON.parse(JSON.stringify(pressureChartData));

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getWeatherByWeek(year, week).then((response) => {
            console.log(response);

            response.map((weather) => {

                console.log(weather);

                /*
                let index = weather.time.substring(0,2); // by day instead ---------------------------------------------

                tempTemperatureData.datasets[0].data.splice(index, 0, weather.insideTemperature);
                tempTemperatureData.datasets[1].data.splice(index, 0, weather.outsideTemperature);

                tempHumidityData.datasets[0].data.splice(index, 0, weather.insideHumidity);
                tempHumidityData.datasets[1].data.splice(index, 0, weather.outsideHumidity);

                tempPressureData.datasets[0].data.splice(index, 0, weather.outsidePressure);
                */
            });

            this.setState({temperatureData: tempTemperatureData, humidityData: tempHumidityData, pressureData: tempPressureData});

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

    isCurrent(date){
        let today = moment();
        return today.week() === date.week();
    }

    render(){

        return (
            <StickyContainer>
                <div className="history-graph-container">
                    <Sticky>
                        <div className="history-header" ref={(el) => { this.header = el; }}>
                            <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPrevious()}/>
                            <p>{this.state.date.format("YYYY") + " - " + this.state.date.week()}</p>
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
