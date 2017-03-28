import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Graph from '../Graph/Graph';
import { serverRequest } from '../../serverRequest';
import { temperatureChartData, humidityChartData, pressureChartData, temperatureChartOptions, humidityChartOptions, pressureChartOptions} from '../../constants';
import { StickyContainer, Sticky } from 'react-sticky';

import './DayHistory.scss';

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
        //console.log(this.state.date.format("YYYY-MM-DD"));
        //this.loadData("2017-01-01");
        this.loadData(this.state.date.format("YYYY-MM-DD"));

    }

    componentDidMount(){

    }

    componentWillUnmount(){
        console.log("unmount"); //Test
        ReactDOM.findDOMNode(this.header).removeEventListener('scroll', this.handleScroll);

    }

    clearData(){
        this.state.temperatureData.labels = [];
        this.state.temperatureData.datasets.data = new Array(24);
        this.state.humidityData.labels = [];
        this.state.humidityData.datasets.data = new Array(24);
        this.state.pressureData.labels = [];
        this.state.pressureData.datasets.data = new Array(24);
    }

    loadData(day){
        //this.clearData();

        let tempTemperatureData = JSON.parse(JSON.stringify(temperatureChartData));
        let tempHumidityData = JSON.parse(JSON.stringify(humidityChartData));
        let tempPressureData = JSON.parse(JSON.stringify(pressureChartData));

        let dateLabels = this.getLabels();
        tempTemperatureData.labels = dateLabels;
        tempHumidityData.labels = dateLabels;
        tempPressureData.labels = dateLabels;

        serverRequest.getTest(day).then((response) => {
            //console.log(response);
            response = response._embedded.weathers; //DEVMODE (remove later)
            //console.log(response);

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

    setPreviousDay(){
        this.setState({day: this.state.date.subtract(1, 'day')});
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    setNextDay(){
        this.setState({day: this.state.date.add(1, 'day')});
        this.loadData(this.state.date.format("YYYY-MM-DD"));
    }

    isCurrentDate(){
        let today = moment();
        return today.format("YYYY-MM-DD") === this.state.date.format("YYYY-MM-DD");
    }

    render(){

        return (
            <StickyContainer>
                <div className="history-graph-container">
                    <Sticky>
                        <div className="history-header" ref={(el) => { this.header = el; }}>
                            <img className="history-arrow" src="/img/chevron-left-icon.png" alt="previousDayArrow" onClick={() => this.setPreviousDay()}/>
                            <p>{this.state.date.format("YYYY-MM-DD")}</p>
                            {this.isCurrentDate() ? <span /> : <img className="history-arrow" src="/img/chevron-right-icon.png" alt="nextDayArrow" onClick={() => this.setNextDay()}/>}
                        </div>
                    </Sticky>
                    <p className="graph-header">Temperature</p>
                    <Graph lineChartData={this.state.temperatureData} lineChartOptions={temperatureChartOptions} />
                    <p className="graph-header">Humidity</p>
                    <Graph lineChartData={this.state.humidityData} lineChartOptions={humidityChartOptions}/>
                    <p className="graph-header">Pressure</p>
                    <Graph lineChartData={this.state.pressureData} lineChartOptions={pressureChartOptions}/>
                </div>
            </StickyContainer>
        )
    }
}
