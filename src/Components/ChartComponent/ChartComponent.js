import React, { Component } from 'react';

class ChartComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        nextProps.forecastData && nextProps.metadata &&
        nextProps.forecastData.forEach((el) => {
            let dt_array = el.dt_txt.split(' ');
        })
    }

    render(){
        return null;
    }
}

export default ChartComponent;