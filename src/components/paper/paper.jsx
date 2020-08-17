import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import './paper.scss'
import { center } from '../../util'
import Stickman from '../stickman/stickman';
import Stick from '../stick/stick';
import Ring from '../ring/ring';

class Paper extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nodeIds: ["stickman1"],
            width: 548,
            height: 470,
            length: 50,
            radiusHead: 35,
            millisecond:100
        }
    }

    render() {
        const {nodeIds,width,height,length,radiusHead,millisecond} = this.state
        const nodes = nodeIds.map(
            id => <Stickman
                key={id}
                id={id}
                length={length}
                centerPt={center(0, 0, width, height)}
                radiusHead={radiusHead}
                strokeWidth={7}
                radius={3.5}
                millisecond={millisecond}
            />)
        return (
            <div>
                <button id="save">save</button>
                <button id="play">play</button>
                <div id="stage">
                    <Stage width={width} height={height}>
                        <Layer>
                            {/* <Stick 
                                   millisecond={millisecond}
                                   centerPt={center(0, 0, width, height)}
                                   length={length}
                                   strokeWidth={7}
                                   radius={3.5}
                                   /> */}
                            <Ring
                                millisecond={millisecond}
                                centerPt={center(0, 0, width, height)}
                                length={length}
                                radius={3.5}
                                strokeWidth={7}
                            />
                            {/* {nodes} */}
                        </Layer>
                    </Stage>
                </div>
            </div>
        )
    }
}

export default Paper;