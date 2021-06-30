import { DndProvider } from "react-dnd";
import MediaStream from "../MediaStream";
import { TouchBackend } from "react-dnd-touch-backend";
import { LinearProgress } from "@material-ui/core";
function MediaStreamWithDnD(props) {
  if (props.side) {
    return (
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <MediaStream
          nextAction={props.nextAction}
          side={props.side}
          toggleWaiting={props.toggleWaiting}
          toggleOverlay={props.toggleOverlay}
          reset={props.reset}
        />
      </DndProvider>
    );
  } else {
    return <LinearProgress />;
  }
}

MediaStreamWithDnD.defaultProps = {
  nextAction: () => {},
  side: "",
};

export default MediaStreamWithDnD;
