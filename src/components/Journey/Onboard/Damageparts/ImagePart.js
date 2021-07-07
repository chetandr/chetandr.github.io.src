import React from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Circle, Image } from "react-konva";
import { carParts } from "./carparts";
import useImage from "use-image";
import { startCase, kebabCase } from "lodash";
import Check from "@material-ui/icons/Check";
const ImagePart = (props) => {
  const [image] = useImage(`/images/carparts/${props.damagePartSection}/${props.img}`);
  const [overlayImage] = useImage(
    `/images/carparts/overlays/${props.damagePartSection}/${props.img}`
  );
  
  const [selected, setSelected] = React.useState(false);
  const overlay = { x: props.x, y: props.y };
  // if(image) {
  //   console.log("IMAGEWIDTH",image.width)
  //   overlay.x += image.width / 2;
  //   overlay.y += image.height / 2;
  // }

  const handleClick = (type) => {
    props.handleSelection(startCase(props.type));
    // setSelected(!selected)
  };
  console.log(props.selected);
  return (
    <React.Fragment>
      <Image
        image={image}
        onClick={(e) => handleClick(startCase(props.type))}
        onTouchEnd={(e) => handleClick(startCase(props.type))}
        x={props.x}
        y={props.y}
        scaleX={props.scaleX}
        scaleY={props.scaleY}
        hue={255}
        key={kebabCase(props.type)}       
        
      />
      {props.selected && (
        <Image
          image={overlayImage}
          // onClick={(e) => props.handleSelection(e, startCase(props.type))}
          // onTouchEnd={(e) => props.handleSelection(e, startCase(props.type))}
          // filters={[Konva.Filters.HSV]}
          x={overlay.x}
          y={overlay.y}
          // scaleX={0.05}
          // scaleY={0.05}
          scaleX={props.scaleX}
          scaleY={props.scaleY}
          onClick={(e) => handleClick(startCase(props.type))}
          onTouchEnd={(e) => handleClick(startCase(props.type))}
          key={`${kebabCase(props.type)}-overlay`}  
          // hue={255}
        />
      )}

      {/* <Check></Check> */}
    </React.Fragment>
  );
};

export default ImagePart;
