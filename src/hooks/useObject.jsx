import React, { useState } from 'react';

const useObject = (init) => {
    const [object, setObject] = useState(init)
    const update = (theObject) => {
        let newObject = JSON.parse(JSON.stringify(object))
        for(let key in theObject){
            newObject[key] = theObject[key]
        }
        
        setObject(newObject)
    }
    return [object,update]
};

export default useObject;