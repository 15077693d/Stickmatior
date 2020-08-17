const center = (x = 0, y = 0,width,height) => {
    return [(width / 2) + x, (height / 2) + y]
}

const getAngleRad = (point, xM, yM) => {
    const [x, y] = point
    const mouseRelativeHeight = Math.abs(yM - y)
    const mouseRelativeWidth = Math.abs(xM - x)
    const angleRad = Math.atan(mouseRelativeHeight / mouseRelativeWidth)
    return angleRad
}

const getDistance = (point1, point2) => {
    return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5
}

const getRoots = (a, b, c) => {
    return [
        (-1 * b + (b ** 2 - 4 * a * c) ** 0.5) / (2 * a),
        (-1 * b - (b ** 2 - 4 * a * c) ** 0.5) / (2 * a)
    ]
}

const getSlope = (point1,point2) => {
    return (point2[1]-point1[1])/(point2[0]-point1[0])
}

const getPointWhenAline = (l1, l2,point1,point2)=>{
    const [x1,y1,x2,y2] = [].concat(point1,point2)
    const x3 = ((x2-x1)*(l1+l2)/l1)+x1
    const y3 = ((y2-y1)*(l1+l2)/l1)+y1
    return [x3,y3]
}

const getPointBylengthsAndPoints = (l3, l2, point1, point2, oldPoint3) => {
    const [x1,y1,x2,y2,oldX3,oldY3] = [].concat(point1,point2,oldPoint3)
    let c1 = (l3 ** 2 - l2 ** 2 - x1 ** 2 - y1 ** 2 + x2 ** 2 + y2 ** 2) / (-2 * y1 + 2 * y2)
    let c2 = (-2 * x1 + 2 * x2) / (-2 * y1 + 2 * y2)
    let a = 1 + c2 ** 2
    let b = -2 * c1 * c2 - 2 * x1 + 2 * y1 * c2
    let c = x1 ** 2 + y1 ** 2 + c1 ** 2 - 2 * y1 * c1 - l3 ** 2
    const x3a = getRoots(a, b, c)[1]
    const x3b = getRoots(a, b, c)[0]
    const y3a = c1 - c2 * x3a
    const y3b = c1 - c2 * x3b
    if (Math.abs(oldX3 - x3a) + Math.abs(oldY3 - y3a) > Math.abs(oldX3 - x3b) + Math.abs(oldY3 - y3b)) {
        return [x3b, y3b]
    } else {
        return [x3a, y3a]
    }
}

const getPointByMouseAndRad = (point, xM, yM, angleRad, length) => {
    const [x, y] = point
    const marginalX = Math.cos(angleRad) * length
    const marginalY = Math.sin(angleRad) * length
    if (x <= xM) {
        if (y >= yM) {
            return [x + marginalX, y - marginalY]
        } else {
            return [x + marginalX, y + marginalY]
        }
    } else {
        if (y >= yM) {
            return [x - marginalX, y - marginalY]
        } else {
            return [x - marginalX, y + marginalY]
        }
    }
}


export {
    getPointBylengthsAndPoints, getPointByMouseAndRad, getAngleRad, getDistance, center,getSlope,getPointWhenAline
}
