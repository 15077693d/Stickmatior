import React, { useState } from 'react';
import Stickman from '../components/stickman/stickman';
import Stick from '../components/stick/stick';
import Ring from '../components/ring/ring';
import Img from '../components/img/img';

const useNodes = () => {
    // without play
    const [nodeIds, setNodeIds] = useState([])
    // with play
    const [nodesPoints, setNodePoints] = useState(false)
    const addNodes = (domId, imageUrl = false) => {
        let newNodeIds = JSON.parse(JSON.stringify(nodeIds))
        const id = imageUrl ? `${domId}_${Date.now()}&${imageUrl}` : `${domId}_${Date.now()}`
        setNodeIds(newNodeIds.concat([id]))
    }
    const removeNode = (nodeId) => {
        setNodeIds(nodeIds.filter(nodeTargetId => nodeId !== nodeTargetId))
    }

    let nodes
    if (nodesPoints) {
        nodes = []
        for (let id in nodesPoints) {
            let playPoints = nodesPoints[id]
            if (playPoints !== undefined) {
                switch (id.split('_')[0]) {
                    case "stickman":
                        nodes.push(<Stickman key={id} id={id} playPoints={playPoints} removeNode={removeNode} />)
                        break
                    case "stick":
                        nodes.push(<Stick key={id} id={id} playPoints={playPoints} removeNode={removeNode} />)
                        break
                    case "ring":
                        nodes.push(<Ring key={id} id={id} playPoints={playPoints} removeNode={removeNode} />)
                        break
                    case "image":
                        nodes.push(<Img key={id} id={id} playPoints={playPoints} removeNode={removeNode} />)
                        break
                    default:
                        nodes.push(null)
                        break
                }
            }
        }
    } else {
        nodes = nodeIds.map(id => {
            switch (id.split('_')[0]) {
                case "stickman":
                    return <Stickman key={id} id={id} removeNode={removeNode} />
                case "stick":
                    return <Stick key={id} id={id} removeNode={removeNode} />
                case "ring":
                    return <Ring key={id} id={id} removeNode={removeNode} />
                case "image":
                    let url = id.split('&')[1]
                    return <Img key={id} id={id} url={url} removeNode={removeNode} />
                default:
                    return null
            }
        })
    }
    return {
        nodes: nodes,
        addNodes: addNodes,
        setNodePoints: setNodePoints
    };
}

export default useNodes;