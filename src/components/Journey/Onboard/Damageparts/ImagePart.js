import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Circle, Image } from "react-konva";
import { carParts } from "./carparts";
import useImage from "use-image"

const ImagePart = (props) => {
    const [image] = useImage(`/images/carparts/exterior/${props.img}`);

    return  <Image
    image={image}
    onClick={(e) => props.handleSelection(e, "top")}
    onTouchEnd={(e) => props.handleSelection(e, "top")}
    filters={[Konva.Filters.HSV]}
    x={props.x}
    y={props.y}
    scaleX={.5}
    scaleY={.5}
  />
}

export default ImagePart;