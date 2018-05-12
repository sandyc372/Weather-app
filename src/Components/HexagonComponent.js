import React, { Component } from 'react';

const HexagonComponent = function(props){
    let points = '';
    for(let theta = Math.PI/10; theta <= 2 * Math.PI; theta += Math.PI/5){
        if(points.length > 0) points += ', ';
        points += (props.center.x + props.radius * Math.cos(theta)) +
                    ', ' +
                (props.center.y - props.radius * Math.sin(theta));
    }
    let rotation = Math.random();
    return(
        <polygon points={points} 
                 className={props.className}
                 style={{fill: props.fill, stroke: 'none'}}
                 transform={'rotate('+ rotation * 360 +', ' + props.center.x + ', ' + props.center.y + ')'}
        >
            <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from={rotation * 360 + " " + props.center.x + ' ' + props.center.y}
                          to={(360 * (1 + rotation)) + " " + props.center.x + ' ' + props.center.y}
                          dur={(props.index*50) + "s"}
                          repeatCount="indefinite"/>
        </polygon>
    )
}

export default HexagonComponent;