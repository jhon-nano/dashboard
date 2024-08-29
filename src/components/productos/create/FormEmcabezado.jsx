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
            <Subheader sx={{ mb: 1 }}>
                <Box sx={{ border: 1, borderColor: grey[400], mb: 1 }}>




                    <CardHeader
                        subheader="Categorizacion del Producto"
                        subheaderTypographyProps={{
                            color: 'primary',
                            variant: 'button'
                        }}
                        sx={{
                            height: 25,
                            background: grey[400],
                            borderBottom: 1,
                            borderColor: grey[400],
                            marginBottom: 1
                        }}
                    />
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={1}
                        sx={{ padding: 1 }}
                    >

                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <CreatableSelectLinea loading={loading} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <CategoriaCreatableSelect loading={loading} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <MarcaCreatableSelect loading={loading} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Stack
                                direction={"row"}
                                padding={0}
                                spacing={1}
                                paddingLeft={5}
                            >
                                {categoria?.Atributos?.map(field => {
                                    if (field.filtrar) {
                                        return (
                                            <TextField
                                                key={field.nombre}
                                                id={`outlined-size-small-${field.id}`}
                                                variant="outlined"
                                                size="small"
                                                type={field.tipo}
                                                label={field.nombre}
                                                defaultValue={datos_producto?.[field.nombre.toLowerCase()]}
                                                onChange={(e) => {
                                                    setValue('datos_producto', {
                                                        ...datos_producto,
                                                        [field.nombre.toLowerCase()]: e.target.value.toLowerCase()
                                                    });
                                                }}
                                            />
                                        )
                                    }
                                })}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Subheader>

        </>
    )
}
