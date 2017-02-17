import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import WeatherIcons from 'react-weathericons';

import 'whatwg-fetch';


class App extends Component {

    render() {
        return (
            <div className="App">

                <div className="App-header">
                    <h2>Yepp, it works!!</h2>
                    <p id="test">even the css works,</p> <p id="test2">cool!! RPI</p>
                </div>

                <WeatherIcons name="thermometer" size="2x" />

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
