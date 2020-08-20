
import React, { useEffect } from 'react';
import Paper from '../../components/paper/paper'
import Panel from '../../components/panel/panel'
import './main.scss'
import Frames from '../../components/frames/frames';
const Main = () => {
    useEffect(()=>{
        sessionStorage.setItem('numberOfFrames', '0');
        sessionStorage.setItem('frames', JSON.stringify({}));
    },[])
    return (
             <div className="main">
                <Panel/>
                <div className="paper-frames">
                    <Frames/>
                    <Paper/>
                </div>
            </div>
    );
};

export default Main;
