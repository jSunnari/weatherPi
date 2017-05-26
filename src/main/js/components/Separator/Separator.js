import React, { Component } from 'react';

import './Separator.scss';

export default class Separator extends Component {

    render() {
        return (
            <div className="hr-div">
                <hr className="left-hr" />
                <hr className="right-hr" />
            </div>
        )
    }
}
