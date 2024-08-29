import { Backdrop, Box, CircularProgress, LinearProgress, Typography, circularProgressClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BorderLinearProgress } from '../../styles/theme'
import { useSelector } from 'react-redux';

export default function BackdropLoading() {

    const {
        loading_pag, loading_pag_message 
    } = useSelector((state) => state.app);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            setProgress(0)
            clearInterval(timer);
        };
    }, []);




    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            transitionDuration={{ appear: 500, enter: 2000, exit: 500 }}
            open={loading_pag}
        >
            <Box
                sx={{
                    textTransform: "uppercase",
                    textAlign: "center",
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    fontFamily: "Monospace",
                }}
            >

                <Typography
                    component="div"
                    gutterBottom
                    variant="h6"
                    sx={{
                        color: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.primary.light
                                : theme.palette.primary.dark,
                        background: "white",
                        borderRadius: "5px",
                        padding: "5px",
                    }}
                >
                    <b>{loading_pag_message}</b>
                    <LinearProgress color="primary" sx={{ height: 20 }} />
                </Typography>
            </Box>
        </Backdrop>
    )
}
