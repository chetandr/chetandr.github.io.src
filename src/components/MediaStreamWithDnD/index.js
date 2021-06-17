import { DndProvider } from 'react-dnd';
import MediaStream from '../MediaStream';
import { TouchBackend } from 'react-dnd-touch-backend';
function MediaStreamWithDnD() {
	return (
		
		<DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
								<MediaStream />
							</DndProvider>
						
	);
}

export default MediaStreamWithDnD;
