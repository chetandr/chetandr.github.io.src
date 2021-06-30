import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import React from 'react';
// import Hierarchy from './components/Hierarchy';
import { BrowserRouter as Router } from 'react-router-dom';
import SwipeButton from "./components/SwipeButton";
import { Suspense } from 'react';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
const Journey = React.lazy(() => import('./Journey'));
function App() {
	return (
		<I18nextProvider i18n={i18n}>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Suspense fallback={<div>Loading...</div>}>
							<Journey />
						</Suspense>
					</Route>
					<Route exact path='/swipe'>
						<SwipeButton />
					</Route>
					<Route exact path='/journey/:type/:sub/:step?'>
						<Suspense fallback={<div>Loading...</div>}>
							<Journey />
						</Suspense>
					</Route>
				</Switch>
				{/* <Switch>
				<Route path='/hierarchy' exact>
					<Hierarchy />
				</Route>
			</Switch> */}
			</Router>
		</I18nextProvider>
	);
}

export default App;
