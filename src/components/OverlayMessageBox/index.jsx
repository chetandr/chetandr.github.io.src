import Styled from '@material-ui/core/styles/styled';
import Box from '@material-ui/core/Box';

const OverlayMessageBox = Styled(Box)({
	position: 'relative',
	// margin: 16,
	width: '100%',
	textAlign: 'center',
	color: '#fff',
	zIndex: 2002,
	backgroundColor: '#000',
	maxSize: '640px',
    borderRadius: '8px'
});

export default OverlayMessageBox;
