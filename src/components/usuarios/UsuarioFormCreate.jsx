import { ErrorTwoTone, GroupAddTwoTone, LooksOne, LooksOneTwoTone, SaveTwoTone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Card, CardContent, CardHeader, Checkbox, Chip, Divider, Grid, Grow, Icon, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import TypesModulos from '../../types/typesModulos';
import { useRouter } from 'next/router';



export default function UsuarioFormCreate() {

    const router = useRouter();

    const {
        formState: { errors },
        control,
        reset,
        setValue,
        setError,
    } = useFormContext();

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "modulos_new", // unique name for your Field Array

    });

    const typesModulos = useMemo(() => new TypesModulos(router), [router]);


    const handleCheckboxChange = (e) => {
        const exists = fields.some((element) => element.path === e.path);
        if (exists) {
            // Si existe, elimínalo
            const index = fields.findIndex((element) => element.path === e.path);
            remove(index);
        } else {
            // Si no existe, agrégalo
            append(e);
        }
    };

    const inputPropsText = {
        autoComplete: "off",
        style: { textTransform: "uppercase" },
    };

    return (
        <Card elevation={4} sx={{ minWidth: '80vh' }}>
            <CardHeader
                avatar={

                    <Avatar variant="rounded">
                        <GroupAddTwoTone color='primary' fontSize="large" />
                    </Avatar>


                }
                title={<b>Formulario Usuario</b>}
                subheader={
                    <Typography variant="caption" color={'error'}>
                        {'campos obligatorios *'}
                    </Typography>
                }
                action={
                    <LoadingButton
                        color="primary"
                        type="submit"
                        loading={false}
                        loadingPosition="start"
                        startIcon={<SaveTwoTone />}
                        variant="contained"
                    >
                        GUARDAR
                    </LoadingButton>
                }
            />
            <Divider />
            <CardContent sx={{ width: "100%" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                    sx={{ padding: 1 }}
                >
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} >

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    color="info"
                                    focused
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && e.preventDefault();
                                    }}
                                    fullWidth
                                    size="small"
                                    label="Username"
                                    variant="outlined"
                                    type="text"
                                    error={errors && errors.username}
                                    helperText={errors && errors.username?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LooksOneTwoTone color="primary" />
                                            </InputAdornment>
                                        ),
                                        endAdornment:
                                            errors && errors.username ? (
                                                <InputAdornment position="start">
                                                    <ErrorTwoTone color="error" />
                                                </InputAdornment>
                                            ) : (
                                                ""
                                            ),
                                    }}
                                    inputProps={{
                                        ...inputPropsText,
                                        "data-testid": "sub",
                                    }}
                                />
                            )}
                            name="username"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Esta entrada es Obligatoria.",
                                },
                                //pattern: {
                                //  value: /^[A-Za-z]+$/i,
                                //  message: "El campo no debe tener numeros",
                                //},
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8} xl={8} >

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    color="info"
                                    focused
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && e.preventDefault();
                                    }}
                                    fullWidth
                                    size="small"
                                    label="Nombre Usuario"
                                    variant="outlined"
                                    type="text"
                                    error={errors && errors.nombreUsuario}
                                    helperText={errors && errors.nombreUsuario?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LooksOneTwoTone color="primary" />
                                            </InputAdornment>
                                        ),
                                        endAdornment:
                                            errors && errors.nombreUsuario ? (
                                                <InputAdornment position="start">
                                                    <ErrorTwoTone color="error" />
                                                </InputAdornment>
                                            ) : (
                                                ""
                                            ),
                                    }}
                                    inputProps={{
                                        ...inputPropsText,
                                        "data-testid": "nombreUsuario",
                                    }}
                                />
                            )}
                            name="nombreUsuario"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Esta entrada es Obligatoria.",
                                },
                                //pattern: {
                                //  value: /^[A-Za-z]+$/i,
                                //  message: "El campo no debe tener numeros",
                                //},
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >

                        <Controller
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    color="info"
                                    focused
                                    onKeyPress={(e) => {
                                        e.key === "Enter" && e.preventDefault();
                                    }}
                                    fullWidth
                                    size="small"
                                    label="Identificador"
                                    variant="outlined"
                                    type="text"
                                    error={errors && errors.sub}
                                    helperText={errors && errors.sub?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LooksOneTwoTone color="primary" />
                                            </InputAdornment>
                                        ),
                                        endAdornment:
                                            errors && errors.sub ? (
                                                <InputAdornment position="start">
                                                    <ErrorTwoTone color="error" />
                                                </InputAdornment>
                                            ) : (
                                                ""
                                            ),
                                    }}
                                    inputProps={{
                                        ...inputPropsText,
                                        "data-testid": "sub",
                                    }}
                                />
                            )}
                            name="sub"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Esta entrada es Obligatoria.",
                                },
                                //pattern: {
                                //  value: /^[A-Za-z]+$/i,
                                //  message: "El campo no debe tener numeros",
                                //},
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Divider>MODULOS</Divider>
                    </Grid>
                    {typesModulos?.getModulosAppAll()
                        .map((modu, i) => (
                            <Grid key={i} item >
                                <Grow
                                    in={true}
                                    style={{ transformOrigin: "0 0 0" }}
                                    {...(true ? { timeout: 500 * i } : {})}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        alignContent={"center"}

                                    >

                                        <Chip
                                            variant="outlined"
                                            color="primary"
                                            label={<b> {modu.nombreModulo}</b>}
                                            deleteIcon={
                                                <Checkbox
                                                    checked={fields.some((e) => e.path == modu.path)}
                                                    color="primary"
                                                    inputProps={{ "aria-label": modu.path }}
                                                />
                                            }
                                            onClick={(e) => handleCheckboxChange(modu)}
                                            onDelete={(e) => handleCheckboxChange(modu)}
                                            icon={
                                                <Icon color="secondary" >
                                                    {modu.icon}
                                                </Icon>
                                            }
                                        />
                                    </Stack>
                                </Grow>
                            </Grid>
                        ))}
                </Grid>
            </CardContent>
        </Card>
    )
}
