import React, { useEffect, useMemo } from "react";
// layout for this page
import MaterialTable from "@material-table/core";
import { getContentBasedScheme } from "@mui-treasury/layout";
import { FormHelperText, Grid, TextField } from "@mui/material";
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
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import Select from "react-select";
import AlmacenesSelectDialog from "../../../components/almacenes/AlmacenesSelectDialog";
import FormEmcabezadoCreateTicket from "../../../components/tickets/create/FormEmcabezado";
import { useModelInventarioByAlmacenId } from "../../../hooks/models/useModelProducto";
import LayoutApp from "../../../layout/LayoutApp";
import TicketsHelpers from '../../../helpers/ticketsHelpers'
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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

  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();


  const methods = useForm();
  const { handleSubmit, control, setError, setValue, formState: { errors } } = methods;
  const { fields, append, update, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "items", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const helpersTickets = useMemo(() => new TicketsHelpers(dispatch, confirm, enqueueSnackbar, router), [ dispatch, confirm, enqueueSnackbar, router]);





  const almacen = useWatch({
    control,
    name: "Almacen",
  });



  const { inventarioAlmacen } = useModelInventarioByAlmacenId(almacen?.id)



  useEffect(() => {

    setValue('valor_total', fields.reduce((sum, item) => sum + (item.precio || 0), 0))

    return () => {
      setValue('valor_total', 0)
    }
  }, [fields])





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
      <form onSubmit={handleSubmit(helpersTickets.onSubmitCreateTicket, onError)}>

        <FormEmcabezadoCreateTicket />

        <Grid container padding={1} spacing={2}>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <FormHelperText id="helper-text-tipo-pedido">
              Forma de Pago *
            </FormHelperText>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "ANTICIPO", label: "ANTICIPO" },
                    { value: "ABONO", label: "ABONO" },
                    { value: "CANCELACION", label: "CANCELACION" }]}
                  placeholder="Forma Pago"
                  isSearchable={false}
                  isClearable={false}
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              )}
              control={control}
              name="forma_pago"
              defaultValue={{ value: "ANTICIPO", label: "ANTICIPO" }}
              rules={{
                required: {
                  value: true,
                  message: "Esta entrada es Obligatoria.",
                },
              }}
            />
          </Grid>



          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <Controller
              name="cliente"
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


              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <Controller
              name="telefono"
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


              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <FormHelperText>
              {'Lista de Productos del Almacen.'}
            </FormHelperText>
            <Select
              isClearable
              placeholder="Buscar o Ingresar un Producto"
              styles={{
                option: (base) => ({
                  ...base,
                  border: `1px dotted grey`,
                  height: "100%",
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "grey" : "green",
                  color: "red",
                }),
                // Fixes the overlapping problem of the component
                menu: (provided) => {
                  return ({
                    ...provided,
                    zIndex: 9999,
                    minWidth: 320,
                    width: '100%',
                    textAlign: 'left'
                  });
                },
                menuList: (base) => {
                  return ({
                    ...base,
                    color: 'black'
                  })
                }
              }}
              formatOptionLabel={({ Producto, precio, inventario }) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '98%' }}>
                  {/* Detalles del Producto */}
                  <span style={{ width: '100%', flex: '0 1 auto', fontSize: 18 }}>{Producto?.nombreProducto}</span>



                </div>
              )}
              getOptionLabel={(option) =>
                `${option.Producto?.codigo}: ${option.Producto?.nombreProducto} - ${option.Producto?.presentacion}   ${option.Producto?.barras == null ? '' : option.Producto?.barras}`
              }
              options={inventarioAlmacen.map((element) => {


                return {
                  value: element.id,
                  label: `${element.nombreProducto} - ${element.presentacion}`,
                  ...element,
                };


              })}
              onChange={(data, { action }) => {

                //console.log('Action onChange:', action);
                switch (action) {
                  case "select-option":


                    append(data);



                    break;
                  case "clear":
                    //  append(null);

                    break;
                  default:
                    break;
                }
              }}
              onKeyDown={(event) => {




                if (event.key === 'Enter' && inventarioAlmacen.some((e) => e.Producto.barras?.toLowerCase() == event.target.value.toLowerCase())) {
                  console.log('Presiono Enter')
                  event.preventDefault();
                  const inputValue = event.target.value;

                  console.log(inventarioAlmacen.filter((e) => e.Producto.barras).find(option =>
                    option.Producto?.barras == inputValue.trim().toLowerCase()
                  ));
                  const matchedOption = inventarioAlmacen.filter((e) => e.Producto.barras).find(option =>
                    option.Producto.barras.toLowerCase() == inputValue.toLowerCase()
                  );

                  if (matchedOption) {
                    let articulo = {
                      Producto: matchedOption.Producto,
                      cantidad: 1,
                      precio: matchedOption.precio,
                      costo_item: matchedOption.costo,
                      subtotal_item: precio / (1 + (matchedOption.Producto.iva / 100)),
                      iva_item: precio - (precio / (1 + (matchedOption.Producto.iva / 100))),
                      total_item: 1 * matchedOption.precio
                    };


                    append(articulo);


                    setItem(null);
                    setCantidadItem(0)

                    setPrecio(0);
                    console.log(selectInputRef.current);
                    selectInputRef.current.setValue('')
                  }
                }
              }}
              filterOption={(option, inputValue) => {
                // Dividir la entrada del usuario en palabras individuales
                const searchWords = inputValue.toLowerCase().split(' ');

                // Unir todos los campos del objeto opción en una sola cadena y convertirla a minúsculas
                const combinedOptionText = `${option.label}`.toLowerCase();

                // Verificar si todas las palabras de búsqueda están presentes en la cadena combinada
                return searchWords.every(word => combinedOptionText.includes(word));
              }}
              noOptionsMessage={({ inputValue }) => console.log(inputValue)}
            //onChange={onChange}
            //isOptionDisabled={(option) => option.estado == Estado.INACTIVO}

            />


          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
            <MaterialTable
              title="Lista Productos"
              columns={[

                { title: 'NOMBRE', field: 'Producto.nombreProducto' },
                {
                  title: 'PRECIO',
                  field: 'precio',
                  type: 'numeric',
                  editable: 'onUpdate', // Permitir que sea editable
                },

              ]}
              data={fields}
              options={{
                toolbar: false,
                pageSize: fields.length,

                paging: false,
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    const index = fields.findIndex(item => item.Producto.nombreProducto === oldData.Producto.nombreProducto);
                    if (index > -1) {
                      update(index, newData); // Actualiza el valor en el formulario
                    }
                    resolve();
                  }),
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} xl={7} sx={{ mt: 2 }}>
          <Controller
            name="valor_total"
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
                label="TOTAL"
                variant="outlined"
                type="text"
              />)}
            rules={{
              required: {
                value: true,
                message: "Esta entrada es Obligatoria.",
              },


            }}
          />
        </Grid>



      </form>

    </AlmacenesSelectDialog>
  </FormProvider >)
}

CreateTicket.getLayout = function getLayout(page) {

  return <LayoutApp {...page.props}  >{page}</LayoutApp>;
};


export default CreateTicket;