import { Controller, useFormContext } from "react-hook-form";

import { Comment, Error } from "@mui/icons-material";
import {
  Box,
  CardHeader,
  Grid,
  InputAdornment,
  Skeleton,
  TextField
} from "@mui/material";
import { grey } from '@mui/material/colors';


import useConsecutivo from "../../../hooks/useConsecutivo";



export function FormCreateProducto() {


  const {
    formState: { errors },
    control,
    setFocus,
    setValue
  } = useFormContext();



  const { loading } = useConsecutivo(setValue, 'PRODUCTO');

  const inputPropsText = {
    style: { textTransform: "uppercase" },
  };









  return (<Box sx={{ border: 1, borderColor: grey[400], width: '100%' }}>
    <CardHeader
      subheader="Datos del Producto"
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
  </Box>
  );
}

