import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './App.css';

import { Route, Switch, useLocation, useParams } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
// import Hierarchy from './components/Hierarchy';
import MediaStream from './components/MediaStream';
import { BrowserRouter as Router } from 'react-router-dom';
import { TouchBackend } from 'react-dnd-touch-backend';
import Journey from './Journey';
import SwipeButton from "./components/SwipeButton";
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Journey />
				</Route>
				<Route exact path='/swipe'>
					<SwipeButton />
				</Route>
				<Route exact path='/journey/:type/:step'>
					<Journey />
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
