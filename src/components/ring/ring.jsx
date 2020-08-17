import React, { useState, useEffect } from 'react';
import { Circle, Group } from 'react-konva';
import { getPointsAfterMove, getPointAfterRotate } from '../../model'
import usePoints from '../../hooks/usePoints';

const Ring = ({ centerPt, length, radius, strokeWidth }) => {
    const { active,setActive,points, editPoints, addFrames, playFrames } = usePoints({
        "center": [centerPt[0], centerPt[1] - length],
        "point1": centerPt,
    })
    const { center, point1 } = points
    const stageElement = document.getElementById('stage')

    const init = (e) => {
        const activePoint = e.target.attrs.id
        setActive(activePoint)
    }

    const handleMouseMove = async (e) => {
        switch (active) {
            case "center":
                await editPoints(getPointAfterRotate(e, point1, center, 'center'))
                break;
            case "point1":
                await editPoints(getPointsAfterMove(e, points, active))
                break;
            default:
                break;
        }
    }

    const handleMouseUp = () => {
        setActive("")
        stageElement.removeEventListener('mousemove', handleMouseMove)
        stageElement.removeEventListener('mouseup', handleMouseUp)
    }

    useEffect(() => {
        document.getElementById('save').addEventListener('click', addFrames)
        document.getElementById('play').addEventListener('click', playFrames)
        return () => {
            document.getElementById('save').removeEventListener('click', addFrames)
            document.getElementById('play').removeEventListener('click', playFrames)
        }
    })

    useEffect(() => {
        if (active !== "") {
            stageElement.addEventListener('mouseup', handleMouseUp)
            stageElement.addEventListener('mousemove', handleMouseMove)
        }
    }, [active])


    return (
        <Group>
            <Circle
                id="center"
                radius={length}
                fillEnabled={false}
                strokeWidth={strokeWidth}
                stroke="black"
                x={center[0]}
                y={center[1]}
                onMouseDown={init}
            />
            <Circle
                id="point1"
                radius={radius}
                x={point1[0]}
                y={point1[1]}
                fill="yellow"
                onMouseDown={init}
            />
        </Group>
    );
};

export default Ring;