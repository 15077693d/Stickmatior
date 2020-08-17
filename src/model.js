import { getPointBylengthsAndPoints, getPointByMouseAndRad, getAngleRad, getDistance, getPointWhenAline, getSlope } from './util'
const getPointsAfterMove = (e, points,activePointName) => {
    const stageElement = document.getElementById('stage')
    const x = points[activePointName][0]
    const y = points[activePointName][1]
    const xM = e.clientX - stageElement.offsetLeft
    const yM = e.clientY - stageElement.offsetTop
    const marginalX = xM - x
    const marginalY = y - yM
    for (const props in points) {
            points[props][0] += marginalX
            points[props][1] -= marginalY
    }
    return points
}

const getPointAfterRotate =  (e, centerPoint,pointBeforeRotate,nameRotate) => {
    const stageElement = document.getElementById('stage')
    const xM = e.clientX - stageElement.offsetLeft
    const yM = e.clientY - stageElement.offsetTop
    const angleRad = getAngleRad(centerPoint, xM, yM)
    const length = getDistance(centerPoint, pointBeforeRotate)
    const pointAfterRotate = getPointByMouseAndRad(centerPoint, xM, yM, angleRad, length)
    return {[nameRotate]:pointAfterRotate}
}


const getPointsAfterRotate =  (e,point1,point2,point3,name2="point2",name3="point3") => {
    const stageElement = document.getElementById('stage')
    const xM = e.clientX - stageElement.offsetLeft
    const yM = e.clientY - stageElement.offsetTop
    const l3 = getDistance(point1, point3)
    const l2 = getDistance(point2, point3)
    const l1 = getDistance(point1, point2)
    const angleRad = getAngleRad(point1, xM, yM)
    const newPoint2 = getPointByMouseAndRad(point1, xM, yM, 
        angleRad, l1)
    if (newPoint2[1] === point1[1]) {
        newPoint2[1] += 0.1
    }
    let newPoint3
    if (getSlope(point1,point2)===getSlope(point2,point3)){
        newPoint3 = getPointWhenAline(l1, l2, point1, point2)
    }else{
         newPoint3 = getPointBylengthsAndPoints(l3, l2, point1, newPoint2, point3)
    }    
    return {
        [name2]:newPoint2,
        [name3]:newPoint3
    }
}



export {
    getPointsAfterMove,getPointAfterRotate,getPointsAfterRotate
}