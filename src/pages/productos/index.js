import React, { useCallback, useEffect, useMemo, useState } from "react";
// layout for this page
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Chip } from "@material-ui/core";
import {
  AddToQueueTwoTone,
  AssignmentTwoTone,
  BallotTwoTone,
  CategoryTwoTone,
  ExtensionTwoTone,
  FilterAltTwoTone,
  ListAltTwoTone,
  StorefrontTwoTone,
  TvTwoTone
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  CardHeader,
  Divider,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select as SelectMui,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import FilterComponent from "../../components/otros/FilterComponent";
import Modal from "../../components/otros/Modal";
import CategoriasAtributosTable from "../../components/productos/categorias/CategoriasAtributosTable";
import { CheckCategorias, CheckLineas, CheckMarcas } from "../../components/tablas/Filtros/CheckProductos";
import { DrawerFiltrosTable } from "../../components/tablas/FiltrosTable";
import CategoriasHelpers from "../../helpers/categoriasHelpers";
import LineasHelpers from "../../helpers/lineasHelpers";
import MarcasHelpers from "../../helpers/marcasHelpers";
import { useModelProductos } from "../../hooks/models/useModelProducto";
import { useModel } from "../../hooks/useModel";
import LayoutApp from "../../layout/LayoutApp";
import { Categoria, Estado, Linea, Marca } from "../../models";
import ProductoService from "../../services/productoService";
import { openFiltroData } from "../../store/actions/app";
import { filteringAtributosProductos, filteringCategoriasProductos, filteringLineasProductos, filteringMarcasProductos, filteringProductos, filterTableProductos, filtrarProductos, groupingProductos } from "../../store/actions/productos";
import { getVisibleDatosProductos } from "../../store/selectors/productos";
import TypesProductos from "../../types/typesProductos";
import FormatUtils from "../../utils/formatUtils";






function ProductosAppBar({ value, setValue, utilsAuth }) {

  const breakpoints_xs = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const dispatch = useDispatch();


  return (
    <Box display={'flex'} alignContent={'center'} alignItems={'center'}>

      <Box flexGrow={1}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue); {/* Pasa la función para actualizar el valor desde la prop de la página */ }
          }}
          centered
          textColor="inherit"
          indicatorColor='secondary'

        >

          <Tab
            icon={<TvTwoTone fontSize='medium' />}
            iconPosition="start"
            label={breakpoints_xs ? "PRODUCTOS" : ""}
            style={{ minWidth: 'auto' }}
            sx={{
              paddingRight: 1, // Establece el relleno derecho a 0
              paddingLeft: 1,
            }}
          />
          <Tab
            icon={<BallotTwoTone fontSize='medium' />}
            iconPosition="start"
            style={{ minWidth: 'auto' }}
            label={breakpoints_xs ? "LINEAS" : ""}
            sx={{
              paddingRight: 1, // Establece el relleno derecho a 0
              paddingLeft: 1,
            }}
          />
          <Tab
            icon={<CategoryTwoTone fontSize='medium' />}
            iconPosition="start"
            label={breakpoints_xs ? "CATEGORIAS" : ""}
            style={{ minWidth: 'auto' }}
            sx={{
              paddingRight: 1, // Establece el relleno derecho a 0
              paddingLeft: 1,
            }}
          />
          <Tab
            icon={<StorefrontTwoTone fontSize='medium' />}
            iconPosition="start"
            label={breakpoints_xs ? "MARCAS" : ""}
            style={{ minWidth: 'auto' }}
            sx={{
              paddingRight: 1, // Establece el relleno derecho a 0
              paddingLeft: 1,
            }}
          />

        </Tabs>
      </Box>
      <Tooltip title='Filtrar' >
        <IconButton size="medium" sx={{ width: 45, height: 45 }} onClick={(event) =>
          utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().FILTROS_TABLA_PRODUCTO, true)
          && dispatch(openFiltroData(true))}>
          <FilterAltTwoTone />
        </IconButton>
      </Tooltip>
    </Box>




  )
}



