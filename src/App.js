import './App.css';

import { DndProvider, useDrag } from 'react-dnd';

import Capture from './components/capture';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from "react-dnd-touch-backend"

function App() {
	return (
		<DndProvider backend={TouchBackend}>
			<div className='App'>
				<header className='App-header'>
					<Capture />
				</header>
			</div>
		</DndProvider>
	);
}

export default App;
