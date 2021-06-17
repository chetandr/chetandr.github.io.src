import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
const OverlayWindow =(props) => {
    return (
        <React.Fragment>
            <Grid container  style={{ height:"100vh"}}>
            <Grid item xs={12} className="translucent" style={{height:`${(100 - props.windowSize)/2}%`}}></Grid>
            <Grid item xs={12}  style={{height:`${props.windowSize}%`}}>
                <Grid container  style={{height:"100%"}}>
                    <Grid item xs={1} className="translucent">
                    </Grid>
                    <Grid item xs={10} className="window" style={{borderColor: props.borderColor}}>
                        <div className="windowCorner topLeftWindowCorner" style={{borderColor: props.borderColor}}></div>
                        <div className="windowCorner topRightWindowCorner" style={{borderColor: props.borderColor}}></div>
                        <div className="windowCorner bottomLeftWindowCorner" style={{borderColor: props.borderColor}}></div>
                        <div className="windowCorner bottomRightWindowCorner" style={{borderColor: props.borderColor}}></div>
                    </Grid>
                    <Grid item xs={1} className="translucent">
                    </Grid>
                </Grid>    
            </Grid>
            <Grid item xs={12} className="translucent" style={{height:`${(100 - props.windowSize)/2}%`}}></Grid>
            </Grid>
        </React.Fragment>
    )
    // return <Backdrop open={true}></Backdrop>
}
OverlayWindow.defaultProps = {
    windowSize: 15,
    borderColor : '#7EF424',
}

export default OverlayWindow;
