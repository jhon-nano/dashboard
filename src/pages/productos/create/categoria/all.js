import React from "react";
// layout for this page
import {
  useMediaQuery
} from "@mui/material";
import { useSelector } from "react-redux";
import LayoutApp from "../../../../layout/LayoutApp";
import { Categoria } from "../../../../models";

import CategoriasTableImport from "../../../../components/productos/categorias/CategoriasTableImport";
import { useModelProductos } from "../../../../hooks/models/useModelProducto";
import { useModel } from "../../../../hooks/useModel";







export default function Productos({ value }) {

  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));



  const {
    loading: loading_producto,
    error: error_productos
  } = useModelProductos()

  const productos = useSelector((state) => state.productos);

  const { modulo, permisosAutorizados } = userStore;



  const { data: data_categorias,
    loading: loading_categoria,
    error: error_caterorias } = useModel(Categoria)





  return (
    <>
      <CategoriasTableImport loadingProducto={loading_producto} data_categorias={data_categorias} />
    </>
  );
}


Productos.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} >{page}</LayoutApp>;
};

