import { getRad, getCartesianOriginRelativePoint, getPointByChangeOfRad, getDistance } from './util'

const getPointsAfterMove = (e, points, activeName) => {
    const stageElement = document.getElementById('stage')
    const x = points[activeName][0]
    const y = points[activeName][1]
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

const getPointAfterRotate = (e, points, rotateName, centerName) => {
    const [center, point] = [points[centerName], points[rotateName]]
    const stageElement = document.getElementById('stage')
    const client = [e.clientX - stageElement.offsetLeft, e.clientY - stageElement.offsetTop]
    const [cartesianPoint, clientCartesianPoint] = [getCartesianOriginRelativePoint(center, point), getCartesianOriginRelativePoint(center, client)]
    const baseRad = getRad(cartesianPoint)
    const changeOfRad = getRad(clientCartesianPoint) - baseRad
    const length = getDistance(center, point)
    const newPoint = getPointByChangeOfRad(changeOfRad, baseRad, center, length)
    return { [rotateName]: newPoint }
}


const getPointsAfterRotate = (e, points, flagName, centerName) => {
    let newPoints = {}
    const [center, flagPoint] = [points[centerName], points[flagName]]
    const stageElement = document.getElementById('stage')
    const client = [e.clientX - stageElement.offsetLeft, e.clientY - stageElement.offsetTop]
    let [cartesianPoint, clientCartesianPoint] = [getCartesianOriginRelativePoint(center, flagPoint), getCartesianOriginRelativePoint(center, client)]
    const baseRad = getRad(cartesianPoint)
    const changeOfRad = getRad(clientCartesianPoint) - baseRad
    let point;
    for (const name in points) {
        if (![centerName].includes(name)) {
            point = points[name]
            cartesianPoint = getCartesianOriginRelativePoint(center, point)
            const [baseRad, length] = [getRad(cartesianPoint), getDistance(center, point)]
            const newPoint = getPointByChangeOfRad(changeOfRad, baseRad, center, length)
            newPoints[name] = newPoint
        }
    }
    return newPoints
}



export {
    getPointsAfterMove, getPointAfterRotate, getPointsAfterRotate
}