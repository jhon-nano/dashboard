import { Header, Subheader } from '@mui-treasury/layout';
import { NoteAddTwoTone, SaveTwoTone } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Card, CardHeader, Grid, Stack, TextField, useMediaQuery } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form';
import CreatableSelectLinea from './CreatableSelectLinea';
import CategoriaCreatableSelect from './CreatableSelectCategoria';
import MarcaCreatableSelect from './CreatableSelectMarca';

export default function FormEmcabezadoCreateProducto({ loading }) {

    const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

    const { control, setValue } = useFormContext();

    const consecutivo = useWatch({
        control,
        name: "Consecutivo",
    });

    const categoria = useWatch({
        control,
        name: "categoria",
    });


    const datos_producto = useWatch({
        control,
        name: "datos_producto",
    });



    return (
        <>
            <Subheader sx={{ mb: 1 }}>
                <Card elevation={6} sx={{ border: 1 }} >
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" variant="rounded">
                                <NoteAddTwoTone color="primary" fontSize="large" />
                            </Avatar>
                        }
                        action={
                            <LoadingButton
                                color="primary"
                                type="submit"
                                size="large"
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveTwoTone fontSize="large" />}
                                variant="contained"
                            >
                                {loading ? "CARGANDO" : breakpoints_sm ? 'GUARDAR' : "GUARDAR"}
                            </LoadingButton>
                        }
                        title={<b>Formulario Producto</b>}
                        subheader={'PRODUCTO # ' + (consecutivo?.consecutivo + 1)}
                    />
                </Card>
            </Subheader>
      

        </>
    )
}
