import { Divider,  Paper, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';


export default function DashboardCard({ icon: Icon, percentage, fecha, mensaje, totalActual, title, loading }) {
    return (
        <Stack component={Paper} padding={2} margin={1} elevation={5} width={200}>
            <Stack direction={'row'}>
                {Icon}
                <Stack marginLeft={1}>
                    {loading ? (
                        <>
                            <Skeleton height={50} />
                            <Skeleton height={50} />
                        </>
                    ) : (
                        <>
                            <Typography variant="button" fontSize={16}>
                                {percentage}
                            </Typography>
                            <Typography variant="caption" fontSize={10}>
                                {fecha}
                            </Typography>
                        </>
                    )}
                </Stack>
            </Stack>
            <Typography variant="caption" fontSize={10}>
                {mensaje}
            </Typography>
            <Divider />
            <Typography fontSize={18}>
                <b>{totalActual?.toLocaleString()}</b>
            </Typography>
            <Typography fontSize={16}>
                {title}
            </Typography>
        </Stack>
    )
}
