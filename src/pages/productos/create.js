import { Container } from "@mui/system";

import { useRouter } from "next/router";

import { FormProvider, useForm } from "react-hook-form";

import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

import { FormCreateProducto } from "../../components/productos/create/FormCreateProducto";
import ProductosHelpers from "../../helpers/productosHelpers";
import { useModel } from "../../hooks/useModel";
import LayoutApp from "../../layout/LayoutApp";
import { Categoria, Producto } from "../../models";
import { useMemo } from "react";




export default function CreateProducto({ userStore }) {

  const confirm = useConfirm();
  const router = useRouter();
  const methods = useForm();

  const dispatch = useDispatch();
  const { handleSubmit, control, setError } = methods;
  const { enqueueSnackbar } = useSnackbar();


  const productoStore = useSelector((state) => state.productos);

  const { data: categorias,
    loading: loading_categoria,
    error: error_caterorias } = useModel(Categoria)

  const {
    loading: loading_producto,
    data: productos,
    error: error_productos,
  } = useModel(Producto);

  const helpersProductos = useMemo(() => new ProductosHelpers(productoStore, dispatch, confirm, enqueueSnackbar, router), [productoStore, dispatch, confirm, enqueueSnackbar, router]);

  const {
    permisosAutorizados
  } = userStore;



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
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(helpersProductos.onSubmitCreateProducto, onError)}>
          <FormCreateProducto

            permisosAutorizados={permisosAutorizados}
            categorias={categorias}
            loadingCategoria={loading_categoria}


          />
        </form>
      </FormProvider>
    </Container>
  );
}


CreateProducto.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props}>{page}</LayoutApp>;
};