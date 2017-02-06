import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

class App extends Component {

    render() {
        return (
            <div className="App">

                <div className="App-header">
                    <h2>Yepp, it works!!</h2>
                    <p id="test">even the css works,</p> <p id="test2">cool!!</p>
                </div>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
