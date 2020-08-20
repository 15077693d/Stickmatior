import {useState} from 'react';
import { center } from '../util'

const useProperties = () => {
    let stage = document.getElementById('stage')
    let [width,height] = [stage.offsetWidth, stage.offsetHeight]
    const [properties,setProperties] = useState({
        length: 50,
        radiusHead: 35,
        radius: 3.5,
        strokeWidth: 7,
        centerPt: center(0, 0, width, height),
    })
    return {
        properties:properties,
        setProperties:setProperties
    }
};

export default useProperties;