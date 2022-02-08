import React from 'react';
import ReactDOM from 'react-dom';

export default class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            movieSearch: true,
            movies: false,
            reviews: false,
        };
    }
}