import React from 'react';
import { Button, Popover, OverlayTrigger, Form } from 'react-bootstrap';
import './panel.scss'
import useObject from '../../hooks/useObject'
const Panel = () => {
    const [panelProps, setPanelProps] = useObject({ projectName: "", format: "mp4", filename: "" })
    const { projectName, format, filename } = panelProps
    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">
                <input id="filename" type="text" value={filename} onChange={(e) => setPanelProps({ filename: e.target.value })} />
            </Popover.Title>
            <Popover.Content>
                <Form>
                    <Form.Group id="format">
                        {[".zip", ".mp4", '.mov', '.flv', '.avi', '.webm'].map(item => <Form.Check key={item} onClick={() => setPanelProps({ format: item })} checked={item.includes(format)} type="checkbox" label={item} />)}
                    </Form.Group>
                </Form>
                <i id="download-submit" className="fas fa-download"></i>
            </Popover.Content>
        </Popover>
    );
    return (
        <div className="panel-container">
            <div className="panel">
                <input id="name" type="text" placeholder="Project Name" onChange={(e) => setPanelProps({ projectName: e.target.value })} />
                <input id="fps" type="number" min={1} max={50} placeholder="FPS" />
                <input id="width" type="number" min={0} max={800} placeholder="width(px)" />
                <p className='message width-message'>Max:800px</p>
                <input id="height" type="number" min={0} max={640} placeholder="height(px)" />
                <p className='message height-message'>Max:640px</p>
                <button id="play">play</button>
                <button id="save">save</button>
                <button id="stick">stick</button>
                <button id="ring">ring</button>
                <button id="stickman">man</button>
                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                    <Button onClick={() => {
                        if (document.querySelector('.popover-body')) {
                            setPanelProps({ filename: "" })
                        } else {
                            if (filename === "" || filename === "Animation") {
                                if (projectName !== "") {
                                    setPanelProps({ filename: projectName })
                                } else
                                    if (filename === "") {
                                        setPanelProps({ filename: "Animation" })
                                    }
                            }
                        }

                    }} variant="primary" id="download">Download</Button>
                </OverlayTrigger>
                <button ><label htmlFor="image">image</label></button>
                <input type="file" id="image" />
            </div>
        </div>

    );
};

export default Panel;