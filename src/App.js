import './App.css';

import { Route, Switch, useLocation, useParams } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
// import Hierarchy from './components/Hierarchy';
import MediaStream from './components/MediaStream';
import { BrowserRouter as Router } from 'react-router-dom';
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<div className='App'>
						<header className='App-header'>
							<DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
								<MediaStream />
							</DndProvider>
						</header>
					</div>
				</Route>
			</Switch>
			{/* <Switch>
				<Route path='/hierarchy' exact>
					<Hierarchy />
				</Route>
			</Switch> */}
		</Router>
	);
}

export default App;
