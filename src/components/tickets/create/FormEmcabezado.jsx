import { Subheader } from '@mui-treasury/layout';
import { SaveTwoTone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, CardHeader, useMediaQuery } from '@mui/material';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';


export default function FormEmcabezadoCreateTicket({ loading }) {

    const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const { control, setValue } = useFormContext();

    const consecutivo = useWatch({
        control,
        name: "Consecutivo",
    });
    const almacen = useWatch({
        control,
        name: "Almacen",
    });


    return (
        <>
            <Subheader sx={{ mb: 1 }}>
                <Card elevation={6} sx={{ border: 1 }} >
                    <CardHeader

                        action={
                            <LoadingButton
                                color="primary"
                                type="submit"
                                size="small"
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveTwoTone fontSize="large" />}
                                variant="contained"
                            >
                                {loading ? "CARGANDO" : breakpoints_sm ? 'GUARDAR' : "GUARDAR"}
                            </LoadingButton>
                        }
                        title={<b>{almacen?.tradeName}</b>}
                        titleTypographyProps={{
                            fontSize: 16
                        }}
                        subheader={'TICKET # ' + (consecutivo?.consecutivo + 1)}
                        subheaderTypographyProps={{

                            fontSize: 12

                        }}
                    />
                </Card>
            </Subheader>


        </>
    )
}
