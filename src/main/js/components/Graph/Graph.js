import React, { Component } from 'react';
import { Line } from 'react-chartjs-2'; //https://github.com/gor181/react-chartjs-2
import { serverRequest } from '../../serverRequest';

const data = {
    labels: [],
    datasets: [
        {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        },
        {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,0.4)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(220,220,220,1)",
            pointHoverBorderColor: "rgba(75,192,192,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        }
    ]
};

export default class Graph extends Component {

    componentWillMount(){
        let now = new Date(); //install moment

        serverRequest.getWeatherByDay("2017-03-06").then((response) => {
            console.log(response);

            response.map((weather) => {
                data.datasets[0].data.push(weather.outsideTemperature);
                data.datasets[1].data.push(weather.insideTemperature);

            });
        }, (error) => {
            console.error(error);
        });

        for (let i = 0; i < 24; i++){
            if (i < 10){
                data.labels.push("0"+i+":00");
            } else {
                data.labels.push(i+":00");
            }
        }

        data.datasets[0].label = "Outdoor";
        data.datasets[1].label = "Indoor";

    }


    render() {

        return (
            <div id="graph-container">

                <Line
                    data={data}
                    height={250}
                    options={{
                        maintainAspectRatio: false
                    }}
                />

            </div>
        )
    }
}
