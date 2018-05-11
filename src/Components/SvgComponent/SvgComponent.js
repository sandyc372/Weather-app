import React, { Component } from 'react';
import SunComponent from '../SunComponent';

const BlueSky = function(props){
    return(
        <rect x = {0}
              y = {0}
              width={window.innerWidth}
              height = {window.innerHeight}
              fill = '#87CEEB'>

        </rect>
    )
}
class SvgComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <svg height={window.innerHeight}
                 width={window.innerWidth}
            >
                <BlueSky/>
                <SunComponent center={{x: window.innerWidth - 100, y: 100}}/>    
            </svg>
        )
    }
}

export default SvgComponent;