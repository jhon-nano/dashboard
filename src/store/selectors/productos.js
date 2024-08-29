import { createSelector } from "reselect";
import TypesProductos from "../../types/typesProductos";
import { Estado } from "../../models";


const getVisibilityFilter = (state) => state.filtro;

const getTodos = (state) => state.productos;

const getFiltrosLineas = (state) => state.filter_lineas;
const getFiltrosCategorias = (state) => state.filter_categorias;
const getFiltrosMarcas = (state) => state.filter_marcas;
const getFiltrosAtributos = (state) => state.filter_atributos;


export const getVisibleDatosProductos = createSelector(
  [
    getVisibilityFilter,
    getTodos,
    getFiltrosLineas,
    getFiltrosCategorias,
    getFiltrosMarcas,
    getFiltrosAtributos
  ],
  (visibilityFilter,  data, lineas, categorias, marcas,filter_atributos) => {


    if (lineas?.length > 0) {

      if (typeof lineas[0] === 'string') {
        data = data.filter((producto) =>
        lineas.some((e) => e == producto.productoLineaId)
      );
      } else if (typeof lineas[0] === 'object') {
        data = data.filter((producto) =>
        lineas.some((e) => e.id == producto.productoLineaId)
      );
      } else {
        console.log('Tipo de lineas desconocido.');
      }



    }

    if (categorias?.length > 0) {



      if (typeof categorias[0] === 'string') {
        data = data.filter((producto) =>
        categorias.some((e) => e == producto.productoCategoriaId)
      );
      } else if (typeof categorias[0] === 'object') {
        data = data.filter((producto) =>
        categorias.some((e) => e.id == producto.productoCategoriaId)
      );
      } else {
        console.log('Tipo de categorias desconocido.');
      }



    }

    if (marcas?.length > 0) {

      if (typeof marcas[0] === 'string') {
        data = data.filter((producto) =>
        marcas.some((e) => e == producto.productoMarcaId)
      );
      } else if (typeof marcas[0] === 'object') {
        data = data.filter((producto) =>
        marcas.some((e) => e.id == producto.productoMarcaId)
      );
      } else {
        console.log('Tipo de marcas desconocido.');
      }

    }


    if (Object.values(filter_atributos).some(array => array.length > 0)) {

      data = data.filter(producto => {
        const datosProducto = producto.datos_producto;
        if (datosProducto !== null) {
          return Object.entries(filter_atributos).every(([filtroKey, filtroValues]) => {
            const productoValue = datosProducto[filtroKey];

            return filtroValues.includes(productoValue);

          });
        } else {
          return false
        }
      });
    }

    switch (visibilityFilter) {
      case TypesProductos.StoreSelectors.SHOW_ALL_PRODUCTOS:
        return data;
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_ACTIVE:
        return data.filter((e) => e.estado == Estado.ACTIVO);
        case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_LINEA:
          return data.filter((e) => e.estado == Estado.ACTIVO);
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_CATEGORIA:
        return data.filter((e) => e.estado == Estado.ACTIVO);
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_MARCA:
        return data.filter((e) => e.estado == Estado.ACTIVO);
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_INACTIVE:
        return data.filter((e) => e.estado == Estado.INACTIVO);
      default:
        throw new Error("Unknown filter: " + visibilityFilter);
    }
  }
);
