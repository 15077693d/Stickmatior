import React, { useEffect } from 'react';
import { Circle, Group } from 'react-konva';
import { getPointsAfterMove, getPointAfterRotate, getPointsAfterRotate } from '../../model'
import Joint from './joint';
import usePoints from '../../hooks/usePoints';
import useProperties from '../../hooks/useProperties';

const Stickman = ({ id, removeNode, playPoints }) => {
    const { properties } = useProperties()
    const { centerPt, length, strokeWidth, radius, radiusHead } = properties
    let { active, points, editPoints, addFrames, setActive } = usePoints(
        [{
            neck: [centerPt[0], centerPt[1] - length],
            center: [centerPt[0], centerPt[1]],
            bottom: [centerPt[0], centerPt[1] + length],
            head: [centerPt[0], centerPt[1] - length - radiusHead],
            lHand: [centerPt[0] - 2 * length, centerPt[1] - length],
            lElbow: [centerPt[0] - length, centerPt[1] - length],
            rHand: [centerPt[0] + 2 * length, centerPt[1] - length],
            rElbow: [centerPt[0] + length, centerPt[1] - length],
            lKnee: [centerPt[0] - length, centerPt[1] + length],
            lToe: [centerPt[0] - 2 * length, centerPt[1] + length],
            rKnee: [centerPt[0] + length, centerPt[1] + length],
            rToe: [centerPt[0] + 2 * length, centerPt[1] + length]
        }, id])
    if (playPoints) {
        points = playPoints
    }
    const { neck, center, bottom, head, lHand, lElbow, rHand, rElbow, lKnee, lToe, rKnee, rToe } = points
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
        const handleMouseMove =  (e) => {
            if (["head", "lHand", "rHand", "lToe", "rToe"].includes(active)) {
                const centerPointPair = {
                    head: "neck",
                    lHand: "lElbow",
                    rHand: "rElbow",
                    lToe: "lKnee",
                    rToe: "rKnee"
                }
                editPoints(getPointAfterRotate(e, points, active, centerPointPair[active]))
            } else
                if (["rElbow", "lElbow", "lKnee", "rKnee"].includes(active)) {
                    const pointPair = {
                        rElbow: {
                            point: 'rHand',
                            center: "neck"
                        },
                        lElbow: {
                            point: 'lHand',
                            center: "neck"
                        },
                        lKnee: {
                            point: 'lToe',
                            center: "bottom"
                        },
                        rKnee: {
                            point: 'rToe',
                            center: "bottom"
                        },
                    }
                    let pointName = pointPair[active].point
                    let centerName = pointPair[active].center
                    let selectedPoints = {
                        [active]: points[active],
                        [pointName]: points[pointName],
                        [centerName]: points[centerName]
                    }
                    editPoints(getPointsAfterRotate(e, selectedPoints, active, centerName))

                } else
                    if (["neck", "center"].includes(active)) {
                        const pointPair = {
                            neck: {
                                points: ["head", "lHand", "rHand", "rElbow", "lElbow"],
                                center: "center"
                            },
                            center: {
                                points: ["neck", "head", "lHand", "lElbow", "rHand", "rElbow"],
                                center: "bottom"
                            }
                        }
                        let centerName = pointPair[active].center
                        let selectedPoints = {
                            [active]: points[active],
                            [centerName]: points[centerName]
                        }
                        pointPair[active].points.forEach(name => {
                            selectedPoints[name] = points[name]
                        })
                        editPoints(getPointsAfterRotate(e, selectedPoints, active, pointPair[active].center))
                    } else
                        if (["bottom"].includes(active)) {
                            editPoints(getPointsAfterMove(e, points, active))
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
                id="head"
                radius={radiusHead}
                fillEnabled={false}
                strokeWidth={strokeWidth}
                stroke="black"
                x={head[0]}
                y={head[1]}
                onMouseDown={init}
            />
            {
                [[
                    {
                        id: "lArm1",
                        points: neck.concat(lElbow),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "lArm2",
                        points: lElbow.concat(lHand),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "neck1",
                        radius: radius,
                        fill: "orange",
                        x: neck[0],
                        y: neck[1],
                    }, {
                        id: "lElbow",
                        radius: radius,
                        fill: "orange",
                        x: lElbow[0],
                        y: lElbow[1],
                    }, {
                        id: "lHand",
                        radius: radius,
                        fill: "pink",
                        x: lHand[0],
                        y: lHand[1],
                    }
                ],
                [
                    {
                        id: "rArm1",
                        points: neck.concat(rElbow),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "rArm2",
                        points: rElbow.concat(rHand),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "neck2",
                        radius: radius,
                        fill: "orange",
                        x: neck[0],
                        y: neck[1],
                    }, {
                        id: "rElbow",
                        radius: radius,
                        fill: "orange",
                        x: rElbow[0],
                        y: rElbow[1],
                    }, {
                        id: "rHand",
                        radius: radius,
                        fill: "pink",
                        x: rHand[0],
                        y: rHand[1],
                    }
                ],
                [
                    {
                        id: "lLeg1",
                        points: bottom.concat(lKnee),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "lLeg2",
                        points: lKnee.concat(lToe),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "bottom1",
                        radius: radius,
                        fill: "blue",
                        x: bottom[0],
                        y: bottom[1],
                    }, {
                        id: "lKnee",
                        radius: radius,
                        fill: "orange",
                        x: lKnee[0],
                        y: lKnee[1],
                    }, {
                        id: "lToe",
                        radius: radius,
                        fill: "pink",
                        x: lToe[0],
                        y: lToe[1],
                    }
                ],
                [
                    {
                        id: "rLeg1",
                        points: bottom.concat(rKnee),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "rLeg2",
                        points: rKnee.concat(rToe),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "bottom1",
                        radius: radius,
                        fill: "blue",
                        x: bottom[0],
                        y: bottom[1],
                    }, {
                        id: "rKnee",
                        radius: radius,
                        fill: "orange",
                        x: rKnee[0],
                        y: rKnee[1],
                    }, {
                        id: "rToe",
                        radius: radius,
                        fill: "pink",
                        x: rToe[0],
                        y: rToe[1],
                    }
                ],
                [
                    {
                        id: "center1",
                        points: neck.concat(center),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "center2",
                        points: center.concat(bottom),
                        strokeWidth: strokeWidth,
                    }, {
                        id: "neck",
                        radius: radius,
                        fill: "orange",
                        x: neck[0],
                        y: neck[1],
                    }, {
                        id: "center",
                        radius: radius,
                        fill: "orange",
                        x: center[0],
                        y: center[1],
                    }, {
                        id: "bottom",
                        radius: radius,
                        fill: "blue",
                        x: bottom[0],
                        y: bottom[1],
                    }
                ]].map(joint => <Joint
                    joint={
                        joint
                    }
                    key={joint[0].id}
                    strokeWidth={strokeWidth}
                    radius={radius}
                    init={init}
                />)
            }
        </Group>
    )
}

export default Stickman;

