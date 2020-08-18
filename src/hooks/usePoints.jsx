import {useState} from 'react'

const usePoints = (init) => {
    const [points, setPoints] = useState(init)
    const [frames, setFrames] = useState([])
    const [millisecond, setMillsecond] = useState(500)
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
            let newFrames = JSON.parse(JSON.stringify(frames))
            setFrames(newFrames.concat([JSON.parse(JSON.stringify(points))]))
        },
        playFrames(){
            for(let i =0;i<frames.length;i++){
                setTimeout(()=> {setPoints(frames[i])},millisecond*i)
            }
        },
        setActive,
        setMillsecond
    }
}

export default usePoints;