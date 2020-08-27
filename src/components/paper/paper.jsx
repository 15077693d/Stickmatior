import React, { useEffect, useRef } from 'react';
import useObject from '../../hooks/useObject'
import { Stage, Layer, Rect } from 'react-konva';
import { downloadURL, post } from '../../util'
import './paper.scss'
import useNodes from '../../hooks/useNodes';
import Whammy from 'react-whammy'
const Paper = () => {
    const { nodes, addNodes, setNodePoints } = useNodes()
    const [widthHeightMillisecond, setWidthHeightMillisecond] = useObject({ width: 548, height: 470, millisecond: 500 })
    let { width, height, millisecond } = widthHeightMillisecond
    const stageRef = useRef(null)
    const play = (download) => {
        let encoder
        if (download) {
            encoder = new Whammy.Video(1000 / millisecond)
            millisecond = 0
        }
        let numberOfFrames = parseInt(sessionStorage.getItem('numberOfFrames'));
        let frames = JSON.parse(sessionStorage.getItem('frames'))
        if (numberOfFrames > 0) {
            for (let i = 0; i < numberOfFrames + 1; i++) {
                let frame = {}
                for (let id in frames) {
                    frame[id] = frames[id][i]
                }
                setTimeout(() => {
                    if (i === numberOfFrames) {
                        setNodePoints(false);
                        if (download) {
                            encoder.compile(false, (output) => {
                                post(output)
                            })
                        }
                    } else {
                        setNodePoints(frame); if (download) {
                            encoder.add(stageRef.current.toDataURL({
                                mimeType: "image/webp",
                            }));
                        }
                    }
                }, i * millisecond)
            }
        }
    }

    const addNodesPair = {
        stick: () => addNodes('stick'),
        ring: () => addNodes('ring'),
        stickman: () => addNodes('stickman'),
        image: (e) => { console.log(e.target.files.file); addNodes('image', URL.createObjectURL(e.target.files[0])); e.target.value = "" },
        width: (e) => {
            if (e.target.value < 801 && e.target.value) {
                setWidthHeightMillisecond({ width: parseInt(e.target.value) })
            }
        },
        height: (e) => {
            if (e.target.value < 641 && e.target.value) {
                setWidthHeightMillisecond({ height: parseInt(e.target.value) })
            }
        },
        save: () => {
            let numberOfFrames = parseInt(sessionStorage.getItem('numberOfFrames'));
            sessionStorage.setItem('numberOfFrames', numberOfFrames + 1);
        },
        play: () => play(false),
        fps: (e) => {
            if (e.target.value < 51 && e.target.value) {
                setWidthHeightMillisecond({ millisecond: parseInt(1000 / e.target.value) })
            }
        },
        download: () => {
            if (!document.querySelector('#download-submit')) {
                const callback = () => play(true)
                setTimeout(() => {
                    document.querySelector('#download-submit').removeEventListener('click', callback)
                    document.querySelector('#download-submit').addEventListener('click', callback)
                }, 100)
            }
        }
    }
    useEffect(() => {
        ["stick", "ring", "stickman", "save", 'play', 'download'].forEach(domId => {
            document.getElementById(domId).addEventListener('click', addNodesPair[domId])
        });
        ['image', 'width', 'height', 'fps'].forEach(domId => {
            document.getElementById(domId).addEventListener('change', addNodesPair[domId])
        });
        return () => {
            ["stick", "ring", "stickman", "save", 'play', 'download'].forEach(domId => {
                document.getElementById(domId).removeEventListener('click', addNodesPair[domId])
            });
            ['image', 'width', 'height', 'fps'].forEach(domId => {
                document.getElementById(domId).removeEventListener('change', addNodesPair[domId])
            });
        }
    })

    return (
        <div id="paper">
            <div style={{ width: width, height: height }} id="stage" >
                <Stage width={width} height={height} id="stage" ref={stageRef}>
                    <Layer>
                        <Rect width={width} height={height} fill="white" />
                        {nodes}
                    </Layer>
                </Stage>
            </div>
        </div>

    );
};

export default Paper;