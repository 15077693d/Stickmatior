import React from 'react';
import './panel.scss'
const Panel = () => {
    return (
        <div className="panel-container">
            <div className="panel">
                <input id="width" type="number" min={0} max={800} placeholder="width(px)" />
                <p className='tooltip width-tooltip'>Max:800px</p>
                <input id="height" type="number" min={0} max={640} placeholder="height(px)" />
                <p className='tooltip height-tooltip'>Max:640px</p>
                <button id="play">play</button>
                <button id="save">save</button>
                <button id="stick">stick</button>
                <button id="ring">ring</button>
                <button id="stickman">man</button>
                <button ><label htmlFor="image">image</label></button>
                <input type="file" id="image" />
            </div>
        </div>

    );
};

export default Panel;