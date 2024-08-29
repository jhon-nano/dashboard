import React, { Fragment } from "react";
// layout for this page
import {
  useMediaQuery
} from "@mui/material";
import { useSelector } from "react-redux";
import LayoutApp from "../../../../layout/LayoutApp";
import { Categoria, Linea, Marca } from "../../../../models";

import ProductosTableImport from "../../../../components/productos/ProductosTableImport";
import { useModelProductos } from "../../../../hooks/models/useModelProducto";
import { useModel } from "../../../../hooks/useModel";
import { getVisibleDatosProductos } from "../../../../store/selectors/productos";







export default function Productos({ value }) {

  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));



  const {
    loading: loading_producto,
    error: error_productos
  } = useModelProductos()

  const productos = useSelector((state) => state.productos);

  const { modulo, permisosAutorizados } = userStore;

  const {
    filter_productos,
    filter_lineas,
    filter_categorias,
    filter_marcas,
  } = productos;

  const data = getVisibleDatosProductos(productos);

  const { data: data_categorias,
    loading: loading_categoria,
    error: error_caterorias } = useModel(Categoria)


  const { data: data_lineas } = useModel(Linea)

  const { data: data_marcas } = useModel(Marca)




  return (
    <Fragment >
      <ProductosTableImport data={data} loadingProducto={loading_producto} data_lineas={data_lineas} data_categorias={data_categorias} data_marcas={data_marcas} />
    </Fragment>
  );
}


Productos.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} >{page}</LayoutApp>;
};

