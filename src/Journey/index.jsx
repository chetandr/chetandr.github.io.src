import React from 'react';

import * as JourneyModule from '../components/Journey';

import { mockJourney } from '../mockconfig/journey1';

import CSAItheme from '../Theme';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import findIndex from 'lodash/findIndex';
import startCase from 'lodash/startCase';
// import { useRouter } from 'next/router';
import { useParams, useHistory } from 'react-router-dom';
const getComposed = ({ type, step, push, prevIndex, currentIndex, nextIndex }) => {
	let Component = [];

	const nextAction = () => {
		const href = `/journey/${mockJourney[nextIndex].type}/${mockJourney[nextIndex].step}`;
		push(href);
	};
	console.log('Module', startCase(type), startCase(step).split(' ').join(''));
	if (type) {
		const newComponent = React.createElement(JourneyModule[startCase(type)][startCase(step)].default, {
			nextAction,
		});
		Component.push(newComponent);
	}
	return Component;
};

const getCurrentAndNext = (type, step) => {
	console.log(type, step);

	// findIndex(mockJourney, (mj:StepData) => mj.type === type && mj.step == step);
	const currentIndex = findIndex(
		mockJourney,
		(mj) => mj.type.toLowerCase() === type.toLowerCase() && mj.step.toLowerCase() === step.toLowerCase(),
	);
	const prevIndex = currentIndex - 1;
	const nextIndex = currentIndex + 1;
	return [prevIndex, currentIndex, nextIndex];
};

const Journey = () => {
	// const router = useRouter();
	let { type, step } = useParams();
	if (!type && !step) {
		type = mockJourney[0].type;
		step = mockJourney[0].step;
	}
	const history = useHistory();
	const [prevIndex, currentIndex, nextIndex] = getCurrentAndNext(type, step);
	const currentAction = mockJourney[currentIndex];
	if (type && step) {
		return (
			<React.Fragment>
				<CssBaseline />
				<MuiThemeProvider theme={CSAItheme}>
					{currentAction.container ? (
						<Container>
							{type &&
								step &&
								getComposed({ type, step, push: history.push, prevIndex, currentIndex, nextIndex })}
						</Container>
					) : (
						type &&
						step &&
						getComposed({ type, step, push: history.push, prevIndex, currentIndex, nextIndex })
					)}
				</MuiThemeProvider>
			</React.Fragment>
		);
	} else {
		return <LinearProgress />;
	}
};

export default Journey;
