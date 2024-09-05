import React from "react";
// layout for this page
import { getContentBasedScheme } from "@mui-treasury/layout";
import { Grid, TextField } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useSnackbar } from "notistack";
import { Controller, FormProvider, useForm } from "react-hook-form";
import AlmacenesSelectDialog from "../../../components/almacenes/AlmacenesSelectDialog";
import FormEmcabezadoCreateTicket from "../../../components/tickets/create/FormEmcabezado";
import LayoutApp from "../../../layout/LayoutApp";



const scheme = getContentBasedScheme();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Title,
  Legend
);


function CreateTicket({ utilsAuth }) {


  const methods = useForm();


  const { handleSubmit, control, setError, formState: { errors } } = methods;
  const { enqueueSnackbar } = useSnackbar();





  const onError = (errors, e) => {
    for (const campo in errors) {
      if (errors.hasOwnProperty(campo)) {
        const errores = errors[campo];
        const mensaje = `Campo ${campo}: ${errores.message}`;
        // Utiliza notificacion para mostrar notificaciones
        enqueueSnackbar(mensaje, {
          variant: "warning",
        });
      }
    };
  }

  return (<FormProvider {...methods}>
    <AlmacenesSelectDialog codigo='TICKET'>
      <form onSubmit={handleSubmit(null, onError)}>
        <FormEmcabezadoCreateTicket />
        <Grid container padding={1} spacing={1}>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <Controller
              name="cantidad"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  focused
                  color="info"
                  fullWidth

                  error={errors && errors.cantidad}
                  helperText={errors && errors.cantidad?.message}
                  size="small"
                  label="CLIENTE"
                  variant="outlined"
                  type="text"
                />)}
              rules={{
                required: {
                  value: true,
                  message: "Esta entrada es Obligatoria.",
                },
                pattern: {
                  value: /^-?\d*\.?\d*$/, // Expresión regular para validar números decimales y negativos
                  message: "Por favor, introduce un número válido"
                },

              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <Controller
              name="cantidad"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  focused
                  color="info"
                  fullWidth

                  error={errors && errors.cantidad}
                  helperText={errors && errors.cantidad?.message}
                  size="small"
                  label="TELEFONO"
                  variant="outlined"
                  type="text"
                />)}
              rules={{
                required: {
                  value: true,
                  message: "Esta entrada es Obligatoria.",
                },
                pattern: {
                  value: /^-?\d*\.?\d*$/, // Expresión regular para validar números decimales y negativos
                  message: "Por favor, introduce un número válido"
                },

              }}
            />
          </Grid>
        </Grid>
      </form>
    </AlmacenesSelectDialog>
  </FormProvider>)
}

CreateTicket.getLayout = function getLayout(page) {

  return <LayoutApp {...page.props}  >{page}</LayoutApp>;
};


export default CreateTicket;