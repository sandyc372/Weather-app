import React, { Component } from 'react';
import $ from 'jquery';
import Warp from 'warpjs';

const svg = $(`<svg id="svg-element">
		<circle cx="${window.innerWidth - 300}" cy="${400}" r="50.784" filter="url(#filter)" style="fill: #00fbd1; mix-blend-mode: multiply;"/>	
</svg>`);

const NightSky = function(props){
    return(
        <rect x = {0}
              y = {0}
              width={window.innerWidth}
              height = {window.innerHeight}
              fill = '#414345'>

        </rect>
    )
}

const Moonshine = function(props){
    return(
        <circle cx = {props.center.x}
              cy = {props.center.y}
              r={props.radius}
              fill = {props.fill}>

        </circle>
    )
}

const Reflection = function(props){
    return <path  d={props.d} fill={props.fill} filter={props.filter}/>
}

class ClearNight extends Component{
    constructor(props){
        super(props);
        this.state = {
            d: ""
        }
        this.warp = new Warp(svg.get(0))

        this.warp.interpolate(4)
        this.warp.transform(([ x, y ]) => [ x, y, x ])

        this.offset = 0
    }

    componentDidMount(){
        
        this.renderReflection();
    }

    renderReflection(){

        this.warp.transform(([ x, y, ox ]) => [ ox + 2 * Math.sin(x / 16 + this.offset), y, ox ])
        this.setState(() => ({
            d: $(svg).find('path').attr('d')
        }))
     
        this.offset += 0.1
        requestAnimationFrame(this.renderReflection.bind(this))

    }

    render(){
        return(
            <svg height={window.innerHeight}
                 width={window.innerWidth}
            >
                <defs>
                    <radialGradient id="moonshine">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="120%" stopColor="#414345"/>
                    </radialGradient>
                </defs>
                <filter id="reflect">
                    <feTurbulence type="fractalNoise" baseFrequency="0.000001 0.13" numOctaves="1" result="warp"></feTurbulence>
                    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="60" in="SourceGraphic" in2="warp"></feDisplacementMap>
                </filter>
                <NightSky/>
                <Moonshine radius={100}
                          fill={'url(#moonshine)'}
                          center={{x: window.innerWidth - 300, y: 100}}
                />
                <Moonshine radius={50}
                          fill={'white'}
                          center={{x: window.innerWidth - 300, y: 100}}
                />
                <Reflection filter={"url(#reflect)"} fill={'white'} d={this.state.d}/>

            </svg>
        )
    }
}

export default ClearNight;