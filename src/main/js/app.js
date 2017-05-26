import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Root from './components/Root/Root';
import attachFastClick from 'fastclick';
import initReactFastclick from 'react-fastclick';

initReactFastclick();
attachFastClick.attach(document.body);
ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
