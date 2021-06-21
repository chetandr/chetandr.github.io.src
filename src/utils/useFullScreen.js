import React from 'react';

export default function useFullscreen(elRef) {
	const [isFullscreen, setIsFullscreen] = React.useState(document[getBrowserFullscreenElementProp()] != null);

	const setFullscreen = () => {
		console.log(elRef.current);
		if (elRef.current == null) return;
		elRef.current
			.requestFullscreen()
			.then(() => {
				console.log(document[getBrowserFullscreenElementProp()]);
				setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
			})
			.catch((e) => {
				console.log('Full screen error', e.message);
				setIsFullscreen(false);
			});
	};

	const exitFullscreen = () => {
		if (document.fullscreenElement !== null) {
			if (document && document.exitFullscreen) {
				console.log('exitFullscreen', exitFullscreen);
				document.exitFullscreen();
			} else if (document && document.webkitExitFullscreen) {
				/* Safari */
				document.webkitExitFullscreen();
			} else if (document && document.msExitFullscreen) {
				/* IE11 */
				document.msExitFullscreen();
			}
		}
	};

	React.useLayoutEffect(() => {
		document.onfullscreenchange = () => setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

		return () => (document.onfullscreenchange = undefined);
	});

	return [isFullscreen, setFullscreen, exitFullscreen];
}

function getBrowserFullscreenElementProp() {
	if (typeof document.fullscreenElement !== 'undefined') {
		return 'fullscreenElement';
	} else if (typeof document.mozFullScreenElement !== 'undefined') {
		return 'mozFullScreenElement';
	} else if (typeof document.msFullscreenElement !== 'undefined') {
		return 'msFullscreenElement';
	} else if (typeof document.webkitFullscreenElement !== 'undefined') {
		return 'webkitFullscreenElement';
	} else {
		throw new Error('fullscreenElement is not supported by this browser');
	}
}
