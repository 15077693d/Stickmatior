import React, { Component } from 'react';
import { Circle, Group } from 'react-konva';
import { getPointsAfterMove, getPointAfterRotate, getPointsAfterRotate } from '../../model'
import Joint from '../joint/joint';


class Stickman extends Component {
    constructor(props) {
        super(props);
        const {centerPt,length,radiusHead} = this.props;
        this.state = {
            active: "",
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
            rToe: [centerPt[0] + 2 * length, centerPt[1] + length],
            frames:[]
        }

    }

    componentDidMount() {
        document.getElementById('save').addEventListener('click', () => this.save())
        document.getElementById('play').addEventListener('click', () => this.play())
    }
    
    save = () => {
        let frames = this.state.frames
        let frame = JSON.parse(JSON.stringify(this.state))
        delete frame['frames']
        delete frame['active']
        frames.push(frame)
        this.setState({
            frames: frames
        })
    }

    play = () => {
        for(let i =0; i<this.state.frames.length;i++){
            setTimeout(()=>{this.setState(this.state.frames[i])},this.props.millisecond*i)
        }
    }

    init = (e) => {
        const stageElement = document.getElementById('stage')
        const activePoint = e.target.attrs.id
        this.setState({
            active: activePoint
        }, () => {
            stageElement.addEventListener('mouseup', this.handleMouseUp)
            stageElement.addEventListener('mousemove', this.handleMouseMove)
        })
    }

    handleMouseMove = async (e) => {
        let {active,neck,center,bottom,head,lHand,lElbow,rHand,rElbow,lKnee,lToe,rKnee,rToe} = this.state
        if (["head", "lHand", "rHand", "lToe", "rToe"].includes(active)) {
            const centerPointPair = {
                head: "neck",
                lHand: "lElbow",
                rHand: "rElbow",
                lToe: "lKnee",
                rToe: "rKnee"
            }
            const activePointName = active
            const centerPointName = centerPointPair[activePointName]
            const centerPoint = this.state[centerPointName]
            const pointBeforeRotate = this.state[activePointName]
            const newActivePoint = getPointAfterRotate(e, centerPoint, pointBeforeRotate,activePointName)
            await this.setState(newActivePoint)
        } else
            if (["rElbow", "lElbow", "lKnee", "rKnee"].includes(active)) {
                let points;
                switch (active) {
                    case "lKnee":
                        points = getPointsAfterRotate(e, bottom, lKnee, lToe, "lKnee", "lToe")
                        break;
                    case "rKnee":
                        points = getPointsAfterRotate(e, bottom, rKnee, rToe, "rKnee", "rToe")
                        break;
                    case "lElbow":
                        points = getPointsAfterRotate(e, neck, lElbow, lHand, "lElbow", "lHand")
                        break;
                    case "rElbow":
                        points = getPointsAfterRotate(e, neck, rElbow, rHand, "rElbow", "rHand")
                        break;
                    default:
                        break;
                }
                await this.setState(points)
            } else
                if (["neck"].includes(active)) {
                    const neckHead = getPointsAfterRotate(e, center, neck, head, "neck", "head")
                    const neckLHand = getPointsAfterRotate(e, center, neck, lHand, "neck", "lHand")
                    const neckRHand = getPointsAfterRotate(e, center, neck, rHand, "neck", "rHand")
                    const neckRElbow = getPointsAfterRotate(e, center, neck, rElbow, "neck", "rElbow")
                    const neckLElbow = getPointsAfterRotate(e, center, neck, lElbow, "neck", "lElbow")
                    await this.setState({
                        neck: neckHead.neck,
                        head: neckHead.head,
                        lHand: neckLHand.lHand,
                        rHand: neckRHand.rHand,
                        rElbow: neckRElbow.rElbow,
                        lElbow: neckLElbow.lElbow
                    })
                } else
                    if (["center"].includes(active)) {
                        const centerNeck = getPointsAfterRotate(e, bottom, center, neck, "center", "neck")
                        const centerHead = getPointsAfterRotate(e, bottom, center, head, "center", "head")
                        const centerLHand = getPointsAfterRotate(e, bottom, center, lHand, "center", "lHand")
                        const centerLElbow = getPointsAfterRotate(e, bottom, center, lElbow, "center", "lElbow")
                        const centerRHand = getPointsAfterRotate(e, bottom, center, rHand, "center", "rHand")
                        const centerRElbow = getPointsAfterRotate(e, bottom, center, rElbow, "center", "rElbow")
                        await this.setState({
                            neck: centerNeck.neck,
                            center: centerNeck.center,
                            head: centerHead.head,
                            lHand: centerLHand.lHand,
                            lElbow: centerLElbow.lElbow,
                            rHand: centerRHand.rHand,
                            rElbow: centerRElbow.rElbow,
                        })
                    } else
                        if (["bottom"].includes(active)) {
                            const newState = getPointsAfterMove(e, this.state,['active','frames'])
                            await this.setState(newState)
                        }
    }

    handleMouseUp = () => {
        const stageElement = document.getElementById('stage')
        stageElement.removeEventListener('mousemove', this.handleMouseMove)
    }

    render() {
        const {radiusHead,strokeWidth,radius} = this.props
        const {neck,center,bottom,head,lHand,lElbow,rHand,rElbow,lKnee,lToe,rKnee,rToe} = this.state
        return (
            <Group>
                <Circle
                    id="head"
                    radius={radiusHead}
                    fillEnabled={false}
                    strokeWidth={strokeWidth}
                    stroke="black"
                    x={head[0]}
                    y={head[1]}
                    onMouseDown={this.init}
                />
                <Joint
                    joint={
                        [
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
                        ]
                    }
                    strokeWidth={strokeWidth}
                    radius={radius}
                    init={this.init}
                />
                <Joint
                    joint={
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
                        ]
                    }
                    strokeWidth={strokeWidth}
                    radius={radius}
                    init={this.init}
                />
                <Joint
                    joint={
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
                        ]
                    }
                    strokeWidth={strokeWidth}
                    radius={radius}
                    init={this.init}
                />
                <Joint
                    joint={
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
                        ]
                    }
                    strokeWidth={strokeWidth}
                    radius={radius}
                    init={this.init}
                />
                <Joint
                    joint={
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
                        ]
                    }
                    strokeWidth={strokeWidth}
                    radius={radius}
                    init={this.init}
                />
            </Group>
        )
    }
}

export default Stickman;