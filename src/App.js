import './App.css';

import { DndProvider } from 'react-dnd';
import MediaStream from './components/MediaStream';
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
	return (
		<DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
			<div className='App'>
				<header className='App-header'>
					<MediaStream />
				</header>
			</div>
		</DndProvider>
	);
}

export default App;
