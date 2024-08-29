import { Controller, useFormContext, useWatch } from "react-hook-form";

import { Comment, Error, NoteAddTwoTone, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  useMediaQuery
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";



import CategoriaCreatableSelect from "../create/CreatableSelectCategoria";
import CreatableSelectLinea from "../create/CreatableSelectLinea";
import MarcaCreatableSelect from "../create/CreatableSelectMarca";
import { useEffect } from "react";



export function FormUpdateProducto({ producto, }) {


  const {
    formState: { errors },
    control,
    setFocus,
    setValue,
    reset
  } = useFormContext();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();


  const {
    productos: { loading },
  } = useSelector((state) => {
    return state;
  });


  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));






  //const marcas = ListaMarcas(setLoadingMarca);
  const inputPropsText = {
    style: { textTransform: "uppercase" },
  };


  const categoria = useWatch({
    control,
    name: "categoria",
  });


  const datos_producto = useWatch({
    control,
    name: "datos_producto",
  });

  //console.log(categoria)



  return producto && (
    <Card elevation={4}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" variant="rounded" sx={{ height: 50, width: 50 }}>
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
            startIcon={<Save fontSize="large" />}
            variant="contained"
          >
            {loading ? "CARGANDO" : breakpoints_sm ? 'GUARDAR' : "GUARDAR"}
          </LoadingButton>
        }
        title={<b>Formulario Producto</b>}
        subheader={"CODIGO: " + producto?.codigo}
        titleTypographyProps={{
          variant: "h6",
          fontWeight: 'bold'
        }}
        subheaderTypographyProps={{
          variant: "body1"
        }}
      />
      <CardContent>
        <Divider>CATEGORIZACION</Divider>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
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
              padding={1}
              spacing={1}
              paddingLeft={5}
            >
              {categoria?.Atributos?.map(field => {
                if (field.filtrar) {
                  return (
                    <TextField
                      key={field.nombre}
                      id={`outlined-size-small-${field.nombre}`}
                      variant="outlined"
                      size="small"
                      type={field.tipo}
                      label={field.nombre}
                      defaultValue={datos_producto && datos_producto[field.nombre.toLowerCase()]}
                      onChange={(e) => {
                        setValue('datos_producto', {
                          ...datos_producto,
                          [field.nombre.toLowerCase()]: e.target.value
                        });
                      }}
                    />
                  )
                }
              })}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider>DATOS PRODUCTO</Divider>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {loading ? (
              <Skeleton height={50} />
            ) : (
              <Controller
                name="nombreProducto"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    focused
                    color="info"
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    size="small"
                    label="Nombre Producto"
                    variant="outlined"
                    type="text"
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={3} sm={2} md={3} lg={3} xl={3}>
            {loading ? (
              <Skeleton height={50} />
            ) : (
              <Controller
                name="iva"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    focused
                    color="info"
                    fullWidth
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    size="small"
                    label="IVA"
                    variant="outlined"
                    type="number"
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={9} sm={5} md={4} lg={4} xl={4}>
            {loading ? (
              <Skeleton height={50} />
            ) : (
              <Controller
                name="barras"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    label="Barras"
                    variant="outlined"
                    type="text"
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
            {loading ? (
              <Skeleton height={50} />
            ) : (
              <Controller
                name="presentacion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    onKeyPress={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    label="Presentacion"
                    variant="outlined"
                    type="text"
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {loading ? (
              <Skeleton height={150} />
            ) : (
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    label="Descripción del Articulo"
                    variant="outlined"
                    type="text"
                    error={errors && errors.descripcion}
                    helperText={errors && errors.descripcion?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Comment color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment:
                        errors && errors.descripcion ? (
                          <InputAdornment position="start">
                            <Error color="error" />
                          </InputAdornment>
                        ) : (
                          ""
                        ),
                    }}
                    inputProps={inputPropsText}
                  />
                )}
                name="descripcion"
                control={control}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>

    </Card>
  );
}

