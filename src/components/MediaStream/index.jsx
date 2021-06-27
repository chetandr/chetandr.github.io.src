import React, { useEffect } from "react";
import { getMedia, getReso, getMD5 } from "./helper";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";

import DebugData from "../DebugData";
import { usePreview } from "react-dnd-preview";
// import Hierarchy from './components/Hierarchy';
import CaptureButton from "../CaptureButton";
import GeneratePresignedUrl$ from "../../APIConfig/GeneratePresignedUrl";
import UploadImageToS3$ from "../../APIConfig/UploadImageToS3";
import UpdateImageFileMetaDataArea$ from "../../APIConfig/UpdateImageFileMetaDataArea";
import CarDataContext from "../../CarDataContext";

import { S3Client } from "@aws-sdk/client-s3";
// or with ES6 modulesBinaryBitmap(new HybridBinarizer
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BitmapLuminanceSource,
  BinaryBitmap,
  BitSource,
  HybridBinarizer,
  PDF417Reader,
} from "@zxing/library";

const ItemTypes = {
  BOUNDARY: "boundry",
};

const MediaStream = (props) => {
  const debug = false;
  const videoRef = React.useRef();
  const videoWrapper = React.useRef();

  const imageRef = React.useRef();
  const thumbnail = React.useRef();
  const bboxWrapper = React.useRef();
  const canvasRef = React.useRef();
  const imageCanvasRef = React.useRef();
  const [currentBBox, setCurrentBBox] = React.useState();
  const downloadAnchor = React.useRef();
  const [mediaSettings, setMediaSettings] = React.useState({});
  const [debugData, setDebugData] = React.useState({});
  const [capturing, setCapturing] = React.useState(false);
  const [bboxProperties, setBboxProperties] = React.useState();
  const [stage, setStage] = React.useState("INIT");
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();
  const imageBboxRef = React.useRef();
  const [currentPosition, setCurrentPosition] = React.useState({ x: 0, y: 0 });
  const [dragInitPositionDiff, setDragInitPositionDiff] = React.useState({
    x: 0,
    y: 0,
  });
  let carData = React.useContext(CarDataContext);
  if (Object.keys(carData).length === 0 && carData.constructor === Object) {
    carData = {
      login: JSON.parse(sessionStorage.getItem("login")),
      geoLocation: JSON.parse(sessionStorage.getItem("geoLocation")),
    };
  }
  console.log("carData", carData);
  const [{ isDragging }, bbox] = useDrag(() => ({
    type: ItemTypes.BOUNDARY,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOUNDARY,
      drop: () => moveBox(currentBBox, currentPosition, dragInitPositionDiff),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [currentPosition, dragInitPositionDiff, currentBBox]
  );
  const moveBox = (cbbox, cp, diff) => {
    const x = cp.x - diff.x;
    const y = cp.y - diff.y;
    console.log(cbbox, cp, diff);
    const rbox = cbbox.current.getClientRects();
    const x1 = x + rbox[0].width;
    const y1 = y + rbox[0].height;
    cbbox.current.style.left = `${x}px`;
    cbbox.current.style.top = `${y}px`;
    const newBboxProperties = {
      ...bboxProperties,
      [cbbox.current.id]: [
        { x, y },
        { x: x1, y: y1 },
      ],
    };
    setBboxProperties(newBboxProperties);
    // drag.current.left = `${currentPosition.x}px`;
    // drag.current.top = `${currentPosition.y}px`;
  };
  const MyPreview = () => {
    const { display, itemType, item, style } = usePreview();
    if (!display) {
      return null;
    }
    return (
      <div className="boundingBoxWrapper" style={style}>
        <div className="boundingBox"></div>
      </div>
    );
  };

  const getTargetDimensions = React.useCallback(
    (ms) => {
      const videoWidth = ms.width;
      const videoHeight = ms.height;
      const toImgWidth = 1920;
      const toImgHeight = Math.floor((toImgWidth * videoHeight) / videoWidth);

      let toWidth = videoWrapper.current.offsetWidth;
      let toHeight = videoWrapper.current.offsetHeight;
      if (toWidth > toHeight) {
        toHeight = Math.floor((toWidth * videoHeight) / videoWidth);
      } else {
        toWidth = Math.floor((toHeight * videoWidth) / videoHeight);
      }
      const scaleRatioX = toWidth / videoWidth;
      const scaleRatioY = toHeight / videoHeight;
      const scaleImageX = toImgWidth / videoWidth;
      const scaleImageY = toImgHeight / videoHeight;
      let toX = 0;
      let toY = 0;
      if (toWidth > document.documentElement.clientWidth) {
        toX = -(toWidth - document.documentElement.clientWidth) / 2;
      }
      let toImgX = 0;
      let toImgY = 0;
      if (toWidth > document.documentElement.clientWidth) {
        toImgX = -(toImgWidth - document.documentElement.clientWidth) / 2;
      }

      return {
        videoWidth,
        videoHeight,
        toWidth,
        toHeight,
        toX,
        toY,
        scaleRatioX,
        scaleRatioY,
        toImgWidth,
        toImgHeight,
        toImgX,
        toImgY,
        scaleImageX,
        scaleImageY,
      };
    },
    [videoWrapper]
  );

  const renderMedia = React.useCallback(async () => {
    const media = await getMedia();
    // debugger;
    if (media && videoRef.current) {
      if ("srcObject" in videoRef.current) {
        videoRef.current.srcObject = media.stream;
      } else {
        videoRef.src = window.URL.createObjectURL(media.stream);
      }
      setMediaSettings(media.settings);
      const {
        videoWidth,
        videoHeight,
        toWidth,
        toHeight,
        toX,
        toY,
        scaleRatioX,
        scaleRatioY,
        toImgWidth,
        toImgHeight,
        toImgX,
        toImgY,
        scaleImageX,
        scaleImageY,
      } = getTargetDimensions(media.settings);

      videoRef.current.width = videoWidth;
      videoRef.current.height = videoHeight;
      imageRef.current.width = toImgWidth; //toImgWidth;
      imageRef.current.height = toImgHeight; //toImgHeight;
      if (toWidth < document.documentElement.clientWidth) {
        videoRef.current.style.transform = `translate(${-videoRef.current
          .offsetLeft}px, ${-videoRef.current
          .offsetTop}px) scale(${scaleRatioX}, ${scaleRatioY})`;
      } else {
        console.log(
          `translate(${-toX}px, ${-toY}px) scale(${scaleRatioX}, ${scaleRatioY})`
        );
        videoRef.current.style.transform = `translate(${toX}px, ${-videoRef
          .current.offsetTop}px) scale(${scaleRatioX}, ${scaleRatioY})`;
      }

      videoRef.current.style.transformOrigin = "top left";
      imageCanvasRef.current.width = toImgWidth; //;toImgWidth; //media.settings.width; //window.innerWidth;
      imageCanvasRef.current.height = toImgHeight; //; //media.settings.height; //window.innerHeight;
      const ctx = imageCanvasRef.current.getContext("2d");
      ctx.scale(scaleImageX, scaleImageY);
      imageCanvasRef.current.style.width = `${toWidth}px`;
      imageCanvasRef.current.style.height = `${toHeight}px`;
      const newDebugData = {
        video: `${videoWidth} x ${videoHeight} (${getReso(
          videoWidth,
          videoHeight
        )})`,
        scale: `${scaleRatioX} x ${scaleRatioY}`,
        media: `${media.settings.width} x ${media.settings.height}`,
        target: `${toWidth} x ${toHeight}`,
        targetXY: `${toX} x ${toY}`,
      };
      // setInterval(() => readBarcode(toWidth, toHeight), 2000)
      setDebugData(newDebugData);
    }
  }, [videoRef, videoWrapper, canvasRef, imageCanvasRef]);

  window.addEventListener("orientationchange", function (event) {
    renderMedia();
  });

  useEffect(async () => {
    renderMedia();
  }, [videoRef, videoWrapper, canvasRef, imageCanvasRef]);

  const captureImage = async () => {
    const {
      videoWidth,
      videoHeight,
      toWidth,
      toHeight,
      toX,
      toY,
      scaleRatioX,
      scaleRatioY,
      toImgWidth,
      toImgHeight
    } = getTargetDimensions(mediaSettings);

    const ctx = imageCanvasRef.current.getContext("2d");
    setCapturing(true);
    videoRef.current.pause();
    // videoRef.current.currentTime = 0;
    // ctx.scale(scaleRatioX, scaleRatioY);
    ctx.drawImage(videoRef.current, 0, 0);

    const url = imageCanvasRef.current.toDataURL("image/png");
    const imgData = ctx.getImageData(0, 0, toImgWidth, toImgHeight);
    const thumbWidth = 480;
    const ctxt = thumbnail.current.getContext("2d");
    thumbnail.current.width = thumbWidth; //imageCanvasRef.current.width;
    thumbnail.current.height = thumbnail.current.width / 1.7;
    ctxt.scale(
      thumbWidth / imageCanvasRef.current.width,
      thumbWidth / 1.7 / imageCanvasRef.current.height
    );
    ctxt.drawImage(videoRef.current, 2, 0);
    const thumbnailUrl = thumbnail.current.toDataURL("image/png");
    downloadAnchor.current.href = thumbnailUrl;
    downloadAnchor.current.download = 'MyPhoto.png';
    downloadAnchor.current.click();
    imageCanvasRef.current.toBlob(async (blob) => {
      // imageRef.current.style.display = "block";
      const [md5Data] = await getMD5(blob);
      console.log("BLOB", blob);
      if (props.toggleWaiting) {
        props.toggleWaiting();
      }
      GeneratePresignedUrl$(
        9994,
        carData.login.assessment_id,
        "b04d837c-3539-430e-b9ae-159dcbe1e96b",
        "PNG",
        md5Data
      ).subscribe((response) => {
        console.log("Uploading the Image to the URL ", response.data);
        //   const parsed = s3Client.URLParse(response.data.uploadUrl);
        try {
          UploadImageToS3$(
            response.data.uploadUrl,
            blob,
            md5Data,
            "image/png"
            // params
          ).subscribe((uploadResponse) => {
            if (uploadResponse.status === 200 && props.nextAction) {
              //  otp,assessmentId,deviceId,imageRequestId, gps, originalImageResolution,tags,uploadDone
              UpdateImageFileMetaDataArea$(
                9994,
                carData.login.assessment_id,
                "b04d837c-3539-430e-b9ae-159dcbe1e96b",
                response.data.id,
                carData.geoLocation,
                {
                  height: toImgHeight,
                  width: toImgWidth,
                },
                [
                  {
                    tag_type: "AREA",
                    value: props.side,
                  },
                ],
                true
              );
              props.nextAction({ ...response.data, thumbnail: thumbnailUrl });
            } else {
            }
          });
        } catch (e) {
          console.error("Error", e);
        }
      });
    });
    // setTimeout(() => setCapturing(false), 3000);
    setStage("CAPTURED");
  };

  const captureBox = () => {
    const videoWidth = mediaSettings.width;
    const videoHeight = mediaSettings.height;
    const toWidth = videoWrapper.current.offsetWidth; //document.documentElement.clientWidth; //window.innerWidth;
    const toHeight = Math.floor((toWidth * videoHeight) / videoWidth); //window.innerHeight;
    // const ratio = media.settings.aspectRatio;
    const scaleRatioY = toHeight / videoHeight;
    const scaleRatioX = toWidth / videoWidth;
    const ctx = imageCanvasRef.current.getContext("2d");
    ctx.lineWidth = "2";

    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#FFD600";

    ctx.fillRect(
      bboxWrapper.current.offsetLeft / scaleRatioX,
      bboxWrapper.current.offsetTop / scaleRatioY,
      bboxWrapper.current.offsetWidth / scaleRatioX,
      bboxWrapper.current.offsetHeight / scaleRatioY
    );
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#ff7300";
    ctx.stroke();
    setCapturing(true);
    // videoRef.current.pause();
    // videoRef.current.currentTime = 0;
    // // ctx.scale(scaleRatioX, scaleRatioY);
    // ctx.drawImage(videoRef.current, 0, 0);

    const url = imageCanvasRef.current.toDataURL("image/png");
    imageBboxRef.current.src = url;
    videoRef.current.style.display = "none";
    imageBboxRef.current.style.display = "block";
    imageRef.current.style.display = "none";
    // videoWrapper.current.style.oveflor ='auto';
    // imageRef.current.style.transform = `translate(${-videoRef.current.offsetLeft}px, ${-videoRef.current
    // .offsetTop}px) scale(${scaleRatioX}, ${scaleRatioY})`;
    imageBboxRef.current.style.transformOrigin = "top left";
    videoRef.current.style.display = "none";
    imageBboxRef.current.style.display = "block";
    // photo.current.setAttribute('src', url);
    // downloadAnchor.current.href = url;
    // downloadAnchor.current.download = 'MyPhoto.png';
    // downloadAnchor.current.click();
    // //
    // window.URL.revokeObjectURL(url);
    setTimeout(() => setCapturing(false), 3000);
    setStage("CAPTURED");
  };
  React.useEffect(() => {
    monitor.subscribeToOffsetChange(() => {
      const offset = monitor.getClientOffset();
      const initialClientOffset = monitor.getInitialClientOffset();
      const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
      if (initialClientOffset && initialSourceClientOffset) {
        setDragInitPositionDiff({
          x: initialClientOffset.x - initialSourceClientOffset.x,
          y: initialClientOffset.y - initialSourceClientOffset.y,
        });
        setCurrentPosition(offset);
      }

      // do stuff like setState, though consider directly updating style through refs for performance
    });
  }, [monitor]);
  const reset = () => {
    videoRef.current.style.display = "block";
    const ctx = imageCanvasRef.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      imageCanvasRef.current.width,
      imageCanvasRef.current.height
    );
    ctx.globalAlpha = 1;
    imageBboxRef.current.style.display = "none";
    imageRef.current.style.display = "none";
    videoRef.current.play();
    setStage("INIT");
  };
  console.log("DRAGGING", isDragging);
  return (
    <div ref={drop}>
      {debug && (
        <div id="debug">
          <DebugData debugData={debugData} />
        </div>
      )}
      <div
        ref={videoWrapper}
        className="videoWrapper"
        style={{ overflow: stage === "CAPTURED" ? "auto" : "hidden" }}
      >
        {/* <div ref={videoWrapper}> */}
        <video
          ref={videoRef}
          id="camvideo"
          autoPlay
          playsInline
          // onLoadedMetadata={metaDataLoadHandle}
          // style={{ display: 'none' }}
          // className="videosize"
          // style={{ border: "solid 2px red" }}
        ></video>
        <img
          ref={imageRef}
          style={{ border: "solid 2px red", display: "none" }}
        ></img>
        <img
          ref={imageBboxRef}
          style={{ border: "solid 2px red", display: "none" }}
        ></img>
      </div>

      <div style={{ position: "absolute" }}>
        <canvas
          ref={canvasRef}
          style={{ border: "solid 2px red", display: "none" }}
        ></canvas>
        <canvas
          ref={imageCanvasRef}
          style={{ border: "solid 2px green", display: "none" }}
        ></canvas>
        <canvas
          ref={thumbnail}
          style={{
            border: "solid 2px orange",
            position: "absolute",
            bottom: "10px",
            zIndex: "1000",
            display: "none",
          }}
        ></canvas>
      </div>
      <a
        id="downloadAnchor"
        href="http://chetandr.github.com"
        ref={downloadAnchor}
        style={{ display: "none" }}
      >
        image
      </a>
      {stage === "BBOX" && (
        <div
          className="boundingBoxWrapper"
          id="bbox"
          ref={bboxWrapper}
          onTouchStart={() => setCurrentBBox(bboxWrapper)}
          onMouseDown={() => setCurrentBBox(bboxWrapper)}
          style={{ opacity: isDragging ? 0 : 1 }}
        >
          <div
            className="boundingBox"
            ref={bbox}
            style={{
              cursor: "move",
              display: "inline-block",
            }}
          ></div>
        </div>
      )}
      <a
        id="downloadAnchor"
        href="http://chetandr.github.com"
        ref={downloadAnchor}
        style={{ display: "none" }}
      >
        image
      </a>
      <MyPreview />
      <CaptureButton onClick={captureImage} />
    </div>
  );
};

MediaStream.defaultProps = {
  nextAction: () => {},
  side: "",
};
export default MediaStream;
