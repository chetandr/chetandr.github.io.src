import { ThemeOptions, createMuiTheme } from '@material-ui/core/styles';

const CSAItheme = createMuiTheme({
	typography: {
		fontFamily: [
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	palette: {
		primary: {
			main: '#EE1B2E',
		},
		secondary: {
			main: 'rgb(126, 244, 36)',
		},
	},
	overrides: {
		MuiButton : {
			textSecondary: {
				color: '#FFF',
			},
		},
	},
});

export default CSAItheme;
