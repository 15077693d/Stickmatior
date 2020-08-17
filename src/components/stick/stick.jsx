import React, { Component } from 'react';
import { Group, Circle, Line } from 'react-konva';
import { getPointsAfterMove, getPointAfterRotate, getPointsAfterRotate } from '../../model'
class Stick extends Component {
    constructor(props) {
        super(props);
        const {centerPt,length} = this.props
        const  point1 = [centerPt[0],centerPt[1]-length]
        const  point2 = [centerPt[0],centerPt[1]]
        const  point3 = [centerPt[0],centerPt[1]+length]
        this.state = {
            active: "",
            point1: point1,
            point2: point2,
            point3: point3,
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


    handleMouseMove = async(e) => {
        const {point1,point2,point3,active} = this.state
        switch (active) {
            case "point1":
                const newState = getPointsAfterMove(e, this.state,['active','frames'])
                await this.setState(newState)
                break;
            case "point2":
                const points = getPointsAfterRotate(e, point1, point2, point3)
                await this.setState(points)
                break;
            case "point3":
                const newPoint3 = getPointAfterRotate(e, point2, point3,'point3')
                await this.setState(newPoint3)
                break;
            default:
                break;
        }
    }

    handleMouseUp = () => {
        const stageElement = document.getElementById('stage')
        stageElement.removeEventListener('mousemove', this.handleMouseMove)
    }

    render() {
        const {point1,point2,point3} = this.state
        const {strokeWidth,radius} = this.props
        return (
            <Group>
                <Line
                    id="part1"
                    points={point1.concat(point2)}
                    stroke="black"
                    strokeWidth={strokeWidth}
                    lineCap="round"
                />
                <Line
                    id="part2"
                    points={point2.concat(point3)}
                    stroke="black"
                    strokeWidth={strokeWidth}
                    lineCap="round"
                />
                <Circle
                    id="point1"
                    radius={radius}
                    fill="blue"
                    x={point1[0]}
                    y={point1[1]}
                    onMouseDown={this.init}
                />
                <Circle
                    id="point2"
                    radius={radius}
                    fill="orange"
                    x={point2[0]}
                    y={point2[1]}
                    onMouseDown={this.init}
                />
                <Circle
                    id="point3"
                    radius={radius}
                    fill="pink"
                    x={point3[0]}
                    y={point3[1]}
                    onMouseDown={this.init}
                />
            </Group>
        )
    }
}

export default Stick;