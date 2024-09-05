
import { useRouter } from "next/router";

import { FormProvider, useForm } from "react-hook-form";

import { Content, Fullscreen, getContentBasedScheme, Root } from "@mui-treasury/layout";

import { Stack } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormCreateProducto } from "../../../../components/productos/create/FormCreateProducto";
import FormEmcabezadoCreateProducto from "../../../../components/productos/create/FormEmcabezado";
import ProductosHelpers from "../../../../helpers/productosHelpers";
import { useModel } from "../../../../hooks/useModel";
import LayoutApp from "../../../../layout/LayoutApp";
import { Categoria } from "../../../../models";

const scheme = getContentBasedScheme();


export default function CreateProducto({ userStore }) {

  const confirm = useConfirm();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      iva: 0
    }
  });

  const dispatch = useDispatch();
  const { handleSubmit, control, setError } = methods;
  const { enqueueSnackbar } = useSnackbar();


  const { permisosAutorizados } = userStore;


  const productoStore = useSelector((state) => state.productos)


  const helpersProductos = useMemo(() => new ProductosHelpers(productoStore, dispatch, confirm, enqueueSnackbar, router), [productoStore, dispatch, confirm, enqueueSnackbar, router]);


  const { data: categorias,
    loading: loading_categoria,
    error: error_caterorias } = useModel(Categoria)



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



  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(helpersProductos.onSubmitCreateProducto, onError)}>

          <Fullscreen >
            <Root scheme={{
              ...scheme,

            }}>
              <FormEmcabezadoCreateProducto />
              <Stack sx={{
                flex: '1 1 auto',
                overflowY: 'auto',
              }} >


                <Content  >


                  <FormCreateProducto
                    permisosAutorizados={permisosAutorizados}
                    categorias={categorias}
                    loadingCategoria={loading_categoria}
                  />



                </Content>
              </Stack>



            </Root>
          </Fullscreen>



        </form>
      </FormProvider>
    </>
  );
}


CreateProducto.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props}>{page}</LayoutApp>;
};