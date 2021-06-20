import React from 'react';

import * as JourneyModule from '../components/Journey';

import { mockJourney } from '../mockconfig/journey1';

import CSAItheme from '../Theme';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import findIndex from 'lodash/findIndex';
import startCase from 'lodash/startCase';
// import { useRouter } from 'next/router';
import { useParams, useHistory } from 'react-router-dom';
import useFullscreen from '../utils/useFullScreen';
const getComposed = ({ type, step, push, prevIndex, currentIndex, nextIndex, setIsFullscreen, exitFullscreen }) => {
	let Component = [];

	const nextAction = (e) => {
		const href = `/journey/${mockJourney[nextIndex].type}/${mockJourney[nextIndex].step}`;
		console.log("nextAction",mockJourney[nextIndex].type.toLowerCase())
		if (mockJourney[nextIndex].type.toLowerCase() === 'inspection') {
			setIsFullscreen();
		} else {
			exitFullscreen();
		}
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
	const container = React.useRef();
	let { type, step } = useParams();
	let isFullscreen, setIsFullscreen, exitFullscreen;
	if (!type && !step) {
		type = mockJourney[0].type;
		step = mockJourney[0].step;
	}
	try {
		[isFullscreen, setIsFullscreen, exitFullscreen] = useFullscreen(container);
	} catch (e) {
		console.log('Fullscreen not supported');
		isFullscreen = false;
		setIsFullscreen = undefined;
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
								getComposed({ type, step, push: history.push, prevIndex, currentIndex, nextIndex, setIsFullscreen, exitFullscreen })}
						</Container>
					) : (
						type &&
						step && (
							<Box ref={container}>
								{getComposed({
									type,
									step,
									push: history.push,
									prevIndex,
									currentIndex,
									nextIndex,
									setIsFullscreen,
									exitFullscreen
								})}
							</Box>
						)
					)}
				</MuiThemeProvider>
			</React.Fragment>
		);
	} else {
		return <LinearProgress />;
	}
};

export default Journey;
