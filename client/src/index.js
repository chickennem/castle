import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HotelResto from './HotelRestoEtoile.json';

ReactDOM.render(<App data = {HotelResto}/>, document.getElementById('root'));

//ReactDOM.render(<App data={HotelResto} />, document.getElementById('liste'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
