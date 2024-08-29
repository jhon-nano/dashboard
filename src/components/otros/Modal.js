import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export default function Modal({ children, open, onClose, fullScreen, maxWidth, sx, fullWidth }) {

    return ReactDOM.createPortal(
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            fullScreen={fullScreen}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            sx={{
            
                zIndex: 1300,
                ...sx,
            }}
            keepMounted
            
        >
            {children}
        </Dialog>,
        document.getElementById('modal')
    );
}

