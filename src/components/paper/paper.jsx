import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import './paper.scss'
import useNodes from '../../hooks/useNodes';

const Paper = () => {
    const { nodes, addNodes, setNodePoints } = useNodes()
    const [widthHeightMillisecond, setWidthHeightMillisecond] = useState({ width: 548, height: 470, millisecond: 500 })
    const { width, height, millisecond } = widthHeightMillisecond
    const addNodesPair = {
        stick: () => addNodes('stick'),
        ring: () => addNodes('ring'),
        stickman: () => addNodes('stickman'),
        image: (e) => addNodes('image', URL.createObjectURL(e.target.files[0])),
        width: (e) => {
            if (e.target.value < 801 && e.target.value) {
                let newWidthHeightMillisecond = JSON.parse(JSON.stringify(widthHeightMillisecond))
                newWidthHeightMillisecond['width'] = parseInt(e.target.value)
                setWidthHeightMillisecond(newWidthHeightMillisecond)
            }
        },
        height: (e) => {
            if (e.target.value < 641 && e.target.value) {
                let newWidthHeightMillisecond = JSON.parse(JSON.stringify(widthHeightMillisecond))
                newWidthHeightMillisecond['height'] = parseInt(e.target.value)
                setWidthHeightMillisecond(newWidthHeightMillisecond)
            }
        },
        save: () => {
            let numberOfFrames = parseInt(sessionStorage.getItem('numberOfFrames'));
            sessionStorage.setItem('numberOfFrames', numberOfFrames + 1);
        },
        play: () => {
            let numberOfFrames = parseInt(sessionStorage.getItem('numberOfFrames'));
            let frames = JSON.parse(sessionStorage.getItem('frames'))
            for (let i = 0; i < numberOfFrames; i++) {
                let frame = {}
                for (let id in frames) {
                    frame[id] = frames[id][i]
                }
                setTimeout(() => {setNodePoints(frame);
                    if (i === numberOfFrames - 1) { setNodePoints(false) }
                }, i * millisecond)
            }
        }
    }
    useEffect(() => {
        ["stick", "ring", "stickman", "save", 'play'].forEach(domId => {
            document.getElementById(domId).addEventListener('click', addNodesPair[domId])
        });
        ['image', 'width', 'height'].forEach(domId => {
            document.getElementById(domId).addEventListener('change', addNodesPair[domId])
        });
        return () => {
            ["stick", "ring", "stickman", "save", 'play'].forEach(domId => {
                document.getElementById(domId).removeEventListener('click', addNodesPair[domId])
            });
            ['image', 'width', 'height'].forEach(domId => {
                document.getElementById(domId).removeEventListener('change', addNodesPair[domId])
            });
        }
    })

    return (
        <div id="paper">
            <div style={{ width: width, height: height }} id="stage">
                <Stage width={width} height={height}>
                    <Layer>
                        {nodes}
                    </Layer>
                </Stage>
            </div>
        </div>

    );
};

export default Paper;