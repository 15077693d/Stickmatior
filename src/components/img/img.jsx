import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';
const Img = ({id,url}) => {
    const [image]=useImage(url)
    return <Image id={id} image={image}/>
};
export default Img;