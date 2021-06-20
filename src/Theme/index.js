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
			main: '#EDA03A',
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
		MuiCardMedia : {
			img : {
				borderTopLeftRadius : '16px',
				borderTopRightRadius : '16px'
			}
		}
	},
});

export default CSAItheme;