export default function Productos({ value, userStore, utilsAuth, appStore }) {

  const theme = useTheme();
  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading: loadingProductos } = useModelProductos();

  const productoStore = useSelector((state) => state.productos);

  const moduloProducto = useMemo(() => new TypesProductos(router), [router]);
  const helpersLineas = useMemo(() => new LineasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);
  const helpersMarcas = useMemo(() => new MarcasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);
  const helpersCategorias = useMemo(() => new CategoriasHelpers(confirm, enqueueSnackbar), [confirm, enqueueSnackbar]);
  const utilsFormat = useMemo(() => new FormatUtils(), []);

  const serviceProducto = new ProductoService();


  const { usuario, permisosAutorizados } = userStore;
  const { material_table, open_filtro } = appStore;
  const { filtro, filter_productos, filter_lineas, filter_categorias, filter_marcas, filtering, grouping } = productoStore;

  const data = getVisibleDatosProductos(productoStore);

  const [categoriaAtributos, setOpenAtributos] = useState(null);
  const [propiedadesUnicas, setDataFiltros] = useState([]);

  const { data: data_categorias, loading: loading_categoria, error: error_caterorias } = useModel(Categoria);
  const { data: data_lineas } = useModel(Linea);
  const { data: data_marcas } = useModel(Marca);




  const calcularPropiedadesUnicas = (data) => {
    const propiedades = {};

    data.forEach(producto => {
      const datosProducto = producto.datos_producto;

      for (const prop in datosProducto) {
        if (datosProducto.hasOwnProperty(prop)) {
          if (!propiedades[prop]) {
            propiedades[prop] = [];
          }

          if (!propiedades[prop].includes(datosProducto[prop])) {
            propiedades[prop].push(datosProducto[prop]);
          }
        }
      }
    });

    return propiedades;
  };

  useEffect(() => {


    const propiedades = calcularPropiedadesUnicas(productoStore.productos);




    setDataFiltros(propiedades);


  }, [productoStore]);



  const activeStepComponent = useCallback(() => {
    switch (value) {
      case 0:
        return (
          <MaterialTable

            title={
              <CardHeader
                avatar={
                  <Avatar variant='rounded' sx={{ width: 50, height: 50 }}>
                    <Icon style={{ fontSize: 45 }} color="primary" >
                      {moduloProducto.icon}
                    </Icon>
                  </Avatar>
                }
                title={breakpoints_sm ? 'LISTA DE PRODUCTOS' : ''}
                titleTypographyProps={{
                  variant: 'h6'
                }}
                subheader={breakpoints_sm ? data.length + ' Registros' : ''}
              />
            }
            columns={[
              {
                title: "ID",
                field: "id",
                align: "center",
                hidden: true,
                filtering: false,
              },
              {
                title: "CODIGO",
                field: "codigo",
                align: "center",
                type: "string",
                editable: 'never',

                headerStyle: {
                  width: "1%",
                  maxWidth: "1%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "1%",
                  maxWidth: "1%",
                  fontSize: 12
                }),
              },
              {
                title: "PRODUCTO",
                field: "nombreProducto",
                customFilterAndSearch: (term, rowData) => {
                  if (typeof term === "string") {
                    return term
                      .split(" ")
                      .every((s) =>
                        rowData.nombreProducto
                          .toLowerCase()
                          .includes(s.toLowerCase())
                      );
                  } else {
                    return false;
                  }
                },
                type: "string",
                align: "left",
                filtering: false,
                grouping: false,
                initialEditValue: '',
                headerStyle: {
                  width: "34%",
                  maxWidth: "34%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "34%",
                  maxWidth: "34%",
                  fontSize: 12
                }),
              },
              {
                title: "PRESENTACION",
                field: "presentacion",
                customFilterAndSearch: (term, rowData) => {
                  if (
                    typeof term === "string" &&
                    typeof rowData.presentacion === "string"
                  ) {
                    return term
                      .split(" ")
                      .every((s) =>
                        rowData.presentacion
                          .toLowerCase()
                          .includes(s.toLowerCase())
                      );
                  } else {
                    return false;
                  }
                },
                searchable: true,
                type: "string",
                align: "left",
                initialEditValue: '',
                hidden: breakpoints_sm ? false : true,
                filtering: false,
                grouping: false,

                headerStyle: {
                  width: "30%",
                  maxWidth: "30%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "20%",
                  maxWidth: "20%",
                  fontSize: 12
                }),
              },
              {
                title: "LINEA",
                field: "productoLineaId",
                align: "center",
                type: "string",
                lookup: data_lineas?.reduce((acc, { id, codigo, nombreLinea }) => {
                  acc[id] = nombreLinea;
                  return acc;
                }, {}),
                headerStyle: {
                  width: "15%",
                  maxWidth: "15%",
                  align: "center",
                },
                cellStyle: (rowData) => ({
                  width: "15%",
                  maxWidth: "15%",
                  fontSize: 12
                }),
              },
              {
                title: "CATEGORIA",
                field: "productoCategoriaId",
                align: "center",
                type: "string",

                hidden: breakpoints_sm ? false : true,
                lookup: data_categorias?.reduce((acc, { id, codigo, nombreCategoria }) => {
                  acc[id] = nombreCategoria;
                  return acc;
                }, {}),
                headerStyle: {
                  width: "15%",
                  maxWidth: "15%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "15%",
                  maxWidth: "15%",
                  fontSize: 12
                }),
              },

              {
                title: "MARCA",
                field: "productoMarcaId",
                align: "center",
                type: "string",
                lookup: data_marcas?.reduce((acc, { id, codigo, nombreMarca }) => {
                  acc[id] = nombreMarca;
                  return acc;
                }, {}),
                hidden: breakpoints_sm ? false : true,

                headerStyle: {
                  width: "15%",
                  maxWidth: "15%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "15%",
                  maxWidth: "15%",
                  fontSize: 12
                }),
              },
              {
                title: "DATOS",
                field: "datos_producto",
                align: "center",
                render: (rowData) =>
                  <Stack spacing={1} direction={'row'} width={400}>
                    {rowData.datos_producto && Object.keys(rowData.datos_producto).map(e =>
                      <div key={e} style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          value={rowData.datos_producto[e]}
                          label={e.toLocaleUpperCase()}
                          size="small"
                          fullWidth
                          variant="standard"
                          InputLabelProps={{ style: { fontSize: 10 } }} //
                          InputProps={{
                            style: { fontSize: '12px' }, // Ajustar el tamaño de la fuente del texto

                          }}
                        />

                      </div>

                    )}
                  </Stack>,
                searchable: true,
                editable: 'never',
                customFilterAndSearch: (term, rowData) => {
                  if (
                    typeof term === "string"
                  ) {
                    return term
                      .split(" ")
                      .every((s) =>
                        JSON.stringify(rowData.datos_producto, null, 2).toString()
                          .toLowerCase()
                          .includes(s.toLowerCase())
                      );
                  } else {
                    return false;
                  }
                },
                type: "string",
                hidden: true,
                headerStyle: {
                  width: "55%",
                  maxWidth: "55%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "55%",
                  maxWidth: "55%",
                  fontSize: 12
                }),
              },
              {
                title: "BARRAS",
                field: "barras",
                align: "center",
                editable: 'never',
                searchable: true,
                type: "string",
                hidden: true,
                headerStyle: {
                  width: "15%",
                  maxWidth: "15%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "15%",
                  maxWidth: "15%",
                  fontSize: 12
                }),
              },
              {
                title: "IVA",
                field: "iva",
                align: "center",
                editable: 'never',
                hidden: true,
                headerStyle: {
                  width: "5%",
                  maxWidth: "5%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "5%",
                  maxWidth: "5%",
                  fontSize: 12
                }),
              },

              {
                title: "ESTADO",
                field: "estado",
                hidden: breakpoints_sm ? true : true,
                lookup: Estado,
                filtering: false,
                align: "center",
                headerStyle: {
                  width: "5%",
                  maxWidth: "5%",
                  align: "center",
                  fontSize: 12
                },
                cellStyle: (rowData) => ({
                  width: "5%",
                  maxWidth: "5%",
                  fontSize: 12
                }),
              },
            ]}
            data={data}
            isLoading={loadingProductos}
            components={{
              Toolbar: (props) => (
                <div style={{ backgroundColor: theme.palette.grey[300] }}>
                  <MTableToolbar {...props} />
                  <Stack
                    sx={{
                      display: { xs: "none", md: "flex" },
                      padding: 1,
                      marginBottom: 0.5,
                      borderTop: 2,
                      borderBottom: 2,
                      borderRadius: 2,
                      borderColor: theme.palette.primary.main,
                      alignContent: 'center',
                      alignItems: 'center'
                    }}
                    direction={"row"}
                    spacing={1}
                  >
                    <FormControl sx={{ width: 250 }}>
                      <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
                      <SelectMui
                        sx={{ color: theme.palette.primary.main, minWidth: 200 }}
                        value={filtro}
                        size='small'
                        label="Filtro"
                        color='secondary'
                        onChange={(event) => {
                          dispatch(filtrarProductos(event.target.value, usuario));
                        }}
                      >

                        <MenuItem value={TypesProductos.StoreSelectors.SHOW_ALL_PRODUCTOS}>
                          <b > Todos los Productos</b>

                        </MenuItem>
                        <MenuItem value={TypesProductos.StoreSelectors.SHOW_PRODUCTOS_LINEA}>
                          <b> Producto por Lineas</b>

                        </MenuItem>
                        <MenuItem value={TypesProductos.StoreSelectors.SHOW_PRODUCTOS_CATEGORIA}>
                          <b> Producto por Categorias</b>

                        </MenuItem>
                        <MenuItem value={TypesProductos.StoreSelectors.SHOW_PRODUCTOS_MARCA}>
                          <b> Producto por Marcas</b>

                        </MenuItem>
                        <MenuItem value={TypesProductos.StoreSelectors.SHOW_PRODUCTOS_INACTIVE}>
                          <b> Productos Inactivos</b>

                        </MenuItem>


                      </SelectMui>
                    </FormControl>
                    <Box flexGrow={1} />
                    {(filter_lineas.length > 0 || filter_categorias.length > 0 || filter_marcas.length > 0) &&
                      <Alert severity="error" icon={<FilterAltTwoTone />}>

                        <AlertTitle sx={{ fontSize: 8 }}>Filtros Activos</AlertTitle>

                        {filter_lineas.map((element, i) =>
                          <Chip
                            key={i}
                            label={lineas[element]}
                            variant="outlined"
                            onDelete={handleToggleFiltro(element, filter_lineas, filteringLineasProductos)}
                            color="primary"
                            disabled={false}
                            size="small"
                            sx={{ marginRight: 0.2, maxWidth: 150 }}
                          />)}
                        {filter_categorias.map((element, i) =>
                          <Chip
                            key={i}
                            label={categorias[element]}
                            variant="outlined"
                            onDelete={handleToggleFiltro(element, filter_categorias, filteringCategoriasProductos)}
                            color="primary"
                            disabled={false}
                            size="small"
                            sx={{ marginRight: 0.2, maxWidth: 150 }}
                          />)}
                        {filter_marcas.map((element, i) =>
                          <Chip
                            key={i}
                            label={marcas[element]}
                            variant="outlined"
                            onDelete={handleToggleFiltro(element, filter_marcas, filteringMarcasProductos)}
                            color="primary"
                            disabled={false}
                            size="small"
                            sx={{ marginRight: 0.2, maxWidth: 150 }}
                          />)}
                      </Alert>
                    }
                    <Box flexGrow={1} />

                    {SelectBusqueda()}


                  </Stack>
                </div>
              ),
            }}
            onFilterChange={(filters) => {
              dispatch(filterTableProductos(filters));
            }}
            options={{
              ...material_table.options,
              filtering: filtering,
              grouping: grouping,
              columnsButton: utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().VER_COLUMNAS_PRODUCTO, false),


            }}
            icons={material_table.icons}
            localization={material_table.localization}
            style={material_table.style}
            actions={[
              {
                icon: () => (
                  <AddToQueueTwoTone sx={{ fontSize: 24 }} color="primary" />
                ),
                tooltip: "Ingresar",
                isFreeAction: true,
                onClick: (event) =>
                  utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_PRODUCTO, true)
                  && moduloProducto.pushPathCreate('/producto')

              },

              {
                icon: () => (
                  <AssignmentTwoTone sx={{ fontSize: 24 }} color={"action"} />
                ),
                tooltip: "Ver",
                onClick: (event, rowData) => {
                  utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().VER_PRODUCTO, true)
                    && moduloProducto.pushPathView(rowData.id, '/producto')

                },
              },

            ]}
            editable={utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().UPDATE_PRODUCTOS_ALL, false) ? {
              onBulkUpdate: (changes) => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    Object.values(changes).map(({ newData, oldData }, i) => {
                      console.log(oldData)
                      console.log(newData)
                      const formattedData = utilsFormat.formatProductoUpdateDataAll(newData);

                      serviceProducto.update(oldData.id, formattedData)


                    })
                    resolve();
                  }, 1000);
                });
              },


            } : {}}
          />
        );
      case 1:
        return (
          <MaterialTable
            title={
              <CardHeader
                avatar={
                  breakpoints_sm && <ListAltTwoTone style={{ fontSize: 45 }} color="primary" />
                }
                title={'LISTA DE LINEAS'}
                titleTypographyProps={{
                  variant: 'h6'
                }}
                subheader={breakpoints_sm && data.length + ' Registros'}
              />}
            columns={helpersLineas.columns}
            data={data_lineas}
            options={{
              ...material_table.options,
              filtering: filtering,
              grouping: grouping,
              columnsButton: utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().VER_COLUMNAS_LINEAS),


            }}
            components={{
              Toolbar: (props) => (
                <div style={{ backgroundColor: theme.palette.grey[300] }}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            icons={material_table.icons}
            localization={material_table.localization}
            style={material_table.style}
            editable={utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().EDITAR_LINEAS) ? {

              isDeleteHidden: rowData => rowData.estado === Estado.INACTIVO,
              onRowAdd: (newData) => helpersLineas.onRowAddTableLinea(newData),
              onRowUpdate: (newData, oldData) => helpersLineas.onRowUpdateTableLinea(newData, oldData),
              onRowDelete: (oldData) => helpersLineas.onRowDeleteTableLinea(oldData),
            } : null}
          />
        );
      case 2:
        return (

          <MaterialTable
            title={<CardHeader
              avatar={
                <ListAltTwoTone style={{ fontSize: 45 }} color="primary" />
              }
              title={'LISTA DE CATEGORIAS'}
              titleTypographyProps={{
                variant: 'h6'
              }}
              subheader={data.length + ' Registros'}
            />}
            data={data_categorias}
            columns={[
              {
                title: "ID",
                field: "id",
                align: "center",
                hidden: true,
              },
              {
                title: "CATEGORIA",
                field: "nombreCategoria",
                type: "string",
                align: "left",

                defaultSort: "asc",
                headerStyle: {
                  width: "30%",
                  maxWidth: "30%",
                  align: "center",
                },
                cellStyle: (rowData) => ({
                  width: "30%",
                  maxWidth: "30%",
                }),
              },
              {
                title: "ATRIBUTOS",
                field: "CategoriaAtributos",
                type: "string",
                align: "left",
                editable: 'never',
                render: (rowData) => rowData.Atributos?.map((e) =>
                  <Chip
                    key={e.nombre}
                    variant="outlined"
                    label={e.nombre}
                    sx={{ marginLeft: 0.2, marginRight: 0.2 }}
                    color='primary'
                    size="small"

                  />),
                defaultSort: "asc",
                headerStyle: {
                  width: "60%",
                  maxWidth: "60%",
                  align: "center",
                },
                cellStyle: (rowData) => ({
                  width: "60%",
                  maxWidth: "60%",
                }),
              },
              {
                title: "ESTADO",
                field: "estado",
                lookup: Estado,
                editable: 'never',
                initialEditValue: Estado.ACTIVO,
                align: "center",
                headerStyle: {
                  width: "5%",
                  maxWidth: "5%",
                  align: "center",
                },
                cellStyle: (rowData) => ({
                  width: "5%",
                  maxWidth: "5%",
                }),
              },
            ]}
            options={{
              ...material_table.options,
              filtering: filtering,
              grouping: grouping,
              columnsButton: utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().VER_COLUMNAS_CATEGORIAS),


            }}
            components={{
              Toolbar: (props) => (
                <div style={{ backgroundColor: theme.palette.grey[300] }}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            icons={material_table.icons}
            localization={material_table.localization}
            style={material_table.style}
            editable={utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().EDITAR_CATEGORIAS) ? {
              isDeleteHidden: rowData => rowData.estado === Estado.INACTIVO,
              onRowAdd: (newData) => helpersCategorias.onRowAddTableCategoria(newData),
              onRowUpdate: (newData, oldData) => helpersCategorias.onRowUpdateTableCategoria(newData, oldData),
              onRowDelete: (oldData) => helpersCategorias.onRowDeleteTableCategoria(oldData),
            } : null}
            actions={[
              rowData => ({
                icon: () => (
                  <ExtensionTwoTone sx={{ fontSize: 24 }} color="secondary" />
                ),
                tooltip: "Ver Atributos",

                disabled: rowData.estado == Estado.INACTIVO,
                onClick: (event) => {
                  utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_ATRIBUTOS, true)
                    && setOpenAtributos(rowData)

                },
              }),


            ]}
          />


        );
      case 3:
        return (
          <MaterialTable
            title={<CardHeader
              avatar={
                <ListAltTwoTone style={{ fontSize: 45 }} color="primary" />
              }
              title={'LISTA DE MARCAS'}
              titleTypographyProps={{
                variant: 'h6'
              }}
              subheader={data.length + ' Registros'}
            />}
            data={data_marcas}
            columns={helpersMarcas.columns}
            options={{
              ...material_table.options,
              filtering: filtering,
              grouping: grouping,
              columnsButton: utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().VER_COLUMNAS_MARCAS),


            }}
            components={{
              Toolbar: (props) => (
                <div style={{ backgroundColor: theme.palette.grey[300] }}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
            icons={material_table.icons}
            localization={material_table.localization}
            style={material_table.style}
            editable={utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().EDITAR_MARCAS) ? {
              isDeletable: rowData => rowData.estado === Estado.ACTIVO, // only name(b) rows would be deletable,
              isDeleteHidden: rowData => rowData.estado === Estado.INACTIVO,
              onRowAdd: (newData) => helpersMarcas.onRowAddTableMarca(newData),
              onRowUpdate: (newData, oldData) => helpersMarcas.onRowUpdateTableMarca(newData, oldData),
              onRowDelete: (oldData) => helpersMarcas.onRowDeleteTableMarca(oldData),
            } : null}
          />
        );
      default:
        break;
    }
  }, [
    value,
    data,
    productoStore,
    loadingProductos,
    data_categorias,
    loading_categoria,
    data_lineas,
    data_marcas,
    permisosAutorizados,
    filter_productos,
    filter_lineas,
    filter_categorias,
    filter_marcas,
    breakpoints_sm,
  ]);


  const handleFilterChange = useCallback((selectedFilters) => {
    dispatch(filteringAtributosProductos(selectedFilters));
  }, [dispatch]);

  const handleToggleFiltro = useCallback((element, filtros, filtering) => () => {
    const currentIndex = filtros.indexOf(element);
    const newChecked = [...filtros];

    if (currentIndex === -1) {
      newChecked.push(element);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    dispatch(filtering(newChecked));
  }, [dispatch]);

  const SelectBusqueda = useCallback(() => {
    switch (filtro) {
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_LINEA:
        return (
          <Select
            isMulti
            name="linea"
            isSearchable={true}
            options={data_lineas.map(objeto => ({
              ...objeto,
              value: objeto.id,
              label: objeto.nombreLinea,
            }))}
            value={filter_lineas}
            onChange={(selectedOption) => {
              dispatch(filteringLineasProductos(selectedOption));
            }}
            className="basic-multi-select"
            classNamePrefix="Lineas"
            placeholder='Seleccione sus Lineas'
          />
        );
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_CATEGORIA:
        return (
          <Select
            isMulti
            name="categotias"
            isSearchable={true}
            options={data_categorias.map(objeto => ({
              ...objeto,
              value: objeto.id,
              label: objeto.nombreCategoria,
            }))}
            value={filter_categorias}
            onChange={(selectedOption) => {
              dispatch(filteringCategoriasProductos(selectedOption));
            }}
            className="basic-multi-select"
            classNamePrefix="Categorias"
            placeholder='Seleccione sus Categorias'
          />
        );
      case TypesProductos.StoreSelectors.SHOW_PRODUCTOS_MARCA:
        return (
          <Select
            isMulti
            name="marca"
            isSearchable={true}
            options={data_marcas.map(objeto => ({
              ...objeto,
              value: objeto.id,
              label: objeto.nombreMarca,
            }))}
            value={filter_marcas}
            onChange={(selectedOption) => {
              dispatch(filteringMarcasProductos(selectedOption));
            }}
            className="basic-multi-select"
            classNamePrefix="Marcas"
            placeholder='Seleccione sus Marcas'
          />
        );
      default:
        return null;
    }
  }, [filtro, data_lineas, data_categorias, data_marcas, filter_lineas, filter_categorias, filter_marcas, dispatch]);

  const lineas = data_lineas.reduce((res, value) => {
    if (!res[value.id]) {
      res[value.id] = value.nombreLinea;
    }
    return res;
  }, {});

  const categorias = data_categorias.reduce((res, value) => {
    if (!res[value.id]) {
      res[value.id] = value.nombreCategoria;
    }
    return res;
  }, {});

  const marcas = data_marcas.reduce((res, value) => {
    if (!res[value.id]) {
      res[value.id] = value.nombreMarca;
    }
    return res;
  }, {});



  return (
    <>
      {activeStepComponent()}
      {!!categoriaAtributos && (
        <Modal open={categoriaAtributos !== undefined}
          onClose={() => setOpenAtributos()}
          maxWidth='md'
          sx={{ padding: 4 }} >
          <CategoriasAtributosTable id={categoriaAtributos.id} />
        </Modal>)
      }

      <DrawerFiltrosTable
        open={open_filtro}
        setOpen={openFiltroData}
        filtering={filtering}
        grouping={grouping}
        filteringApp={filteringProductos}
        groupingApp={groupingProductos}
        filter_fechas={null}

      >
        <CheckLineas data={data_lineas} filter={filter_lineas} filtering={filteringLineasProductos} />
        <CheckCategorias data={data_categorias} filter={filter_categorias} filtering={filteringCategoriasProductos} />

        <CheckMarcas data={data_marcas} filter={filter_marcas} filtering={filteringMarcasProductos} />


        <Divider variant="middle" >Otros Filtros</Divider>
        <FilterComponent data={propiedadesUnicas} onFilterChange={handleFilterChange} />


      </DrawerFiltrosTable>

    </>
  );
}


Productos.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} >{page}</LayoutApp>;
};


