import {useState} from 'react'

const usePoints = ([init,id]) => {
    const [points, setPoints] = useState(init)
    const baseFrames = []
    for(let i =0;i<parseInt(sessionStorage.getItem('numberOfFrames'));i++){
        baseFrames.push(false)
    }
    const [active,setActive] = useState("")
    return {
        active,
        points,
        editPoints(newPoints){
            let newAllPoints = JSON.parse(JSON.stringify(points))
            for (const name in newPoints){
                newAllPoints[name] = newPoints[name]
            }
            setPoints(newAllPoints)
        },
        addFrames(){
            let newFrames = JSON.parse(sessionStorage.getItem('frames'))
            if ( newFrames[id]){
                newFrames[id] =  newFrames[id].concat([points])
            }else{
                newFrames[id] =  baseFrames.concat([points])
            }
            sessionStorage.setItem('frames', JSON.stringify(newFrames));
        },
        setActive,
    }
}

export default usePoints;