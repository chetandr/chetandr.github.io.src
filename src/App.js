import './App.css';

import Capture from './components/capture';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
	return (
		<DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
			<div className='App'>
				<header className='App-header'>
					<Capture />
				</header>
			</div>
		</DndProvider>
	);
}

export default App;
