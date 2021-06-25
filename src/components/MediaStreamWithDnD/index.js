import { DndProvider } from 'react-dnd';
import MediaStream from '../MediaStream';
import { TouchBackend } from 'react-dnd-touch-backend';
function MediaStreamWithDnD(props) {
	return (
		
		<DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
								<MediaStream nextAction={props.nextAction}/>
							</DndProvider>
						
	);
}

MediaStreamWithDnD.defaultProps = {
	nextAction: () => {},
}

export default MediaStreamWithDnD;
