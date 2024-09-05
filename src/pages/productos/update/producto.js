import { Container, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import ProductosHelpers from "../../../helpers/productosHelpers";
import { useModelProductoById } from "../../../hooks/models/useModelProducto";
import LayoutApp from "../../../layout/LayoutApp";
import { FormUpdateProducto } from "../../../components/productos/update/FormUpdateProducto";
import { useEffect, useMemo } from "react";
import { Content, Fullscreen, getContentBasedScheme, Root } from "@mui-treasury/layout";
import FormEmcabezadoCreateProducto from "../../../components/productos/create/FormEmcabezado";
import { FormCreateProducto } from "../../../components/productos/create/FormCreateProducto";
import LayoutCaja from "../../../layout/LayoutCaja";

const scheme = getContentBasedScheme();

export default function UpdateProducto({ userStore }) {

  const router = useRouter();
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productosStore = useSelector((state) => state.productos);

  const helpersProductos = useMemo(() => new ProductosHelpers(productosStore, dispatch, confirm, enqueueSnackbar, router), [productosStore, dispatch, confirm, enqueueSnackbar, router]);



  //console.log(router.query.id)
  const {
    loading: loadingProducto,
    producto,
    linea,
    categoria,
    marca,
    error: errorProducto,
  } = useModelProductoById(router.query.id);

  const methods = useForm({
    defaultValues: producto && {
      id: router.query.id,
      linea: {
        value: linea?.id,
        label: linea?.nombreLinea,
      },
      categoria: {
        value: categoria?.id,
        label: categoria?.nombreCategoria,
      },
      marca: {
        value: marca?.id,
        label: marca?.nombreMarca,
      },
      nombreProducto: producto.nombreProducto,
      presentacion: producto.presentacion,
      venta: producto.venta,

      insumos: producto.insumos,
      iva: producto.iva,
      barras: producto.barras,
      descripcion: producto.descripcion,
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (producto) {
      reset({
        ...producto,
        linea: {
          value: producto.Linea?.id,
          label: producto.Linea?.nombreLinea,
        },
        categoria: {
          ...producto.Categoria,
          value: producto.Categoria?.id,
          label: producto.Categoria?.nombreCategoria,
        },
        marca: {
          value: producto.Marca?.id,
          label: producto.Marca?.nombreMarca,
        },
      })


    }

  }, [producto])



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
    producto && (
      <>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(helpersProductos.onSubmitUpdateProducto, onError)}>
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
                    <FormCreateProducto />
                  </Content>
                </Stack>
              </Root>
            </Fullscreen>
          </form>
        </FormProvider>
      </>
    )
  );
}

UpdateProducto.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props}>{page}</LayoutApp>;
};

