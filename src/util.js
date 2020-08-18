const center = (x = 0, y = 0, width, height) => {
    return [(width / 2) + x, (height / 2) + y]
}


const getDistance = (point1, point2) => {
    return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5
}

const getCartesianOriginRelativePoint = (center,point) => {
    const [minusX, minusY] = center
    const [x,y] = point
    let cartesianX, cartesianY
    cartesianX=x-minusX
    cartesianY=-1*(y-minusY)
    return [cartesianX,cartesianY]
}

const getRad = (cartesianPoint) => {
    const [x,y] = cartesianPoint
    let rad =  Math.atan2(y,x)
    if (rad<0){
        rad+=Math.PI*2
    }
    return rad
}

const getPointByChangeOfRad = (changeOfRad,baseRad,center,length) => {
    const [centerX,centerY] = center
    const newRad = baseRad+changeOfRad
    const newCartesianX = length*Math.cos(newRad) 
    const newCartesianY = length*Math.sin(newRad)
    const newY = centerY + -1*newCartesianY
    const newX = centerX + newCartesianX
    return [newX,newY]
}

export { getDistance, center, getCartesianOriginRelativePoint,getRad,getPointByChangeOfRad }
