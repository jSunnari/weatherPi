export const temperatureChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    spanGaps: true,
    tooltips: {
        mode: 'label'
    },
    legend: {
        labels:{
            boxWidth: 15
        }
    },
    scales: {
        xAxes: [{
            afterTickToLabelConversion: function(data){
                let xLabels = data.ticks;
                xLabels.forEach(function (labels, i) {
                    if (i !== 0 && i % 3 !== 0){
                        xLabels[i] = '';
                    }

                });
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    }
};

export const humidityChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    spanGaps: true,
    tooltips: {
        mode: 'label'
    },
    legend: {
        reverse: true,
        labels:{
            boxWidth: 15
        }
    },
    scales: {
        xAxes: [{
            afterTickToLabelConversion: function(data){
                let xLabels = data.ticks;
                xLabels.forEach(function (labels, i) {
                    if (i !== 0 && i % 3 !== 0){
                        xLabels[i] = '';
                    }

                });
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    }
};

export const pressureChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    spanGaps: true,
    tooltips: {
        mode: 'label'
    },
    legend: {
        onClick: null,
        labels:{
            boxWidth: 15
        }
    },
    scales: {
        xAxes: [{
            afterTickToLabelConversion: function(data){
                let xLabels = data.ticks;
                xLabels.forEach(function (labels, i) {
                    if (i !== 0 && i % 3 !== 0){
                        xLabels[i] = '';
                    }

                });
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    }
};

export const temperatureChartData = {
    labels: [],
    datasets: [
        {
            label: "Indoor",
            fill: "bottom",
            lineTension: 0.3,
            borderWidth: 2,
            borderColor: "rgba(122, 189, 192, .8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBackgroundColor: "rgba(75,192,192, 1)",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192, 1)",
            pointHoverBorderColor: "rgba(220,220,220, .9)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: new Array(24)
        },
        {
            label: "Outdoor",
            fill: "bottom",
            lineTension: 0.3,
            borderWidth: 2,
            borderColor: "rgba(96,135,179, .8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBackgroundColor: "rgba(96,135,179, 1)",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(96,135,179, 1)",
            pointHoverBorderColor: "rgba(220,220,220, .9)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: new Array(24)
        }
    ]
};

export const humidityChartData = {
    labels: [],
    datasets: [
        {
            label: "Outdoor",
            fill: "bottom",
            lineTension: 0.3,
            borderWidth: 2,
            borderColor: "rgba(96,135,179, .8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBackgroundColor: "rgba(96,135,179, 1)",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(96,135,179, 1)",
            pointHoverBorderColor: "rgba(220,220,220, .9)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: new Array(24)
        },
        {
            label: "Indoor",
            fill: "bottom",
            lineTension: 0.3,
            borderWidth: 2,
            borderColor: "rgba(122, 189, 192, .8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBackgroundColor: "rgba(75,192,192, 1)",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(75,192,192, 1)",
            pointHoverBorderColor: "rgba(220,220,220, .9)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: new Array(24)
        }
    ]
};

export const pressureChartData = {
    labels: [],
    datasets: [
        {
            label: "Outdoor",
            fill: true,
            lineTension: 0.3,
            borderWidth: 2,
            borderColor: "rgba(96,135,179, .8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBackgroundColor: "rgba(96,135,179, 1)",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(96,135,179, 1)",
            pointHoverBorderColor: "rgba(220,220,220, .9)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: new Array(24),
        }
    ]
};

