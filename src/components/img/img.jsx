import React,{useEffect} from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';
import usePoints from '../../hooks/usePoints';
import { getPointsAfterMove } from '../../model'
const Img = ({ id, removeNode, playPoints }) => {
    let {  points, editPoints, addFrames  } = usePoints(
        [{
            topLeft:[0,0]
        }, id])
    if (playPoints) {
        points = playPoints
    }
    const [x,y] = points.topLeft
    const [image] = useImage(id.split('&')[1])
    const stageElement = document.getElementById('stage')
    const init = () => {
        stageElement.addEventListener('mouseup', handleMouseUp)
        stageElement.addEventListener('mousemove', handleMouseMove)
    }
    const handleMouseMove = (e) => {
        let newPoints = getPointsAfterMove(e, points, "topLeft")
        newPoints.topLeft[0]-=image.width/2
        newPoints.topLeft[1]-=image.height/2
        editPoints(newPoints)
        }
    const handleMouseUp = () => {
        stageElement.removeEventListener('mousemove', handleMouseMove)
        stageElement.removeEventListener('mouseup', handleMouseUp)
    }
    useEffect(() => {
        document.getElementById('save').addEventListener('click', addFrames)
        return () => {
            document.getElementById('save').removeEventListener('click', addFrames)
        }
    })
    if (points === false || playPoints === false) {
        return null
    }
    return <Image x={x} y={y} onDblClick={() => removeNode(id)} id={id} image={image} onMouseDown={init}/>
};
export default Img;