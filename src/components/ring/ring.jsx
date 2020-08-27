import React, { useEffect } from 'react';
import { Circle, Group } from 'react-konva';
import { getPointsAfterMove, getPointAfterRotate } from '../../model'
import usePoints from '../../hooks/usePoints';
import useProperties from '../../hooks/useProperties';

const Ring = ({ id, removeNode, playPoints }) => {
    const { properties } = useProperties()
    const { centerPt, length, strokeWidth, radius } = properties
    let { active, points, setActive, editPoints, addFrames } = usePoints([{
        center: [centerPt[0], centerPt[1] - length],
        point1: centerPt,
    }, id])
    let opacity = 1
    if (playPoints) {
        opacity = 0
        points = playPoints
    }
    const { center, point1 } = points
    const stageElement = document.getElementById('stage')
    const init = (e) => {
        const activePoint = e.target.attrs.id
        setActive(activePoint)
    }
    useEffect(() => {
        document.getElementById('save').addEventListener('click', addFrames)
        return () => {
            document.getElementById('save').removeEventListener('click', addFrames)
        }
    })
    useEffect(() => {
        const handleMouseMove = (e) => {
            switch (active) {
                case "center":
                    editPoints(getPointAfterRotate(e, points, 'center', 'point1'))
                    break;
                case "point1":
                    editPoints(getPointsAfterMove(e, points, active))
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
        if (active !== "") {
            stageElement.addEventListener('mouseup', handleMouseUp)
            stageElement.addEventListener('mousemove', handleMouseMove)
        }
    }, [active]) // eslint-disable-line react-hooks/exhaustive-deps
    if (points === false || playPoints === false) {
        return null
    }
    return (
        <Group onDblClick={() => removeNode(id)}>
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
                fill="blue"
                opacity={opacity}
                onMouseDown={init}
            />
        </Group>
    );
}

export default Ring;