import React from 'react';
import { Circle, Line } from 'react-konva';
const Joint = ({joint,strokeWidth,radius,init}) =>{
     const body = []
     for (let i=0;i<joint.length;i++){
        if(i<2){
            body.push(
            <Line key={joint[i]["id"]}
                id={joint[i]["id"]}
                points={joint[i]["points"]}
                stroke="black"
                strokeWidth={strokeWidth}
                lineCap="round"
            />)
        }else{
            body.push(
              <Circle key={joint[i]["id"]}
                id={joint[i]["id"]}
                radius={radius}
                fill={joint[i]["fill"]}
                x={joint[i]["x"]}
                y={joint[i]["y"]}
                onMouseDown={init}
            />)
        }
     }

      return body
}
  
export default Joint;