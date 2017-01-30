import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

class App extends Component {

    render() {
        return (
            <div className="App">

                <div className="App-header">
                    <h2>Does this work??</h2>
                </div>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
