/* eslint-disable react/display-name */
import {
  AddBoxTwoTone,
  ArrowDownwardTwoTone,
  CheckTwoTone,
  ChevronLeftTwoTone,
  ChevronRightTwoTone,
  ClearTwoTone,
  ContentPasteSearchTwoTone,
  DeleteOutlineTwoTone,
  EditTwoTone,
  FilterListTwoTone,
  FirstPageTwoTone,
  LastPageTwoTone,
  RemoveTwoTone,
  SaveAltTwoTone,
  SearchOffTwoTone,
  ViewColumnTwoTone,
} from "@mui/icons-material";
import { forwardRef } from "react";
import { Estado } from "../../models";
import TypesModulos from "../../types/typesModulos";
import TypesConfiguracion from "../../types/typesConfiguracion";


const initialState = {
  loading_pag: false,

  title: "",
  subtitle: "",
  online: true,
  status: true,
  open_filtro: false,

  loading_pag_message: "CARGANDO APP",
  material_table: {
    options: {
      headerStyle: {
        backgroundColor: "#34495E",
        color: "#FFF",
      },
      actionsCellStyle: {
        backgroundColor: "#566573",
        color: "red",
        border: 1,
      },
      searchFieldStyle: {



        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

        fontWeight: "bold",


      },
      rowStyle: rowData => ({
        color: (Estado.INACTIVO === rowData.estado) ? 'red' : 'black',
        margin: '1px', // Reducir el margen
        padding: '1px', // Reducir el padding
        fontSize: '14px', // Reducir el tamaño de la letra
        fontWeight: 500, // Poner la letra en negrita
        backgroundColor: rowData.createdAt == null ? '#FFCDD2' : '#FFF'
      }),
      actionsColumnIndex: -1,
      pageSize: 10,
      padding: "dense",

      pageSizeOptions: [5, 10, 15, 30, 50, 75, 100, 150, 200],
      showEmptyDataSourceMessage: true,

      searchFieldAlignment: "right",
    },
    icons: {
      Add: forwardRef((props, ref) => (
        <AddBoxTwoTone
          {...props}
          ref={ref}
          color="secondary"
          sx={{ fontSize: 24 }}
        />
      )),
      Check: forwardRef((props, ref) => (
        <CheckTwoTone
          {...props}
          ref={ref}
          color="primary"
          sx={{ fontSize: 24 }}
        />
      )),
      Clear: forwardRef((props, ref) => (
        <ClearTwoTone
          {...props}
          ref={ref}
          color="error"
          sx={{ fontSize: 24 }}
        />
      )),
      Delete: forwardRef((props, ref) => (
        <DeleteOutlineTwoTone
          {...props}
          ref={ref}
          color="error"
          sx={{ fontSize: 24 }}
        />
      )),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRightTwoTone {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => (
        <EditTwoTone
          {...props}
          ref={ref}
          color="primary"
          sx={{ fontSize: 24 }}
        />
      )),
      Export: forwardRef((props, ref) => (
        <SaveAltTwoTone
          {...props}
          ref={ref}
          color="info"
          sx={{ fontSize: 24 }}
        />
      )),
      Filter: forwardRef((props, ref) => (
        <FilterListTwoTone {...props} ref={ref} />
      )),
      FirstPage: forwardRef((props, ref) => (
        <FirstPageTwoTone {...props} ref={ref} />
      )),
      LastPage: forwardRef((props, ref) => (
        <LastPageTwoTone {...props} ref={ref} />
      )),
      NextPage: forwardRef((props, ref) => (
        <ChevronRightTwoTone {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeftTwoTone {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => (
        <SearchOffTwoTone {...props} ref={ref} color="error" />
      )),
      Search: forwardRef((props, ref) => (
        <ContentPasteSearchTwoTone {...props} ref={ref} color="primary" />
      )),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownwardTwoTone {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <RemoveTwoTone {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumnTwoTone
          {...props}
          ref={ref}
          color="action"
          sx={{ fontSize: 24 }}
        />
      )),
    },
    localization: {
      body: {
        emptyDataSourceMessage: "No hay registros que mostrar",
        addTooltip: "Agregar",
        editTooltip: "Editar",
        editAllTooltip: "ss",
        deleteTooltip: "Eliminar",
        filterRow: {
          filterPlaceHolder: "Filtar",
          filterTooltip: "Filtrar",
        },
        editRow: {
          deleteText: "¿Está seguro de Inactivar esta fila?",
          cancelTooltip: "Cancelar",
          saveTooltip: "Aceptar",
        },
      },
      grouping: {
        placeholder: "Arrastra los encabezados para agrupar",
        groupedBy: "Agrupado por:",
      },
      header: {
        actions: "",
      },
      pagination: {
        labelDisplayedRows: "{from}-{to} de {count}",
        labelRows: 'filas',
        labelRowsSelect: "",
        labelRowsPerPage: "",
        firstTooltip: "Primera Pagina",
        previousTooltip: "Pagina Anterior",
        nextTooltip: "Siguiente Pagina",
        lastTooltip: "Ultima Pagina",
      },
      toolbar: {
        exportTitle: "Importar o Exportar",
        searchTooltip: "Buscar",
        searchPlaceholder: "Buscar",
        addRemoveColumns: "Agregar o quitar columnas",
        showColumnsTitle: "Mostrar Columnas",
        nRowsSelected: "{0} filas(s) seleccionadas",

      },
    },
    style: {
      border: "3px solid grey",
      borderRadius: 8,
     // boxShadow: "12px -12px 5px 0px rgb(81,90,90)",
      padding: "5px",
    },
  },
  mode: "light",
  data: [],
  loading: false,
  filtering: false,
  filtering_fecha: {
    start: "",
    end: "",
  },
  grouping: false,

  listado_cuotas: [
    {
      value: 1,
      label: 1,
    },
    {
      value: 0.5,
      label: 2,
    },
    {
      value: 0.3333333333,
      label: 3,
    },
    {
      value: 0.266,
      label: 4,
    },
    {
      value: 0.216,
      label: 5,
    },
    {
      value: 0.183,
      label: 6,
    },
    {
      value: 0.159,
      label: 7,
    },
    {
      value: 0.141,
      label: 8,
    },
    {
      value: 0.128,
      label: 9,
    },
    {
      value: 0.117,
      label: 10,
    },
    {
      value: 0.108,
      label: 11,
    },
    {
      value: 0.101,
      label: 12,
    },

    {
      value: 0.094,
      label: 15,
    },
    {
      value: 0.089,
      label: 16,
    },
    {
      value: 0.084,
      label: 17,
    },
    {
      value: 0.073,
      label: 18,
    },
    {
      value: 0.07,
      label: 19,
    },
    {
      value: 0.067,
      label: 20,
    },
    {
      value: 0.065,
      label: 21,
    },
    {
      value: 0.063,
      label: 22,
    },
    {
      value: 0.061,
      label: 23,
    },
    {
      value: 0.059,
      label: 24,
    },
    {
      value: 0.0574227,
      label: 25,
    },
    {
      value: 0.055938,
      label: 26,
    },
    {
      value: 0.05456,
      label: 27,
    },
    {
      value: 0.053293,
      label: 28,
    },
    {
      value: 0.0521146,
      label: 29,
    },
    {
      value: 0.0510192,
      label: 30,
    },
    {
      value: 0.0499989,
      label: 31,
    },
    {
      value: 0.04904662,
      label: 32,
    },
    {
      value: 0.0481561,
      label: 33,
    },
    {
      value: 0.0473219,
      label: 34,
    },
    {
      value: 0.0465392,
      label: 35,
    },
    {
      value: 0.0458037,
      label: 36,
    },
  ],
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case TypesModulos.StoreConstants.NETWORK_STATUS:
      return {
        ...state,
        online: action.online,
      };
    case TypesModulos.StoreConstants.OUT_BOX_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case TypesModulos.StoreConstants.LOADING_PAGINA:
      return {
        ...state,
        loading_pag: true,
        loading_pag_message: action.loading_pag_message,
      };
    case TypesModulos.StoreConstants.STOP_LOADING_PAGINA:
      return {
        ...state,
        loading_pag: false,
        loading_pag_message: "COMPLETADO",
      };
    case TypesConfiguracion.StoreConstants.OPEN_FILTRO:
      return {
        ...state,
        open_filtro: action.open_filtro,
      };

    default:
      return state;
  }
}
