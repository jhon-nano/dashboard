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



  organizationTypeArray: [
    {
      code: 1,
      value: "Persona Jurídica y asimiladas"
    },
    {
      code: 2,
      value: "Persona Natural y asimiladas"
    }
  ],
  identificationTypeArray: [
    {
      "code": "11",
      "value": "Registro civil"
    },
    {
      "code": "12",
      "value": "Tarjeta de identidad"
    },
    {
      "code": "13",
      "value": "Cédula de ciudadanía"
    },
    {
      "code": "21",
      "value": "Tarjeta de extranjería"
    },
    {
      "code": "22",
      "value": "Cédula de extranjería"
    },
    {
      "code": "31",
      "value": "NIT"
    },
    {
      "code": "41",
      "value": "Pasaporte"
    },
    {
      "code": "42",
      "value": "Documento de identificación extranjero"
    },
    {
      "code": "47",
      "value": "PEP (Permiso especial de permanencia)"
    },
    {
      "code": "48",
      "value": "PPT (Permiso protección temporal)"
    },
    {
      "code": "50",
      "value": "NIT de otro país"
    },
    {
      "code": "91",
      "value": "NUIP"
    }
  ],
  municipalities: [
    {
      "id": 1,
      "code": "05002",
      "value": "Abejorral",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 2,
      "code": "54003",
      "value": "Abrego",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 3,
      "code": "05004",
      "value": "Abriaquí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 4,
      "code": "50006",
      "value": "Acacias",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 5,
      "code": "27006",
      "value": "Acandí",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 6,
      "code": "41006",
      "value": "Acevedo",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 7,
      "code": "13006",
      "value": "Achí",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 8,
      "code": "41013",
      "value": "Agrado",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 9,
      "code": "25001",
      "value": "Agua De Dios",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 10,
      "code": "20011",
      "value": "Aguachica",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 11,
      "code": "68013",
      "value": "Aguada",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 12,
      "code": "17013",
      "value": "Aguadas",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 13,
      "code": "85010",
      "value": "Aguazul",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 14,
      "code": "20013",
      "value": "Agustín Codazzi",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 15,
      "code": "41016",
      "value": "Aipe",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 16,
      "code": "52019",
      "value": "Alban",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 17,
      "code": "25019",
      "value": "Albán",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 18,
      "code": "18029",
      "value": "Albania",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 19,
      "code": "44035",
      "value": "Albania",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 20,
      "code": "68020",
      "value": "Albania",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 21,
      "code": "76020",
      "value": "Alcala",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 22,
      "code": "52022",
      "value": "Aldana",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 23,
      "code": "05021",
      "value": "Alejandría",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 24,
      "code": "47030",
      "value": "Algarrobo",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 25,
      "code": "41020",
      "value": "Algeciras",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 26,
      "code": "19022",
      "value": "Almaguer",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 27,
      "code": "15022",
      "value": "Almeida",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 28,
      "code": "73024",
      "value": "Alpujarra",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 29,
      "code": "41026",
      "value": "Altamira",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 30,
      "code": "27025",
      "value": "Alto Baudó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 31,
      "code": "13030",
      "value": "Altos Del Rosario",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 32,
      "code": "73026",
      "value": "Alvarado",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 33,
      "code": "05030",
      "value": "Amaga",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 34,
      "code": "05031",
      "value": "Amalfi",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 35,
      "code": "73030",
      "value": "Ambalema",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 36,
      "code": "25035",
      "value": "Anapoima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 37,
      "code": "52036",
      "value": "Ancuya",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 38,
      "code": "76036",
      "value": "Andalucía",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 39,
      "code": "05034",
      "value": "Andes",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 40,
      "code": "05036",
      "value": "Angelopolis",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 41,
      "code": "05038",
      "value": "Angostura",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 42,
      "code": "25040",
      "value": "Anolaima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 43,
      "code": "05040",
      "value": "Anorí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 44,
      "code": "17042",
      "value": "Anserma",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 45,
      "code": "76041",
      "value": "Ansermanuevo",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 46,
      "code": "05044",
      "value": "Anza",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 47,
      "code": "73043",
      "value": "Anzoátegui",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 48,
      "code": "05045",
      "value": "Apartadó",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 49,
      "code": "66045",
      "value": "Apía",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 50,
      "code": "25599",
      "value": "Apulo",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 51,
      "code": "15047",
      "value": "Aquitania",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 52,
      "code": "47053",
      "value": "Aracataca",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 53,
      "code": "17050",
      "value": "Aranzazu",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 54,
      "code": "68051",
      "value": "Aratoca",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 55,
      "code": "81001",
      "value": "Arauca",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 56,
      "code": "81065",
      "value": "Arauquita",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 57,
      "code": "25053",
      "value": "Arbeláez",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 58,
      "code": "52051",
      "value": "Arboleda",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 59,
      "code": "54051",
      "value": "Arboledas",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 60,
      "code": "05051",
      "value": "Arboletes",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 61,
      "code": "15051",
      "value": "Arcabuco",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 62,
      "code": "13042",
      "value": "Arenal",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 63,
      "code": "05055",
      "value": "Argelia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 64,
      "code": "19050",
      "value": "Argelia",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 65,
      "code": "76054",
      "value": "Argelia",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 66,
      "code": "47058",
      "value": "Ariguaní",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 67,
      "code": "13052",
      "value": "Arjona",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 68,
      "code": "05059",
      "value": "Armenia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 69,
      "code": "63001",
      "value": "Armenia",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 70,
      "code": "73055",
      "value": "Armero",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 71,
      "code": "13062",
      "value": "Arroyohondo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 72,
      "code": "20032",
      "value": "Astrea",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 73,
      "code": "73067",
      "value": "Ataco",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 74,
      "code": "27050",
      "value": "Atrato",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 75,
      "code": "23068",
      "value": "Ayapel",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 76,
      "code": "27073",
      "value": "Bagadó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 77,
      "code": "27075",
      "value": "Bahía Solano",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 78,
      "code": "27077",
      "value": "Bajo Baudó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 79,
      "code": "19075",
      "value": "Balboa",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 80,
      "code": "66075",
      "value": "Balboa",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 81,
      "code": "08078",
      "value": "Baranoa",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 82,
      "code": "41078",
      "value": "Baraya",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 83,
      "code": "52079",
      "value": "Barbacoas",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 84,
      "code": "05079",
      "value": "Barbosa",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 85,
      "code": "68077",
      "value": "Barbosa",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 86,
      "code": "68079",
      "value": "Barichara",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 87,
      "code": "50110",
      "value": "Barranca De Upia",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 88,
      "code": "68081",
      "value": "Barrancabermeja",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 89,
      "code": "44078",
      "value": "Barrancas",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 90,
      "code": "13074",
      "value": "Barranco De Loba",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 91,
      "code": "94343",
      "value": "Barranco Mina",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 92,
      "code": "08001",
      "value": "Barranquilla",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 93,
      "code": "20045",
      "value": "Becerril",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 94,
      "code": "17088",
      "value": "Belalcázar",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 95,
      "code": "52083",
      "value": "Belen",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 96,
      "code": "15087",
      "value": "Belén",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 97,
      "code": "27086",
      "value": "Belén De Bajira",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 98,
      "code": "18094",
      "value": "Belén De Los Andaquies",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 99,
      "code": "66088",
      "value": "Belén De Umbría",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 100,
      "code": "05088",
      "value": "Bello",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 101,
      "code": "05086",
      "value": "Belmira",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 102,
      "code": "25086",
      "value": "Beltrán",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 103,
      "code": "15090",
      "value": "Berbeo",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 104,
      "code": "05091",
      "value": "Betania",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 105,
      "code": "15092",
      "value": "Betéitiva",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 106,
      "code": "05093",
      "value": "Betulia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 107,
      "code": "68092",
      "value": "Betulia",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 108,
      "code": "25095",
      "value": "Bituima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 109,
      "code": "15097",
      "value": "Boavita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 110,
      "code": "54099",
      "value": "Bochalema",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 111,
      "code": "11001",
      "value": "Bogotá, D.C.",
      "departmentCode": "11",
      "departmentValue": "Bogotá, D.C."
    },
    {
      "id": 112,
      "code": "25099",
      "value": "Bojacá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 113,
      "code": "27099",
      "value": "Bojaya",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 114,
      "code": "19100",
      "value": "Bolívar",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 115,
      "code": "68101",
      "value": "Bolívar",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 116,
      "code": "76100",
      "value": "Bolívar",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 117,
      "code": "20060",
      "value": "Bosconia",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 118,
      "code": "15104",
      "value": "Boyacá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 119,
      "code": "05107",
      "value": "Briceño",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 120,
      "code": "15106",
      "value": "Briceño",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 121,
      "code": "68001",
      "value": "Bucaramanga",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 122,
      "code": "54109",
      "value": "Bucarasica",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 123,
      "code": "76109",
      "value": "Buenaventura",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 124,
      "code": "15109",
      "value": "Buenavista",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 125,
      "code": "23079",
      "value": "Buenavista",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 126,
      "code": "63111",
      "value": "Buenavista",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 127,
      "code": "70110",
      "value": "Buenavista",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 128,
      "code": "19110",
      "value": "Buenos Aires",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 129,
      "code": "52110",
      "value": "Buesaco",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 130,
      "code": "76111",
      "value": "Buga",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 131,
      "code": "76113",
      "value": "Bugalagrande",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 132,
      "code": "05113",
      "value": "Buriticá",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 133,
      "code": "15114",
      "value": "Busbanzá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 134,
      "code": "25120",
      "value": "Cabrera",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 135,
      "code": "68121",
      "value": "Cabrera",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 136,
      "code": "50124",
      "value": "Cabuyaro",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 137,
      "code": "94886",
      "value": "Cacahual",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 138,
      "code": "05120",
      "value": "Cáceres",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 139,
      "code": "25123",
      "value": "Cachipay",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 140,
      "code": "54128",
      "value": "Cachirá",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 141,
      "code": "54125",
      "value": "Cácota",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 142,
      "code": "05125",
      "value": "Caicedo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 143,
      "code": "76122",
      "value": "Caicedonia",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 144,
      "code": "70124",
      "value": "Caimito",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 145,
      "code": "73124",
      "value": "Cajamarca",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 146,
      "code": "19130",
      "value": "Cajibío",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 147,
      "code": "25126",
      "value": "Cajicá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 148,
      "code": "13140",
      "value": "Calamar",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 149,
      "code": "95015",
      "value": "Calamar",
      "departmentCode": "95",
      "departmentValue": "Guaviare"
    },
    {
      "id": 150,
      "code": "63130",
      "value": "Calarca",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 151,
      "code": "05129",
      "value": "Caldas",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 152,
      "code": "15131",
      "value": "Caldas",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 153,
      "code": "19137",
      "value": "Caldono",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 154,
      "code": "76001",
      "value": "Cali",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 155,
      "code": "68132",
      "value": "California",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 156,
      "code": "76126",
      "value": "Calima",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 157,
      "code": "19142",
      "value": "Caloto",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 158,
      "code": "05134",
      "value": "Campamento",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 159,
      "code": "08137",
      "value": "Campo De La Cruz",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 160,
      "code": "41132",
      "value": "Campoalegre",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 161,
      "code": "15135",
      "value": "Campohermoso",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 162,
      "code": "23090",
      "value": "Canalete",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 163,
      "code": "08141",
      "value": "Candelaria",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 164,
      "code": "76130",
      "value": "Candelaria",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 165,
      "code": "13160",
      "value": "Cantagallo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 166,
      "code": "27135",
      "value": "Canton De San Pablo",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 167,
      "code": "05138",
      "value": "Cañasgordas",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 168,
      "code": "25148",
      "value": "Caparrapí",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 169,
      "code": "68147",
      "value": "Capitanejo",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 170,
      "code": "25151",
      "value": "Caqueza",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 171,
      "code": "05142",
      "value": "Caracolí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 172,
      "code": "05145",
      "value": "Caramanta",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 173,
      "code": "68152",
      "value": "Carcasí",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 174,
      "code": "05147",
      "value": "Carepa",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 175,
      "code": "73148",
      "value": "Carmen De Apicalá",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 176,
      "code": "13244",
      "value": "Carmen De Bolívar",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 177,
      "code": "25154",
      "value": "Carmen De Carupa",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 178,
      "code": "05148",
      "value": "Carmen De Viboral",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 179,
      "code": "27150",
      "value": "Carmén Del Darién",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 180,
      "code": "05150",
      "value": "Carolina",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 181,
      "code": "13001",
      "value": "Cartagena",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 182,
      "code": "18150",
      "value": "Cartagena Del Chairá",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 183,
      "code": "76147",
      "value": "Cartago",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 184,
      "code": "97161",
      "value": "Caruru",
      "departmentCode": "97",
      "departmentValue": "Vaupés"
    },
    {
      "id": 185,
      "code": "73152",
      "value": "Casabianca",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 186,
      "code": "50150",
      "value": "Castilla La Nueva",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 187,
      "code": "05154",
      "value": "Caucasia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 188,
      "code": "68160",
      "value": "Cepitá",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 189,
      "code": "23162",
      "value": "Cereté",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 190,
      "code": "15162",
      "value": "Cerinza",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 191,
      "code": "68162",
      "value": "Cerrito",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 192,
      "code": "47161",
      "value": "Cerro San Antonio",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 193,
      "code": "27160",
      "value": "Certegui",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 194,
      "code": "52240",
      "value": "Chachagui",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 195,
      "code": "25168",
      "value": "Chaguaní",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 196,
      "code": "70230",
      "value": "Chalán",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 197,
      "code": "85015",
      "value": "Chameza",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 198,
      "code": "73168",
      "value": "Chaparral",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 199,
      "code": "68167",
      "value": "Charalá",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 200,
      "code": "68169",
      "value": "Charta",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 201,
      "code": "25175",
      "value": "Chía",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 202,
      "code": "47170",
      "value": "Chibolo",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 203,
      "code": "05172",
      "value": "Chigorodó",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 204,
      "code": "68176",
      "value": "Chima",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 205,
      "code": "23168",
      "value": "Chimá",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 206,
      "code": "20175",
      "value": "Chimichagua",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 207,
      "code": "54172",
      "value": "Chinácota",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 208,
      "code": "15172",
      "value": "Chinavita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 209,
      "code": "17174",
      "value": "Chinchina",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 210,
      "code": "23182",
      "value": "Chinú",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 211,
      "code": "25178",
      "value": "Chipaque",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 212,
      "code": "68179",
      "value": "Chipatá",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 213,
      "code": "15176",
      "value": "Chiquinquirá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 214,
      "code": "15232",
      "value": "Chíquiza",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 215,
      "code": "20178",
      "value": "Chiriguana",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 216,
      "code": "15180",
      "value": "Chiscas",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 217,
      "code": "15183",
      "value": "Chita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 218,
      "code": "54174",
      "value": "Chitagá",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 219,
      "code": "15185",
      "value": "Chitaraque",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 220,
      "code": "15187",
      "value": "Chivatá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 221,
      "code": "15236",
      "value": "Chivor",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 222,
      "code": "25181",
      "value": "Choachí",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 223,
      "code": "25183",
      "value": "Chocontá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 224,
      "code": "13188",
      "value": "Cicuco",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 225,
      "code": "47189",
      "value": "Ciénaga",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 226,
      "code": "23189",
      "value": "Ciénaga De Oro",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 227,
      "code": "15189",
      "value": "Ciénega",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 228,
      "code": "68190",
      "value": "Cimitarra",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 229,
      "code": "63190",
      "value": "Circasia",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 230,
      "code": "05190",
      "value": "Cisneros",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 231,
      "code": "05101",
      "value": "Ciudad Bolívar",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 232,
      "code": "13222",
      "value": "Clemencia",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 233,
      "code": "05197",
      "value": "Cocorná",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 234,
      "code": "73200",
      "value": "Coello",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 235,
      "code": "25200",
      "value": "Cogua",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 236,
      "code": "41206",
      "value": "Colombia",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 237,
      "code": "52203",
      "value": "Colon",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 238,
      "code": "86219",
      "value": "Colón",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 239,
      "code": "70204",
      "value": "Coloso",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 240,
      "code": "15204",
      "value": "Cómbita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 241,
      "code": "05206",
      "value": "Concepción",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 242,
      "code": "68207",
      "value": "Concepción",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 243,
      "code": "05209",
      "value": "Concordia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 244,
      "code": "47205",
      "value": "Concordia",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 245,
      "code": "27205",
      "value": "Condoto",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 246,
      "code": "68209",
      "value": "Confines",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 247,
      "code": "52207",
      "value": "Consaca",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 248,
      "code": "52210",
      "value": "Contadero",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 249,
      "code": "68211",
      "value": "Contratación",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 250,
      "code": "54206",
      "value": "Convención",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 251,
      "code": "05212",
      "value": "Copacabana",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 252,
      "code": "15212",
      "value": "Coper",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 253,
      "code": "63212",
      "value": "Cordoba",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 254,
      "code": "13212",
      "value": "Córdoba",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 255,
      "code": "52215",
      "value": "Córdoba",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 256,
      "code": "19212",
      "value": "Corinto",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 257,
      "code": "68217",
      "value": "Coromoro",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 258,
      "code": "70215",
      "value": "Corozal",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 259,
      "code": "15215",
      "value": "Corrales",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 260,
      "code": "25214",
      "value": "Cota",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 261,
      "code": "23300",
      "value": "Cotorra",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 262,
      "code": "15218",
      "value": "Covarachía",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 263,
      "code": "70221",
      "value": "Coveñas",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 264,
      "code": "73217",
      "value": "Coyaima",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 265,
      "code": "81220",
      "value": "Cravo Norte",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 266,
      "code": "52224",
      "value": "Cuaspud",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 267,
      "code": "15223",
      "value": "Cubará",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 268,
      "code": "15224",
      "value": "Cucaita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 269,
      "code": "25224",
      "value": "Cucunubá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 270,
      "code": "54001",
      "value": "Cúcuta",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 271,
      "code": "54223",
      "value": "Cucutilla",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 272,
      "code": "15226",
      "value": "Cuítiva",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 273,
      "code": "50226",
      "value": "Cumaral",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 274,
      "code": "99773",
      "value": "Cumaribo",
      "departmentCode": "99",
      "departmentValue": "Vichada"
    },
    {
      "id": 275,
      "code": "52227",
      "value": "Cumbal",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 276,
      "code": "52233",
      "value": "Cumbitara",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 277,
      "code": "73226",
      "value": "Cunday",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 278,
      "code": "68229",
      "value": "Curití",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 279,
      "code": "18205",
      "value": "Currillo",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 280,
      "code": "20228",
      "value": "Curumaní",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 281,
      "code": "05234",
      "value": "Dabeiba",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 282,
      "code": "76233",
      "value": "Dagua",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 283,
      "code": "44090",
      "value": "Dibulla",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 284,
      "code": "44098",
      "value": "Distraccion",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 285,
      "code": "73236",
      "value": "Dolores",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 286,
      "code": "05237",
      "value": "Don Matias",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 287,
      "code": "66170",
      "value": "Dosquebradas",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 288,
      "code": "15238",
      "value": "Duitama",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 289,
      "code": "54239",
      "value": "Durania",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 290,
      "code": "05240",
      "value": "Ebéjico",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 291,
      "code": "76243",
      "value": "El Águila",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 292,
      "code": "05250",
      "value": "El Bagre",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 293,
      "code": "47245",
      "value": "El Banco",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 294,
      "code": "76246",
      "value": "El Cairo",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 295,
      "code": "50245",
      "value": "El Calvario",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 296,
      "code": "54245",
      "value": "El Carmen",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 297,
      "code": "27245",
      "value": "El Carmen De Atrato",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 298,
      "code": "68235",
      "value": "El Carmen De Chucurí",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 299,
      "code": "50251",
      "value": "El Castillo",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 300,
      "code": "76248",
      "value": "El Cerrito",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 301,
      "code": "52250",
      "value": "El Charco",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 302,
      "code": "15244",
      "value": "El Cocuy",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 303,
      "code": "25245",
      "value": "El Colegio",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 304,
      "code": "20238",
      "value": "El Copey",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 305,
      "code": "18247",
      "value": "El Doncello",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 306,
      "code": "50270",
      "value": "El Dorado",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 307,
      "code": "76250",
      "value": "El Dovio",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 308,
      "code": "91263",
      "value": "El Encanto",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 309,
      "code": "15248",
      "value": "El Espino",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 310,
      "code": "68245",
      "value": "El Guacamayo",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 311,
      "code": "13248",
      "value": "El Guamo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 312,
      "code": "27250",
      "value": "El Litoral Del San Juan",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 313,
      "code": "44110",
      "value": "El Molino",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 314,
      "code": "20250",
      "value": "El Paso",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 315,
      "code": "18256",
      "value": "El Paujil",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 316,
      "code": "52254",
      "value": "El Peñol",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 317,
      "code": "13268",
      "value": "El Peñon",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 318,
      "code": "25258",
      "value": "El Peñón",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 319,
      "code": "68250",
      "value": "El Peñón",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 320,
      "code": "47258",
      "value": "El Piñon",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 321,
      "code": "68255",
      "value": "El Playón",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 322,
      "code": "47268",
      "value": "El Reten",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 323,
      "code": "95025",
      "value": "El Retorno",
      "departmentCode": "95",
      "departmentValue": "Guaviare"
    },
    {
      "id": 324,
      "code": "70233",
      "value": "El Roble",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 325,
      "code": "25260",
      "value": "El Rosal",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 326,
      "code": "52256",
      "value": "El Rosario",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 327,
      "code": "52258",
      "value": "El Tablon De Gomez",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 328,
      "code": "19256",
      "value": "El Tambo",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 329,
      "code": "52260",
      "value": "El Tambo",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 330,
      "code": "54250",
      "value": "El Tarra",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 331,
      "code": "54261",
      "value": "El Zulia",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 332,
      "code": "41244",
      "value": "Elías",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 333,
      "code": "68264",
      "value": "Encino",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 334,
      "code": "68266",
      "value": "Enciso",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 335,
      "code": "05264",
      "value": "Entrerrios",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 336,
      "code": "05266",
      "value": "Envigado",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 337,
      "code": "73268",
      "value": "Espinal",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 338,
      "code": "25269",
      "value": "Facatativá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 339,
      "code": "73270",
      "value": "Falan",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 340,
      "code": "17272",
      "value": "Filadelfia",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 341,
      "code": "63272",
      "value": "Filandia",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 342,
      "code": "15272",
      "value": "Firavitoba",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 343,
      "code": "73275",
      "value": "Flandes",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 344,
      "code": "18001",
      "value": "Florencia",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 345,
      "code": "19290",
      "value": "Florencia",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 346,
      "code": "15276",
      "value": "Floresta",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 347,
      "code": "68271",
      "value": "Florián",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 348,
      "code": "76275",
      "value": "Florida",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 349,
      "code": "68276",
      "value": "Floridablanca",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 350,
      "code": "25279",
      "value": "Fomeque",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 351,
      "code": "44279",
      "value": "Fonseca",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 352,
      "code": "81300",
      "value": "Fortul",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 353,
      "code": "25281",
      "value": "Fosca",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 354,
      "code": "52520",
      "value": "Francisco Pizarro",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 355,
      "code": "05282",
      "value": "Fredonia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 356,
      "code": "73283",
      "value": "Fresno",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 357,
      "code": "05284",
      "value": "Frontino",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 358,
      "code": "50287",
      "value": "Fuente De Oro",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 359,
      "code": "47288",
      "value": "Fundacion",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 360,
      "code": "52287",
      "value": "Funes",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 361,
      "code": "25286",
      "value": "Funza",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 362,
      "code": "25288",
      "value": "Fúquene",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 363,
      "code": "25290",
      "value": "Fusagasugá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 364,
      "code": "25293",
      "value": "Gachala",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 365,
      "code": "25295",
      "value": "Gachancipá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 366,
      "code": "15293",
      "value": "Gachantivá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 367,
      "code": "25297",
      "value": "Gacheta",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 368,
      "code": "68296",
      "value": "Galán",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 369,
      "code": "08296",
      "value": "Galapa",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 370,
      "code": "70235",
      "value": "Galeras",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 371,
      "code": "25299",
      "value": "Gama",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 372,
      "code": "20295",
      "value": "Gamarra",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 373,
      "code": "68298",
      "value": "Gambita",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 374,
      "code": "15296",
      "value": "Gameza",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 375,
      "code": "15299",
      "value": "Garagoa",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 376,
      "code": "41298",
      "value": "Garzón",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 377,
      "code": "63302",
      "value": "Genova",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 378,
      "code": "41306",
      "value": "Gigante",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 379,
      "code": "76306",
      "value": "Ginebra",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 380,
      "code": "05306",
      "value": "Giraldo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 381,
      "code": "25307",
      "value": "Girardot",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 382,
      "code": "05308",
      "value": "Girardota",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 383,
      "code": "68307",
      "value": "Girón",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 384,
      "code": "05310",
      "value": "Gómez Plata",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 385,
      "code": "20310",
      "value": "González",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 386,
      "code": "54313",
      "value": "Gramalote",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 387,
      "code": "05313",
      "value": "Granada",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 388,
      "code": "25312",
      "value": "Granada",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 389,
      "code": "50313",
      "value": "Granada",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 390,
      "code": "68318",
      "value": "Guaca",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 391,
      "code": "15317",
      "value": "Guacamayas",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 392,
      "code": "76318",
      "value": "Guacarí",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 393,
      "code": "25317",
      "value": "Guachetá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 394,
      "code": "52317",
      "value": "Guachucal",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 395,
      "code": "05315",
      "value": "Guadalupe",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 396,
      "code": "41319",
      "value": "Guadalupe",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 397,
      "code": "68320",
      "value": "Guadalupe",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 398,
      "code": "25320",
      "value": "Guaduas",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 399,
      "code": "52320",
      "value": "Guaitarilla",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 400,
      "code": "52323",
      "value": "Gualmatan",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 401,
      "code": "47318",
      "value": "Guamal",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 402,
      "code": "50318",
      "value": "Guamal",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 403,
      "code": "73319",
      "value": "Guamo",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 404,
      "code": "19318",
      "value": "Guapi",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 405,
      "code": "68322",
      "value": "Guapotá",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 406,
      "code": "70265",
      "value": "Guaranda",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 407,
      "code": "05318",
      "value": "Guarne",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 408,
      "code": "25322",
      "value": "Guasca",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 409,
      "code": "05321",
      "value": "Guatape",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 410,
      "code": "25324",
      "value": "Guataquí",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 411,
      "code": "25326",
      "value": "Guatavita",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 412,
      "code": "15322",
      "value": "Guateque",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 413,
      "code": "66318",
      "value": "Guática",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 414,
      "code": "68324",
      "value": "Guavatá",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 415,
      "code": "25328",
      "value": "Guayabal De Siquima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 416,
      "code": "25335",
      "value": "Guayabetal",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 417,
      "code": "15325",
      "value": "Guayatá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 418,
      "code": "68327",
      "value": "Guepsa",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 419,
      "code": "15332",
      "value": "Güicán",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 420,
      "code": "25339",
      "value": "Gutiérrez",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 421,
      "code": "54344",
      "value": "Hacarí",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 422,
      "code": "13300",
      "value": "Hatillo De Loba",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 423,
      "code": "68344",
      "value": "Hato",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 424,
      "code": "85125",
      "value": "Hato Corozal",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 425,
      "code": "44378",
      "value": "Hatonuevo",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 426,
      "code": "05347",
      "value": "Heliconia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 427,
      "code": "54347",
      "value": "Herrán",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 428,
      "code": "73347",
      "value": "Herveo",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 429,
      "code": "05353",
      "value": "Hispania",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 430,
      "code": "41349",
      "value": "Hobo",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 431,
      "code": "73349",
      "value": "Honda",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 432,
      "code": "73001",
      "value": "Ibague",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 433,
      "code": "73352",
      "value": "Icononzo",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 434,
      "code": "52352",
      "value": "Iles",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 435,
      "code": "52354",
      "value": "Imues",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 436,
      "code": "94001",
      "value": "Inírida",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 437,
      "code": "19355",
      "value": "Inzá",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 438,
      "code": "52356",
      "value": "Ipiales",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 439,
      "code": "41357",
      "value": "Iquira",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 440,
      "code": "41359",
      "value": "Isnos",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 441,
      "code": "05360",
      "value": "Itagui",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 442,
      "code": "27361",
      "value": "Itsmina",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 443,
      "code": "05361",
      "value": "Ituango",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 444,
      "code": "15362",
      "value": "Iza",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 445,
      "code": "19364",
      "value": "Jambalo",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 446,
      "code": "76364",
      "value": "Jamundí",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 447,
      "code": "05364",
      "value": "Jardín",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 448,
      "code": "15367",
      "value": "Jenesano",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 449,
      "code": "05368",
      "value": "Jericó",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 450,
      "code": "15368",
      "value": "Jericó",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 451,
      "code": "25368",
      "value": "Jerusalén",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 452,
      "code": "68368",
      "value": "Jesús María",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 453,
      "code": "68370",
      "value": "Jordán",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 454,
      "code": "08372",
      "value": "Juan De Acosta",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 455,
      "code": "25372",
      "value": "Junín",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 456,
      "code": "27372",
      "value": "Juradó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 457,
      "code": "23350",
      "value": "La Apartada",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 458,
      "code": "41378",
      "value": "La Argentina",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 459,
      "code": "68377",
      "value": "La Belleza",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 460,
      "code": "25377",
      "value": "La Calera",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 461,
      "code": "15380",
      "value": "La Capilla",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 462,
      "code": "05376",
      "value": "La Ceja",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 463,
      "code": "66383",
      "value": "La Celia",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 464,
      "code": "91405",
      "value": "La Chorrera",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 465,
      "code": "52378",
      "value": "La Cruz",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 466,
      "code": "76377",
      "value": "La Cumbre",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 467,
      "code": "17380",
      "value": "La Dorada",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 468,
      "code": "54385",
      "value": "La Esperanza",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 469,
      "code": "05380",
      "value": "La Estrella",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 470,
      "code": "52381",
      "value": "La Florida",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 471,
      "code": "20383",
      "value": "La Gloria",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 472,
      "code": "94885",
      "value": "La Guadalupe",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 473,
      "code": "20400",
      "value": "La Jagua De Ibirico",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 474,
      "code": "44420",
      "value": "La Jagua Del Pilar",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 475,
      "code": "52385",
      "value": "La Llanada",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 476,
      "code": "50350",
      "value": "La Macarena",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 477,
      "code": "17388",
      "value": "La Merced",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 478,
      "code": "25386",
      "value": "La Mesa",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 479,
      "code": "18410",
      "value": "La Montañita",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 480,
      "code": "25394",
      "value": "La Palma",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 481,
      "code": "20621",
      "value": "La Paz",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 482,
      "code": "68397",
      "value": "La Paz",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 483,
      "code": "91407",
      "value": "La Pedrera",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 484,
      "code": "25398",
      "value": "La Peña",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 485,
      "code": "05390",
      "value": "La Pintada",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 486,
      "code": "41396",
      "value": "La Plata",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 487,
      "code": "54398",
      "value": "La Playa",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 488,
      "code": "99524",
      "value": "La Primavera",
      "departmentCode": "99",
      "departmentValue": "Vichada"
    },
    {
      "id": 489,
      "code": "85136",
      "value": "La Salina",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 490,
      "code": "19392",
      "value": "La Sierra",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 491,
      "code": "63401",
      "value": "La Tebaida",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 492,
      "code": "52390",
      "value": "La Tola",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 493,
      "code": "52399",
      "value": "La Union",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 494,
      "code": "05400",
      "value": "La Unión",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 495,
      "code": "70400",
      "value": "La Unión",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 496,
      "code": "76400",
      "value": "La Unión",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 497,
      "code": "50370",
      "value": "La Uribe",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 498,
      "code": "15403",
      "value": "La Uvita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 499,
      "code": "19397",
      "value": "La Vega",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 500,
      "code": "25402",
      "value": "La Vega",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 501,
      "code": "91430",
      "value": "La Victoria",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 502,
      "code": "15401",
      "value": "La Victoria",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 503,
      "code": "76403",
      "value": "La Victoria",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 504,
      "code": "66400",
      "value": "La Virginia",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 505,
      "code": "54377",
      "value": "Labateca",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 506,
      "code": "15377",
      "value": "Labranzagrande",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 507,
      "code": "68385",
      "value": "Landázuri",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 508,
      "code": "68406",
      "value": "Lebríja",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 509,
      "code": "52405",
      "value": "Leiva",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 510,
      "code": "50400",
      "value": "Lejanías",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 511,
      "code": "25407",
      "value": "Lenguazaque",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 512,
      "code": "73408",
      "value": "Lerida",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 513,
      "code": "91001",
      "value": "Leticia",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 514,
      "code": "73411",
      "value": "Libano",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 515,
      "code": "05411",
      "value": "Liborina",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 516,
      "code": "52411",
      "value": "Linares",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 517,
      "code": "27413",
      "value": "Lloró",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 518,
      "code": "19418",
      "value": "Lopez",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 519,
      "code": "23417",
      "value": "Lorica",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 520,
      "code": "52418",
      "value": "Los Andes",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 521,
      "code": "23419",
      "value": "Los Córdobas",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 522,
      "code": "70418",
      "value": "Los Palmitos",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 523,
      "code": "54405",
      "value": "Los Patios",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 524,
      "code": "68418",
      "value": "Los Santos",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 525,
      "code": "54418",
      "value": "Lourdes",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 526,
      "code": "08421",
      "value": "Luruaco",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 527,
      "code": "15425",
      "value": "Macanal",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 528,
      "code": "68425",
      "value": "Macaravita",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 529,
      "code": "05425",
      "value": "Maceo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 530,
      "code": "25426",
      "value": "Macheta",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 531,
      "code": "25430",
      "value": "Madrid",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 532,
      "code": "13430",
      "value": "Magangué",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 533,
      "code": "52427",
      "value": "Magui",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 534,
      "code": "13433",
      "value": "Mahates",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 535,
      "code": "44430",
      "value": "Maicao",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 536,
      "code": "70429",
      "value": "Majagual",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 537,
      "code": "68432",
      "value": "Málaga",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 538,
      "code": "08433",
      "value": "Malambo",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 539,
      "code": "52435",
      "value": "Mallama",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 540,
      "code": "08436",
      "value": "Manati",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 541,
      "code": "20443",
      "value": "Manaure",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 542,
      "code": "44560",
      "value": "Manaure",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 543,
      "code": "85139",
      "value": "Maní",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 544,
      "code": "17001",
      "value": "Manizales",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 545,
      "code": "25436",
      "value": "Manta",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 546,
      "code": "17433",
      "value": "Manzanares",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 547,
      "code": "94663",
      "value": "Mapiripan",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 548,
      "code": "50325",
      "value": "Mapiripan",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 549,
      "code": "13440",
      "value": "Margarita",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 550,
      "code": "13442",
      "value": "María La Baja",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 551,
      "code": "05440",
      "value": "Marinilla",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 552,
      "code": "15442",
      "value": "Maripí",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 553,
      "code": "73443",
      "value": "Mariquita",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 554,
      "code": "17442",
      "value": "Marmato",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 555,
      "code": "17444",
      "value": "Marquetalia",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 556,
      "code": "66440",
      "value": "Marsella",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 557,
      "code": "17446",
      "value": "Marulanda",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 558,
      "code": "68444",
      "value": "Matanza",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 559,
      "code": "05001",
      "value": "Medellín",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 560,
      "code": "25438",
      "value": "Medina",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 561,
      "code": "27425",
      "value": "Medio Atrato",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 562,
      "code": "27430",
      "value": "Medio Baudó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 563,
      "code": "27450",
      "value": "Medio San Juan",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 564,
      "code": "73449",
      "value": "Melgar",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 565,
      "code": "19450",
      "value": "Mercaderes",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 566,
      "code": "50330",
      "value": "Mesetas",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 567,
      "code": "18460",
      "value": "Milan",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 568,
      "code": "15455",
      "value": "Miraflores",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 569,
      "code": "95200",
      "value": "Miraflores",
      "departmentCode": "95",
      "departmentValue": "Guaviare"
    },
    {
      "id": 570,
      "code": "19455",
      "value": "Miranda",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 571,
      "code": "91460",
      "value": "Miriti - Paraná",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 572,
      "code": "66456",
      "value": "Mistrató",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 573,
      "code": "97001",
      "value": "Mitú",
      "departmentCode": "97",
      "departmentValue": "Vaupés"
    },
    {
      "id": 574,
      "code": "86001",
      "value": "Mocoa",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 575,
      "code": "68464",
      "value": "Mogotes",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 576,
      "code": "68468",
      "value": "Molagavita",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 577,
      "code": "23464",
      "value": "Momil",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 578,
      "code": "13468",
      "value": "Mompós",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 579,
      "code": "15464",
      "value": "Mongua",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 580,
      "code": "15466",
      "value": "Monguí",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 581,
      "code": "15469",
      "value": "Moniquirá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 582,
      "code": "05467",
      "value": "Montebello",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 583,
      "code": "13458",
      "value": "Montecristo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 584,
      "code": "23466",
      "value": "Montelíbano",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 585,
      "code": "63470",
      "value": "Montengro",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 586,
      "code": "23001",
      "value": "Montería",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 587,
      "code": "85162",
      "value": "Monterrey",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 588,
      "code": "23500",
      "value": "Moñitos",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 589,
      "code": "13473",
      "value": "Morales",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 590,
      "code": "19473",
      "value": "Morales",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 591,
      "code": "18479",
      "value": "Morelia",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 592,
      "code": "94888",
      "value": "Morichal",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 593,
      "code": "70473",
      "value": "Morroa",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 594,
      "code": "25473",
      "value": "Mosquera",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 595,
      "code": "52473",
      "value": "Mosquera",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 596,
      "code": "15476",
      "value": "Motavita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 597,
      "code": "73461",
      "value": "Murillo",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 598,
      "code": "05475",
      "value": "Murindó",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 599,
      "code": "05480",
      "value": "Mutata",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 600,
      "code": "54480",
      "value": "Mutiscua",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 601,
      "code": "15480",
      "value": "Muzo",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 602,
      "code": "05483",
      "value": "Nariño",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 603,
      "code": "25483",
      "value": "Nariño",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 604,
      "code": "52480",
      "value": "Nariño",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 605,
      "code": "41483",
      "value": "Nátaga",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 606,
      "code": "73483",
      "value": "Natagaima",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 607,
      "code": "05495",
      "value": "Nechí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 608,
      "code": "05490",
      "value": "Necoclí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 609,
      "code": "17486",
      "value": "Neira",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 610,
      "code": "41001",
      "value": "Neiva",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 611,
      "code": "25486",
      "value": "Nemocon",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 612,
      "code": "25488",
      "value": "Nilo",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 613,
      "code": "25489",
      "value": "Nimaima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 614,
      "code": "15491",
      "value": "Nobsa",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 615,
      "code": "25491",
      "value": "Nocaima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 616,
      "code": "17495",
      "value": "Norcasia",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 617,
      "code": "27491",
      "value": "Nóvita",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 618,
      "code": "47460",
      "value": "Nueva Granada",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 619,
      "code": "15494",
      "value": "Nuevo Colón",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 620,
      "code": "85225",
      "value": "Nunchía",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 621,
      "code": "27495",
      "value": "Nuquí",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 622,
      "code": "76497",
      "value": "Obando",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 623,
      "code": "68498",
      "value": "Ocamonte",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 624,
      "code": "54498",
      "value": "Ocaña",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 625,
      "code": "68500",
      "value": "Oiba",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 626,
      "code": "15500",
      "value": "Oicatá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 627,
      "code": "05501",
      "value": "Olaya",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 628,
      "code": "52490",
      "value": "Olaya Herrera",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 629,
      "code": "68502",
      "value": "Onzaga",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 630,
      "code": "41503",
      "value": "Oporapa",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 631,
      "code": "86320",
      "value": "Orito",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 632,
      "code": "85230",
      "value": "Orocué",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 633,
      "code": "73504",
      "value": "Ortega",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 634,
      "code": "52506",
      "value": "Ospina",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 635,
      "code": "15507",
      "value": "Otanche",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 636,
      "code": "70508",
      "value": "Ovejas",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 637,
      "code": "15511",
      "value": "Pachavita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 638,
      "code": "25513",
      "value": "Pacho",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 639,
      "code": "97511",
      "value": "Pacoa",
      "departmentCode": "97",
      "departmentValue": "Vaupés"
    },
    {
      "id": 640,
      "code": "17513",
      "value": "Pácora",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 641,
      "code": "19513",
      "value": "Padilla",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 642,
      "code": "19517",
      "value": "Paez",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 643,
      "code": "15514",
      "value": "Páez",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 644,
      "code": "41518",
      "value": "Paicol",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 645,
      "code": "20517",
      "value": "Pailitas",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 646,
      "code": "25518",
      "value": "Paime",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 647,
      "code": "15516",
      "value": "Paipa",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 648,
      "code": "15518",
      "value": "Pajarito",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 649,
      "code": "41524",
      "value": "Palermo",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 650,
      "code": "17524",
      "value": "Palestina",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 651,
      "code": "41530",
      "value": "Palestina",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 652,
      "code": "68522",
      "value": "Palmar",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 653,
      "code": "08520",
      "value": "Palmar De Varela",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 654,
      "code": "68524",
      "value": "Palmas Del Socorro",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 655,
      "code": "76520",
      "value": "Palmira",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 656,
      "code": "70523",
      "value": "Palmito",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 657,
      "code": "73520",
      "value": "Palocabildo",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 658,
      "code": "54518",
      "value": "Pamplona",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 659,
      "code": "54520",
      "value": "Pamplonita",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 660,
      "code": "94887",
      "value": "Pana Pana",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 661,
      "code": "25524",
      "value": "Pandi",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 662,
      "code": "15522",
      "value": "Panqueba",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 663,
      "code": "97777",
      "value": "Papunahua",
      "departmentCode": "97",
      "departmentValue": "Vaupés"
    },
    {
      "id": 664,
      "code": "68533",
      "value": "Páramo",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 665,
      "code": "25530",
      "value": "Paratebueno",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 666,
      "code": "25535",
      "value": "Pasca",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 667,
      "code": "52001",
      "value": "Pasto",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 668,
      "code": "19532",
      "value": "Patia",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 669,
      "code": "15531",
      "value": "Pauna",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 670,
      "code": "15533",
      "value": "Paya",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 671,
      "code": "85250",
      "value": "Paz De Ariporo",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 672,
      "code": "15537",
      "value": "Paz De Río",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 673,
      "code": "47541",
      "value": "Pedraza",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 674,
      "code": "20550",
      "value": "Pelaya",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 675,
      "code": "17541",
      "value": "Pensilvania",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 676,
      "code": "05541",
      "value": "Peñol",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 677,
      "code": "05543",
      "value": "Peque",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 678,
      "code": "66001",
      "value": "Pereira",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 679,
      "code": "15542",
      "value": "Pesca",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 680,
      "code": "19533",
      "value": "Piamonte",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 681,
      "code": "68547",
      "value": "Piedecuesta",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 682,
      "code": "73547",
      "value": "Piedras",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 683,
      "code": "19548",
      "value": "Piendamo",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 684,
      "code": "63548",
      "value": "Pijao",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 685,
      "code": "47545",
      "value": "Pijiño Del Carmen",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 686,
      "code": "68549",
      "value": "Pinchote",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 687,
      "code": "13549",
      "value": "Pinillos",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 688,
      "code": "08549",
      "value": "Piojó",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 689,
      "code": "15550",
      "value": "Pisba",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 690,
      "code": "41548",
      "value": "Pital",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 691,
      "code": "41551",
      "value": "Pitalito",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 692,
      "code": "47551",
      "value": "Pivijay",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 693,
      "code": "73555",
      "value": "Planadas",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 694,
      "code": "23555",
      "value": "Planeta Rica",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 695,
      "code": "47555",
      "value": "Plato",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 696,
      "code": "52540",
      "value": "Policarpa",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 697,
      "code": "08558",
      "value": "Polonuevo",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 698,
      "code": "08560",
      "value": "Ponedera",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 699,
      "code": "19001",
      "value": "Popayán",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 700,
      "code": "85263",
      "value": "Pore",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 701,
      "code": "52560",
      "value": "Potosí",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 702,
      "code": "76563",
      "value": "Pradera",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 703,
      "code": "73563",
      "value": "Prado",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 704,
      "code": "52565",
      "value": "Providencia",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 705,
      "code": "88564",
      "value": "Providencia Y Santa Catalina",
      "departmentCode": "88",
      "departmentValue": "San Andrés y Providencia"
    },
    {
      "id": 706,
      "code": "20570",
      "value": "Pueblo Bello",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 707,
      "code": "23570",
      "value": "Pueblo Nuevo",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 708,
      "code": "66572",
      "value": "Pueblo Rico",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 709,
      "code": "47570",
      "value": "Pueblo Viejo",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 710,
      "code": "05576",
      "value": "Pueblorrico",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 711,
      "code": "68572",
      "value": "Puente Nacional",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 712,
      "code": "52573",
      "value": "Puerres",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 713,
      "code": "91530",
      "value": "Puerto Alegria",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 714,
      "code": "91536",
      "value": "Puerto Arica",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 715,
      "code": "86568",
      "value": "Puerto Asis",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 716,
      "code": "05579",
      "value": "Puerto Berrio",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 717,
      "code": "15572",
      "value": "Puerto Boyaca",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 718,
      "code": "86569",
      "value": "Puerto Caicedo",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 719,
      "code": "99001",
      "value": "Puerto Carreño",
      "departmentCode": "99",
      "departmentValue": "Vichada"
    },
    {
      "id": 720,
      "code": "08573",
      "value": "Puerto Colombia",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 721,
      "code": "94884",
      "value": "Puerto Colombia",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 722,
      "code": "50450",
      "value": "Puerto Concordia",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 723,
      "code": "23574",
      "value": "Puerto Escondido",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 724,
      "code": "50568",
      "value": "Puerto Gaitán",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 725,
      "code": "86571",
      "value": "Puerto Guzman",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 726,
      "code": "86573",
      "value": "Puerto Leguizamo",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 727,
      "code": "23580",
      "value": "Puerto Libertador",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 728,
      "code": "50577",
      "value": "Puerto Lleras",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 729,
      "code": "50573",
      "value": "Puerto Lopez",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 730,
      "code": "05585",
      "value": "Puerto Nare",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 731,
      "code": "91540",
      "value": "Puerto Nariño",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 732,
      "code": "68573",
      "value": "Puerto Parra",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 733,
      "code": "18592",
      "value": "Puerto Rico",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 734,
      "code": "50590",
      "value": "Puerto Rico",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 735,
      "code": "81591",
      "value": "Puerto Rondón",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 736,
      "code": "25572",
      "value": "Puerto Salgar",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 737,
      "code": "91669",
      "value": "Puerto Santander",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 738,
      "code": "54553",
      "value": "Puerto Santander",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 739,
      "code": "19573",
      "value": "Puerto Tejada",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 740,
      "code": "05591",
      "value": "Puerto Triunfo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 741,
      "code": "68575",
      "value": "Puerto Wilches",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 742,
      "code": "25580",
      "value": "Puli",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 743,
      "code": "52585",
      "value": "Pupiales",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 744,
      "code": "19585",
      "value": "Purace",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 745,
      "code": "73585",
      "value": "Purificación",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 746,
      "code": "23586",
      "value": "Purísima",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 747,
      "code": "25592",
      "value": "Quebradanegra",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 748,
      "code": "25594",
      "value": "Quetame",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 749,
      "code": "27001",
      "value": "Quibdó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 750,
      "code": "63594",
      "value": "Quimbaya",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 751,
      "code": "66594",
      "value": "Quinchia",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 752,
      "code": "15580",
      "value": "Quípama",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 753,
      "code": "25596",
      "value": "Quipile",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 754,
      "code": "54599",
      "value": "Ragonvalia",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 755,
      "code": "15599",
      "value": "Ramiriquí",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 756,
      "code": "15600",
      "value": "Ráquira",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 757,
      "code": "85279",
      "value": "Recetor",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 758,
      "code": "13580",
      "value": "Regidor",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 759,
      "code": "05604",
      "value": "Remedios",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 760,
      "code": "47605",
      "value": "Remolino",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 761,
      "code": "08606",
      "value": "Repelon",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 762,
      "code": "50606",
      "value": "Restrepo",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 763,
      "code": "76606",
      "value": "Restrepo",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 764,
      "code": "05607",
      "value": "Retiro",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 765,
      "code": "25612",
      "value": "Ricaurte",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 766,
      "code": "52612",
      "value": "Ricaurte",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 767,
      "code": "20614",
      "value": "Río De Oro",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 768,
      "code": "27580",
      "value": "Río Frío",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 769,
      "code": "27600",
      "value": "Rio Quito",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 770,
      "code": "13600",
      "value": "Río Viejo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 771,
      "code": "73616",
      "value": "Rioblanco",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 772,
      "code": "76616",
      "value": "Riofrio",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 773,
      "code": "44001",
      "value": "Riohacha",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 774,
      "code": "05615",
      "value": "Rionegro",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 775,
      "code": "68615",
      "value": "Rionegro",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 776,
      "code": "17614",
      "value": "Riosucio",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 777,
      "code": "27615",
      "value": "Riosucio",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 778,
      "code": "17616",
      "value": "Risaralda",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 779,
      "code": "41615",
      "value": "Rivera",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 780,
      "code": "52621",
      "value": "Roberto Payan",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 781,
      "code": "76622",
      "value": "Roldanillo",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 782,
      "code": "73622",
      "value": "Roncesvalles",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 783,
      "code": "15621",
      "value": "Rondón",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 784,
      "code": "19622",
      "value": "Rosas",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 785,
      "code": "73624",
      "value": "Rovira",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 786,
      "code": "68655",
      "value": "Sabana De Torres",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 787,
      "code": "08634",
      "value": "Sabanagrande",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 788,
      "code": "05628",
      "value": "Sabanalarga",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 789,
      "code": "08638",
      "value": "Sabanalarga",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 790,
      "code": "85300",
      "value": "Sabanalarga",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 791,
      "code": "47660",
      "value": "Sabanas De San Angel",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 792,
      "code": "05631",
      "value": "Sabaneta",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 793,
      "code": "15632",
      "value": "Saboyá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 794,
      "code": "85315",
      "value": "Sácama",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 795,
      "code": "15638",
      "value": "Sáchica",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 796,
      "code": "23660",
      "value": "Sahagún",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 797,
      "code": "41660",
      "value": "Saladoblanco",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 798,
      "code": "17653",
      "value": "Salamina",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 799,
      "code": "47675",
      "value": "Salamina",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 800,
      "code": "54660",
      "value": "Salazar",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 801,
      "code": "73671",
      "value": "Saldaña",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 802,
      "code": "63690",
      "value": "Salento",
      "departmentCode": "63",
      "departmentValue": "Quindío"
    },
    {
      "id": 803,
      "code": "05642",
      "value": "Salgar",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 804,
      "code": "15646",
      "value": "Samacá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 805,
      "code": "17662",
      "value": "Samaná",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 806,
      "code": "52678",
      "value": "Samaniego",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 807,
      "code": "70670",
      "value": "Sampués",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 808,
      "code": "41668",
      "value": "San Agustín",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 809,
      "code": "20710",
      "value": "San Alberto",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 810,
      "code": "88001",
      "value": "San Andres",
      "departmentCode": "88",
      "departmentValue": "San Andrés y Providencia"
    },
    {
      "id": 811,
      "code": "05647",
      "value": "San Andrés",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 812,
      "code": "68669",
      "value": "San Andrés",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 813,
      "code": "23670",
      "value": "San Andrés Sotavento",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 814,
      "code": "23672",
      "value": "San Antero",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 815,
      "code": "73675",
      "value": "San Antonio",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 816,
      "code": "25645",
      "value": "San Antonio De Tequendama",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 817,
      "code": "68673",
      "value": "San Benito",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 818,
      "code": "70678",
      "value": "San Benito Abad",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 819,
      "code": "25649",
      "value": "San Bernardo",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 820,
      "code": "52685",
      "value": "San Bernardo",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 821,
      "code": "23675",
      "value": "San Bernardo Del Viento",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 822,
      "code": "54670",
      "value": "San Calixto",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 823,
      "code": "05649",
      "value": "San Carlos",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 824,
      "code": "23678",
      "value": "San Carlos",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 825,
      "code": "50680",
      "value": "San Carlos Guaroa",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 826,
      "code": "25653",
      "value": "San Cayetano",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 827,
      "code": "54673",
      "value": "San Cayetano",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 828,
      "code": "13620",
      "value": "San Cristobal",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 829,
      "code": "20750",
      "value": "San Diego",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 830,
      "code": "15660",
      "value": "San Eduardo",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 831,
      "code": "13647",
      "value": "San Estanislao",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 832,
      "code": "94883",
      "value": "San Felipe",
      "departmentCode": "94",
      "departmentValue": "Guainía"
    },
    {
      "id": 833,
      "code": "13650",
      "value": "San Fernando",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 834,
      "code": "05652",
      "value": "San Francisco",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 835,
      "code": "25658",
      "value": "San Francisco",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 836,
      "code": "86755",
      "value": "San Francisco",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 837,
      "code": "68679",
      "value": "San Gil",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 838,
      "code": "13654",
      "value": "San Jacinto",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 839,
      "code": "13655",
      "value": "San Jacinto Del Cauca",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 840,
      "code": "05656",
      "value": "San Jerónimo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 841,
      "code": "68682",
      "value": "San Joaquín",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 842,
      "code": "17665",
      "value": "San José",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 843,
      "code": "05658",
      "value": "San José De La Montaña",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 844,
      "code": "68684",
      "value": "San José De Miranda",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 845,
      "code": "15664",
      "value": "San José De Pare",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 846,
      "code": "18610",
      "value": "San Jose Del Fragua",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 847,
      "code": "95001",
      "value": "San José Del Guaviare",
      "departmentCode": "95",
      "departmentValue": "Guaviare"
    },
    {
      "id": 848,
      "code": "27660",
      "value": "San José Del Palmar",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 849,
      "code": "70702",
      "value": "San Juan Betulia",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 850,
      "code": "50683",
      "value": "San Juan De Arama",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 851,
      "code": "25662",
      "value": "San Juan De Río Seco",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 852,
      "code": "05659",
      "value": "San Juan De Uraba",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 853,
      "code": "44650",
      "value": "San Juan Del Cesar",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 854,
      "code": "13657",
      "value": "San Juan Nepomuceno",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 855,
      "code": "50686",
      "value": "San Juanito",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 856,
      "code": "52687",
      "value": "San Lorenzo",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 857,
      "code": "05660",
      "value": "San Luis",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 858,
      "code": "73678",
      "value": "San Luis",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 859,
      "code": "50223",
      "value": "San Luis De Cubarral",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 860,
      "code": "15667",
      "value": "San Luis De Gaceno",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 861,
      "code": "85325",
      "value": "San Luis De Palenque",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 862,
      "code": "70708",
      "value": "San Marcos",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 863,
      "code": "20770",
      "value": "San Martín",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 864,
      "code": "50689",
      "value": "San Martín",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 865,
      "code": "13667",
      "value": "San Martin De Loba",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 866,
      "code": "15673",
      "value": "San Mateo",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 867,
      "code": "86757",
      "value": "San Miguel",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 868,
      "code": "68686",
      "value": "San Miguel",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 869,
      "code": "15676",
      "value": "San Miguel De Sema",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 870,
      "code": "70713",
      "value": "San Onofre",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 871,
      "code": "13670",
      "value": "San Pablo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 872,
      "code": "52693",
      "value": "San Pablo",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 873,
      "code": "15681",
      "value": "San Pablo Borbur",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 874,
      "code": "05664",
      "value": "San Pedro",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 875,
      "code": "70717",
      "value": "San Pedro",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 876,
      "code": "76670",
      "value": "San Pedro",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 877,
      "code": "52694",
      "value": "San Pedro De Cartago",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 878,
      "code": "05665",
      "value": "San Pedro De Uraba",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 879,
      "code": "23686",
      "value": "San Pelayo",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 880,
      "code": "05667",
      "value": "San Rafael",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 881,
      "code": "05670",
      "value": "San Roque",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 882,
      "code": "15693",
      "value": "San Rosa Viterbo",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 883,
      "code": "19693",
      "value": "San Sebastian",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 884,
      "code": "47692",
      "value": "San Sebastian De Buenavista",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 885,
      "code": "05674",
      "value": "San Vicente",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 886,
      "code": "68689",
      "value": "San Vicente De Chucurí",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 887,
      "code": "18753",
      "value": "San Vicente Del Caguán",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 888,
      "code": "47703",
      "value": "San Zenon",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 889,
      "code": "52683",
      "value": "Sandoná",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 890,
      "code": "47707",
      "value": "Santa Ana",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 891,
      "code": "05679",
      "value": "Santa Barbara",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 892,
      "code": "52696",
      "value": "Santa Barbara",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 893,
      "code": "68705",
      "value": "Santa Bárbara",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 894,
      "code": "47720",
      "value": "Santa Barbara De Pinto",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 895,
      "code": "13673",
      "value": "Santa Catalina",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 896,
      "code": "52699",
      "value": "Santa Cruz",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 897,
      "code": "68720",
      "value": "Santa Helena Del Opón",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 898,
      "code": "73686",
      "value": "Santa Isabel",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 899,
      "code": "08675",
      "value": "Santa Lucia",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 900,
      "code": "15690",
      "value": "Santa María",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 901,
      "code": "41676",
      "value": "Santa María",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 902,
      "code": "47001",
      "value": "Santa Marta",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 903,
      "code": "19701",
      "value": "Santa Rosa",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 904,
      "code": "66682",
      "value": "Santa Rosa De Cabal",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 905,
      "code": "13683",
      "value": "Santa Rosa De Lima",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 906,
      "code": "05686",
      "value": "Santa Rosa De Osos",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 907,
      "code": "13688",
      "value": "Santa Rosa Del Sur",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 908,
      "code": "99624",
      "value": "Santa Rosalía",
      "departmentCode": "99",
      "departmentValue": "Vichada"
    },
    {
      "id": 909,
      "code": "15696",
      "value": "Santa Sofía",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 910,
      "code": "05042",
      "value": "Santafé De Antioquia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 911,
      "code": "15686",
      "value": "Santana",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 912,
      "code": "19698",
      "value": "Santander De Quilichao",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 913,
      "code": "54680",
      "value": "Santiago",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 914,
      "code": "86760",
      "value": "Santiago",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 915,
      "code": "70820",
      "value": "Santiago De Tolú",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 916,
      "code": "05690",
      "value": "Santo Domingo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 917,
      "code": "08685",
      "value": "Santo Tomas",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 918,
      "code": "05697",
      "value": "Santuario",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 919,
      "code": "66687",
      "value": "Santuario",
      "departmentCode": "66",
      "departmentValue": "Risaralda"
    },
    {
      "id": 920,
      "code": "52720",
      "value": "Sapuyes",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 921,
      "code": "81736",
      "value": "Saravena",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 922,
      "code": "54720",
      "value": "Sardinata",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 923,
      "code": "25718",
      "value": "Sasaima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 924,
      "code": "15720",
      "value": "Sativanorte",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 925,
      "code": "15723",
      "value": "Sativasur",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 926,
      "code": "05736",
      "value": "Segovia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 927,
      "code": "25736",
      "value": "Sesquilé",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 928,
      "code": "76736",
      "value": "Sevilla",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 929,
      "code": "15740",
      "value": "Siachoque",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 930,
      "code": "25740",
      "value": "Sibaté",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 931,
      "code": "86749",
      "value": "Sibundoy",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 932,
      "code": "54743",
      "value": "Silos",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 933,
      "code": "25743",
      "value": "Silvania",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 934,
      "code": "19743",
      "value": "Silvia",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 935,
      "code": "68745",
      "value": "Simacota",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 936,
      "code": "25745",
      "value": "Simijaca",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 937,
      "code": "13744",
      "value": "Simití",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 938,
      "code": "70742",
      "value": "Sincé",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 939,
      "code": "70001",
      "value": "Sincelejo",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 940,
      "code": "27745",
      "value": "Sipí",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 941,
      "code": "47745",
      "value": "Sitionuevo",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 942,
      "code": "25754",
      "value": "Soacha",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 943,
      "code": "15753",
      "value": "Soatá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 944,
      "code": "15757",
      "value": "Socha",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 945,
      "code": "68755",
      "value": "Socorro",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 946,
      "code": "15755",
      "value": "Socotá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 947,
      "code": "15759",
      "value": "Sogamoso",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 948,
      "code": "18756",
      "value": "Solano",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 949,
      "code": "08758",
      "value": "Soledad",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 950,
      "code": "18785",
      "value": "Solita",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 951,
      "code": "15761",
      "value": "Somondoco",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 952,
      "code": "05756",
      "value": "Sonson",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 953,
      "code": "05761",
      "value": "Sopetran",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 954,
      "code": "13760",
      "value": "Soplaviento",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 955,
      "code": "25758",
      "value": "Sopó",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 956,
      "code": "15762",
      "value": "Sora",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 957,
      "code": "15764",
      "value": "Soracá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 958,
      "code": "15763",
      "value": "Sotaquirá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 959,
      "code": "19760",
      "value": "Sotara",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 960,
      "code": "68770",
      "value": "Suaita",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 961,
      "code": "08770",
      "value": "Suan",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 962,
      "code": "19780",
      "value": "Suarez",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 963,
      "code": "73770",
      "value": "Suárez",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 964,
      "code": "41770",
      "value": "Suaza",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 965,
      "code": "25769",
      "value": "Subachoque",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 966,
      "code": "19785",
      "value": "Sucre",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 967,
      "code": "68773",
      "value": "Sucre",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 968,
      "code": "70771",
      "value": "Sucre",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 969,
      "code": "25772",
      "value": "Suesca",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 970,
      "code": "25777",
      "value": "Supatá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 971,
      "code": "17777",
      "value": "Supía",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 972,
      "code": "68780",
      "value": "Surata",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 973,
      "code": "25779",
      "value": "Susa",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 974,
      "code": "15774",
      "value": "Susacón",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 975,
      "code": "15776",
      "value": "Sutamarchán",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 976,
      "code": "25781",
      "value": "Sutatausa",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 977,
      "code": "15778",
      "value": "Sutatenza",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 978,
      "code": "25785",
      "value": "Tabio",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 979,
      "code": "27787",
      "value": "Tadó",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 980,
      "code": "13780",
      "value": "Talaigua Nuevo",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 981,
      "code": "20787",
      "value": "Tamalameque",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 982,
      "code": "85400",
      "value": "Támara",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 983,
      "code": "81794",
      "value": "Tame",
      "departmentCode": "81",
      "departmentValue": "Arauca"
    },
    {
      "id": 984,
      "code": "05789",
      "value": "Támesis",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 985,
      "code": "52786",
      "value": "Taminango",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 986,
      "code": "52788",
      "value": "Tangua",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 987,
      "code": "97666",
      "value": "Taraira",
      "departmentCode": "97",
      "departmentValue": "Vaupés"
    },
    {
      "id": 988,
      "code": "91798",
      "value": "Tarapacá",
      "departmentCode": "91",
      "departmentValue": "Amazonas"
    },
    {
      "id": 989,
      "code": "05790",
      "value": "Tarazá",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 990,
      "code": "41791",
      "value": "Tarqui",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 991,
      "code": "05792",
      "value": "Tarso",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 992,
      "code": "15790",
      "value": "Tasco",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 993,
      "code": "85410",
      "value": "Tauramena",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 994,
      "code": "25793",
      "value": "Tausa",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 995,
      "code": "41799",
      "value": "Tello",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 996,
      "code": "25797",
      "value": "Tena",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 997,
      "code": "47798",
      "value": "Tenerife",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 998,
      "code": "25799",
      "value": "Tenjo",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 999,
      "code": "15798",
      "value": "Tenza",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1000,
      "code": "54800",
      "value": "Teorama",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 1001,
      "code": "41801",
      "value": "Teruel",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 1002,
      "code": "41797",
      "value": "Tesalia",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 1003,
      "code": "25805",
      "value": "Tibacuy",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1004,
      "code": "15804",
      "value": "Tibaná",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1005,
      "code": "15806",
      "value": "Tibasosa",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1006,
      "code": "25807",
      "value": "Tibirita",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1007,
      "code": "54810",
      "value": "Tibú",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 1008,
      "code": "23807",
      "value": "Tierralta",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 1009,
      "code": "41807",
      "value": "Timaná",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 1010,
      "code": "19807",
      "value": "Timbio",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 1011,
      "code": "19809",
      "value": "Timbiqui",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 1012,
      "code": "15808",
      "value": "Tinjacá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1013,
      "code": "15810",
      "value": "Tipacoque",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1014,
      "code": "13810",
      "value": "Tiquisio",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 1015,
      "code": "05809",
      "value": "Titiribí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1016,
      "code": "15814",
      "value": "Toca",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1017,
      "code": "25815",
      "value": "Tocaima",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1018,
      "code": "25817",
      "value": "Tocancipá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1019,
      "code": "15816",
      "value": "Togüí",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1020,
      "code": "05819",
      "value": "Toledo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1021,
      "code": "54820",
      "value": "Toledo",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 1022,
      "code": "70823",
      "value": "Tolú Viejo",
      "departmentCode": "70",
      "departmentValue": "Sucre"
    },
    {
      "id": 1023,
      "code": "68820",
      "value": "Tona",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 1024,
      "code": "15820",
      "value": "Tópaga",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1025,
      "code": "25823",
      "value": "Topaipi",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1026,
      "code": "19821",
      "value": "Toribio",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 1027,
      "code": "76823",
      "value": "Toro",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1028,
      "code": "15822",
      "value": "Tota",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1029,
      "code": "19824",
      "value": "Totoro",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 1030,
      "code": "85430",
      "value": "Trinidad",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 1031,
      "code": "76828",
      "value": "Trujillo",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1032,
      "code": "08832",
      "value": "Tubara",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 1033,
      "code": "76834",
      "value": "Tuluá",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1034,
      "code": "52835",
      "value": "Tumaco",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 1035,
      "code": "15001",
      "value": "Tunja",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1036,
      "code": "15832",
      "value": "Tununguá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1037,
      "code": "52838",
      "value": "Tuquerres",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 1038,
      "code": "13836",
      "value": "Turbaco",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 1039,
      "code": "13838",
      "value": "Turbana",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 1040,
      "code": "05837",
      "value": "Turbo",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1041,
      "code": "15835",
      "value": "Turmequé",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1042,
      "code": "15837",
      "value": "Tuta",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1043,
      "code": "15839",
      "value": "Tutazá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1044,
      "code": "25839",
      "value": "Ubalá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1045,
      "code": "25841",
      "value": "Ubaque",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1046,
      "code": "25843",
      "value": "Villa de San Diego de Ubate",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1047,
      "code": "76845",
      "value": "Ulloa",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1048,
      "code": "15842",
      "value": "Umbita",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1049,
      "code": "25845",
      "value": "Une",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1050,
      "code": "27800",
      "value": "Unguía",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 1051,
      "code": "27810",
      "value": "Union Panamericana",
      "departmentCode": "27",
      "departmentValue": "Chocó"
    },
    {
      "id": 1052,
      "code": "05842",
      "value": "Uramita",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1053,
      "code": "44847",
      "value": "Uribia",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 1054,
      "code": "05847",
      "value": "Urrao",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1055,
      "code": "44855",
      "value": "Urumita",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 1056,
      "code": "08849",
      "value": "Usiacuri",
      "departmentCode": "08",
      "departmentValue": "Atlántico"
    },
    {
      "id": 1057,
      "code": "25851",
      "value": "Útica",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1058,
      "code": "05854",
      "value": "Valdivia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1059,
      "code": "23855",
      "value": "Valencia",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 1060,
      "code": "68855",
      "value": "Valle De San José",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 1061,
      "code": "73854",
      "value": "Valle De San Juan",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 1062,
      "code": "86865",
      "value": "Valle Del Guamuez",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 1063,
      "code": "20001",
      "value": "Valledupar",
      "departmentCode": "20",
      "departmentValue": "Cesar"
    },
    {
      "id": 1064,
      "code": "05856",
      "value": "Valparaiso",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1065,
      "code": "18860",
      "value": "Valparaiso",
      "departmentCode": "18",
      "departmentValue": "Caquetá"
    },
    {
      "id": 1066,
      "code": "05858",
      "value": "Vegachí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1067,
      "code": "68861",
      "value": "Vélez",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 1068,
      "code": "73861",
      "value": "Venadillo",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 1069,
      "code": "05861",
      "value": "Venecia",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1070,
      "code": "25506",
      "value": "Venecia",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1071,
      "code": "15861",
      "value": "Ventaquemada",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1072,
      "code": "25862",
      "value": "Vergara",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1073,
      "code": "76863",
      "value": "Versalles",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1074,
      "code": "68867",
      "value": "Vetas",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 1075,
      "code": "25867",
      "value": "Vianí",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1076,
      "code": "17867",
      "value": "Victoria",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 1077,
      "code": "05873",
      "value": "Vigía Del Fuerte",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1078,
      "code": "76869",
      "value": "Vijes",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1079,
      "code": "54871",
      "value": "Villa Caro",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 1080,
      "code": "15407",
      "value": "Villa De Leyva",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1081,
      "code": "54874",
      "value": "Villa Del Rosario",
      "departmentCode": "54",
      "departmentValue": "Norte De Santander"
    },
    {
      "id": 1082,
      "code": "86885",
      "value": "Villa Garzon",
      "departmentCode": "86",
      "departmentValue": "Putumayo"
    },
    {
      "id": 1083,
      "code": "19845",
      "value": "Villa Rica",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 1084,
      "code": "25871",
      "value": "Villagomez",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1085,
      "code": "73870",
      "value": "Villahermosa",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 1086,
      "code": "17873",
      "value": "Villamaria",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 1087,
      "code": "13873",
      "value": "Villanueva",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 1088,
      "code": "85440",
      "value": "Villanueva",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 1089,
      "code": "44874",
      "value": "Villanueva",
      "departmentCode": "44",
      "departmentValue": "La Guajira"
    },
    {
      "id": 1090,
      "code": "68872",
      "value": "Villanueva",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 1091,
      "code": "25873",
      "value": "Villapinzón",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1092,
      "code": "73873",
      "value": "Villarrica",
      "departmentCode": "73",
      "departmentValue": "Tolima"
    },
    {
      "id": 1093,
      "code": "50001",
      "value": "Villavicencio",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 1094,
      "code": "41872",
      "value": "Villavieja",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 1095,
      "code": "25875",
      "value": "Villeta",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1096,
      "code": "25878",
      "value": "Viotá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1097,
      "code": "15879",
      "value": "Viracachá",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1098,
      "code": "50711",
      "value": "Vista Hermosa",
      "departmentCode": "50",
      "departmentValue": "Meta"
    },
    {
      "id": 1099,
      "code": "17877",
      "value": "Viterbo",
      "departmentCode": "17",
      "departmentValue": "Caldas"
    },
    {
      "id": 1100,
      "code": "25885",
      "value": "Yacopí",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1101,
      "code": "52885",
      "value": "Yacuanquer",
      "departmentCode": "52",
      "departmentValue": "Nariño"
    },
    {
      "id": 1102,
      "code": "41885",
      "value": "Yaguará",
      "departmentCode": "41",
      "departmentValue": "Huila"
    },
    {
      "id": 1103,
      "code": "05885",
      "value": "Yalí",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1104,
      "code": "05887",
      "value": "Yarumal",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1105,
      "code": "97889",
      "value": "Yavaraté",
      "departmentCode": "97",
      "departmentValue": "Vaupés"
    },
    {
      "id": 1106,
      "code": "05890",
      "value": "Yolombó",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1107,
      "code": "05893",
      "value": "Yondó",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1108,
      "code": "85001",
      "value": "Yopal",
      "departmentCode": "85",
      "departmentValue": "Casanare"
    },
    {
      "id": 1109,
      "code": "76890",
      "value": "Yotoco",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1110,
      "code": "76892",
      "value": "Yumbo",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1111,
      "code": "13894",
      "value": "Zambrano",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 1112,
      "code": "68895",
      "value": "Zapatoca",
      "departmentCode": "68",
      "departmentValue": "Santander"
    },
    {
      "id": 1113,
      "code": "47960",
      "value": "Zapayan",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 1114,
      "code": "05895",
      "value": "Zaragoza",
      "departmentCode": "05",
      "departmentValue": "Antioquia"
    },
    {
      "id": 1115,
      "code": "76895",
      "value": "Zarzal",
      "departmentCode": "76",
      "departmentValue": "Valle Del Cauca"
    },
    {
      "id": 1116,
      "code": "15897",
      "value": "Zetaquira",
      "departmentCode": "15",
      "departmentValue": "Boyacá"
    },
    {
      "id": 1117,
      "code": "25898",
      "value": "Zipacon",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1118,
      "code": "25899",
      "value": "Zipaquirá",
      "departmentCode": "25",
      "departmentValue": "Cundinamarca"
    },
    {
      "id": 1119,
      "code": "47980",
      "value": "Zona Bananera",
      "departmentCode": "47",
      "departmentValue": "Magdalena"
    },
    {
      "id": 1120,
      "code": "19300",
      "value": "Guachené",
      "departmentCode": "19",
      "departmentValue": "Cauca"
    },
    {
      "id": 1121,
      "code": "13490",
      "value": "Norosí",
      "departmentCode": "13",
      "departmentValue": "Bolívar"
    },
    {
      "id": 1122,
      "code": "23682",
      "value": "San José de Uré",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    },
    {
      "id": 1123,
      "code": "23815",
      "value": "Tuchín",
      "departmentCode": "23",
      "departmentValue": "Córdoba"
    }
  ],
  departments: [
    {
      "code": "91",
      "value": "Amazonas"
    },
    {
      "code": "05",
      "value": "Antioquia"
    },
    {
      "code": "81",
      "value": "Arauca"
    },
    {
      "code": "08",
      "value": "Atlántico"
    },
    {
      "code": "11",
      "value": "Bogotá"
    },
    {
      "code": "13",
      "value": "Bolívar"
    },
    {
      "code": "15",
      "value": "Boyacá"
    },
    {
      "code": "17",
      "value": "Caldas"
    },
    {
      "code": "18",
      "value": "Caquetá"
    },
    {
      "code": "85",
      "value": "Casanare"
    },
    {
      "code": "19",
      "value": "Cauca"
    },
    {
      "code": "20",
      "value": "Cesar"
    },
    {
      "code": "27",
      "value": "Chocó"
    },
    {
      "code": "23",
      "value": "Córdoba"
    },
    {
      "code": "25",
      "value": "Cundinamarca"
    },
    {
      "code": "94",
      "value": "Guainía"
    },
    {
      "code": "95",
      "value": "Guaviare"
    },
    {
      "code": "41",
      "value": "Huila"
    },
    {
      "code": "44",
      "value": "La Guajira"
    },
    {
      "code": "47",
      "value": "Magdalena"
    },
    {
      "code": "50",
      "value": "Meta"
    },
    {
      "code": "52",
      "value": "Nariño"
    },
    {
      "code": "54",
      "value": "Norte de Santander"
    },
    {
      "code": "86",
      "value": "Putumayo"
    },
    {
      "code": "63",
      "value": "Quindío"
    },
    {
      "code": "66",
      "value": "Risaralda"
    },
    {
      "code": "88",
      "value": "San Andrés y Providencia"
    },
    {
      "code": "68",
      "value": "Santander"
    },
    {
      "code": "70",
      "value": "Sucre"
    },
    {
      "code": "73",
      "value": "Tolima"
    },
    {
      "code": "76",
      "value": "Valle del Cauca"
    },
    {
      "code": "97",
      "value": "Vaupés"
    },
    {
      "code": "99",
      "value": "Vichada"
    }
  ],
  countries : [
    {
      "code": "AF",
      "value": "Afganistán"
    },
    {
      "code": "AX",
      "value": "Aland"
    },
    {
      "code": "AL",
      "value": "Albania"
    },
    {
      "code": "DE",
      "value": "Alemania"
    },
    {
      "code": "AD",
      "value": "Andorra"
    },
    {
      "code": "AO",
      "value": "Angola"
    },
    {
      "code": "AI",
      "value": "Anguila"
    },
    {
      "code": "AQ",
      "value": "Antártida"
    },
    {
      "code": "AG",
      "value": "Antigua y Barbuda"
    },
    {
      "code": "SA",
      "value": "Arabia Saudita"
    },
    {
      "code": "DZ",
      "value": "Argelia"
    },
    {
      "code": "AR",
      "value": "Argentina"
    },
    {
      "code": "AM",
      "value": "Armenia"
    },
    {
      "code": "AW",
      "value": "Aruba"
    },
    {
      "code": "AU",
      "value": "Australia"
    },
    {
      "code": "AT",
      "value": "Austria"
    },
    {
      "code": "AZ",
      "value": "Azerbaiyán"
    },
    {
      "code": "BS",
      "value": "Bahamas"
    },
    {
      "code": "BD",
      "value": "Bangladés"
    },
    {
      "code": "BB",
      "value": "Barbados"
    },
    {
      "code": "BH",
      "value": "Baréin"
    },
    {
      "code": "BE",
      "value": "Bélgica"
    },
    {
      "code": "BZ",
      "value": "Belice"
    },
    {
      "code": "BJ",
      "value": "Benín"
    },
    {
      "code": "BM",
      "value": "Bermudas"
    },
    {
      "code": "BY",
      "value": "Bielorrusia"
    },
    {
      "code": "BO",
      "value": "Bolivia"
    },
    {
      "code": "BQ",
      "value": "Bonaire, San Eustaquio y Saba"
    },
    {
      "code": "BA",
      "value": "Bosnia y Herzegovina"
    },
    {
      "code": "BW",
      "value": "Botsuana"
    },
    {
      "code": "BR",
      "value": "Brasil"
    },
    {
      "code": "BN",
      "value": "Brunéi"
    },
    {
      "code": "BG",
      "value": "Bulgaria"
    },
    {
      "code": "BF",
      "value": "Burkina Faso"
    },
    {
      "code": "BI",
      "value": "Burundi"
    },
    {
      "code": "BT",
      "value": "Bután"
    },
    {
      "code": "CV",
      "value": "Cabo Verde"
    },
    {
      "code": "KH",
      "value": "Camboya"
    },
    {
      "code": "CM",
      "value": "Camerún"
    },
    {
      "code": "CA",
      "value": "Canadá"
    },
    {
      "code": "QA",
      "value": "Catar"
    },
    {
      "code": "TD",
      "value": "Chad"
    },
    {
      "code": "CL",
      "value": "Chile"
    },
    {
      "code": "CN",
      "value": "China"
    },
    {
      "code": "CY",
      "value": "Chipre"
    },
    {
      "code": "CO",
      "value": "Colombia"
    },
    {
      "code": "KM",
      "value": "Comoras"
    },
    {
      "code": "KP",
      "value": "Corea del Norte"
    },
    {
      "code": "KR",
      "value": "Corea del Sur"
    },
    {
      "code": "CI",
      "value": "Costa de Marfil"
    },
    {
      "code": "CR",
      "value": "Costa Rica"
    },
    {
      "code": "HR",
      "value": "Croacia"
    },
    {
      "code": "CU",
      "value": "Cuba"
    },
    {
      "code": "CW",
      "value": "Curazao"
    },
    {
      "code": "DK",
      "value": "Dinamarca"
    },
    {
      "code": "DM",
      "value": "Dominica"
    },
    {
      "code": "EC",
      "value": "Ecuador"
    },
    {
      "code": "EG",
      "value": "Egipto"
    },
    {
      "code": "SV",
      "value": "El Salvador"
    },
    {
      "code": "AE",
      "value": "Emiratos Árabes Unidos"
    },
    {
      "code": "ER",
      "value": "Eritrea"
    },
    {
      "code": "SK",
      "value": "Eslovaquia"
    },
    {
      "code": "SI",
      "value": "Eslovenia"
    },
    {
      "code": "ES",
      "value": "España"
    },
    {
      "code": "US",
      "value": "Estados Unidos"
    },
    {
      "code": "EE",
      "value": "Estonia"
    },
    {
      "code": "ET",
      "value": "Etiopía"
    },
    {
      "code": "PH",
      "value": "Filipinas"
    },
    {
      "code": "FI",
      "value": "Finlandia"
    },
    {
      "code": "FJ",
      "value": "Fiyi"
    },
    {
      "code": "FR",
      "value": "Francia"
    },
    {
      "code": "GA",
      "value": "Gabón"
    },
    {
      "code": "GM",
      "value": "Gambia"
    },
    {
      "code": "GE",
      "value": "Georgia"
    },
    {
      "code": "GH",
      "value": "Ghana"
    },
    {
      "code": "GI",
      "value": "Gibraltar"
    },
    {
      "code": "GD",
      "value": "Granada"
    },
    {
      "code": "GR",
      "value": "Grecia"
    },
    {
      "code": "GL",
      "value": "Groenlandia"
    },
    {
      "code": "GP",
      "value": "Guadalupe"
    },
    {
      "code": "GU",
      "value": "Guam"
    },
    {
      "code": "GT",
      "value": "Guatemala"
    },
    {
      "code": "GF",
      "value": "Guayana Francesa"
    },
    {
      "code": "GG",
      "value": "Guernsey"
    },
    {
      "code": "GN",
      "value": "Guinea"
    },
    {
      "code": "GW",
      "value": "Guinea-Bisáu"
    },
    {
      "code": "GQ",
      "value": "Guinea Ecuatorial"
    },
    {
      "code": "GY",
      "value": "Guyana"
    },
    {
      "code": "HT",
      "value": "Haití"
    },
    {
      "code": "HN",
      "value": "Honduras"
    },
    {
      "code": "HK",
      "value": "Hong Kong"
    },
    {
      "code": "HU",
      "value": "Hungría"
    },
    {
      "code": "IN",
      "value": "India"
    },
    {
      "code": "ID",
      "value": "Indonesia"
    },
    {
      "code": "IQ",
      "value": "Irak"
    },
    {
      "code": "IR",
      "value": "Irán"
    },
    {
      "code": "IE",
      "value": "Irlanda"
    },
    {
      "code": "BV",
      "value": "Isla Bouvet"
    },
    {
      "code": "IM",
      "value": "Isla de Man"
    },
    {
      "code": "CX",
      "value": "Isla de Navidad"
    },
    {
      "code": "IS",
      "value": "Islandia"
    },
    {
      "code": "KY",
      "value": "Islas Caimán"
    },
    {
      "code": "CC",
      "value": "Islas Cocos"
    },
    {
      "code": "CK",
      "value": "Islas Cook"
    },
    {
      "code": "FO",
      "value": "Islas Feroe"
    },
    {
      "code": "GS",
      "value": "Islas Georgias del Sur y Sandwich del Sur"
    },
    {
      "code": "HM",
      "value": "Islas Heard y McDonald"
    },
    {
      "code": "FK",
      "value": "Islas Malvinas"
    },
    {
      "code": "MP",
      "value": "Islas Marianas del Norte"
    },
    {
      "code": "MH",
      "value": "Islas Marshall"
    },
    {
      "code": "PN",
      "value": "Islas Pitcairn"
    },
    {
      "code": "SB",
      "value": "Islas Salomón"
    },
    {
      "code": "TC",
      "value": "Islas Turcas y Caicos"
    },
    {
      "code": "UM",
      "value": "Islas Ultramarinas Menores de los Estados Unidos"
    },
    {
      "code": "VG",
      "value": "Islas Vírgenes Británicas"
    },
    {
      "code": "VI",
      "value": "Islas Vírgenes de los Estados Unidos"
    },
    {
      "code": "IL",
      "value": "Israel"
    },
    {
      "code": "IT",
      "value": "Italia"
    },
    {
      "code": "JM",
      "value": "Jamaica"
    },
    {
      "code": "JP",
      "value": "Japón"
    },
    {
      "code": "JE",
      "value": "Jersey"
    },
    {
      "code": "JO",
      "value": "Jordania"
    },
    {
      "code": "KZ",
      "value": "Kazajistán"
    },
    {
      "code": "KE",
      "value": "Kenia"
    },
    {
      "code": "KG",
      "value": "Kirguistán"
    },
    {
      "code": "KI",
      "value": "Kiribati"
    },
    {
      "code": "KW",
      "value": "Kuwait"
    },
    {
      "code": "LA",
      "value": "Laos"
    },
    {
      "code": "LS",
      "value": "Lesoto"
    },
    {
      "code": "LV",
      "value": "Letonia"
    },
    {
      "code": "LB",
      "value": "Líbano"
    },
    {
      "code": "LR",
      "value": "Liberia"
    },
    {
      "code": "LY",
      "value": "Libia"
    },
    {
      "code": "LI",
      "value": "Liechtenstein"
    },
    {
      "code": "LT",
      "value": "Lituania"
    },
    {
      "code": "LU",
      "value": "Luxemburgo"
    },
    {
      "code": "MO",
      "value": "Macao"
    },
    {
      "code": "MK",
      "value": "Macedonia del Norte"
    },
    {
      "code": "MG",
      "value": "Madagascar"
    },
    {
      "code": "MY",
      "value": "Malasia"
    },
    {
      "code": "MW",
      "value": "Malaui"
    },
    {
      "code": "MV",
      "value": "Maldivas"
    },
    {
      "code": "ML",
      "value": "Malí"
    },
    {
      "code": "MT",
      "value": "Malta"
    },
    {
      "code": "MA",
      "value": "Marruecos"
    },
    {
      "code": "MQ",
      "value": "Martinica"
    },
    {
      "code": "MU",
      "value": "Mauricio"
    },
    {
      "code": "MR",
      "value": "Mauritania"
    },
    {
      "code": "YT",
      "value": "Mayotte"
    },
    {
      "code": "MX",
      "value": "México"
    },
    {
      "code": "FM",
      "value": "Micronesia"
    },
    {
      "code": "MD",
      "value": "Moldavia"
    },
    {
      "code": "MC",
      "value": "Mónaco"
    },
    {
      "code": "MN",
      "value": "Mongolia"
    },
    {
      "code": "ME",
      "value": "Montenegro"
    },
    {
      "code": "MS",
      "value": "Montserrat"
    },
    {
      "code": "MZ",
      "value": "Mozambique"
    },
    {
      "code": "MM",
      "value": "Birmania"
    },
    {
      "code": "NA",
      "value": "Namibia"
    },
    {
      "code": "NR",
      "value": "Nauru"
    },
    {
      "code": "NP",
      "value": "Nepal"
    },
    {
      "code": "NI",
      "value": "Nicaragua"
    },
    {
      "code": "NE",
      "value": "Níger"
    },
    {
      "code": "NG",
      "value": "Nigeria"
    },
    {
      "code": "NU",
      "value": "Niue"
    },
    {
      "code": "NF",
      "value": "Isla Norfolk"
    },
    {
      "code": "NO",
      "value": "Noruega"
    },
    {
      "code": "NC",
      "value": "Nueva Caledonia"
    },
    {
      "code": "NZ",
      "value": "Nueva Zelanda"
    },
    {
      "code": "OM",
      "value": "Omán"
    },
    {
      "code": "NL",
      "value": "Países Bajos"
    },
    {
      "code": "PK",
      "value": "Pakistán"
    },
    {
      "code": "PW",
      "value": "Palaos"
    },
    {
      "code": "PS",
      "value": "Palestina"
    },
    {
      "code": "PA",
      "value": "Panamá"
    },
    {
      "code": "PG",
      "value": "Papúa Nueva Guinea"
    },
    {
      "code": "PY",
      "value": "Paraguay"
    },
    {
      "code": "PE",
      "value": "Perú"
    },
    {
      "code": "PF",
      "value": "Polinesia Francesa"
    },
    {
      "code": "PL",
      "value": "Polonia"
    },
    {
      "code": "PT",
      "value": "Portugal"
    },
    {
      "code": "PR",
      "value": "Puerto Rico"
    },
    {
      "code": "GB",
      "value": "Reino Unido"
    },
    {
      "code": "EH",
      "value": "República Árabe Saharaui Democrática"
    },
    {
      "code": "CF",
      "value": "República Centroafricana"
    },
    {
      "code": "CZ",
      "value": "República Checa"
    },
    {
      "code": "CG",
      "value": "República del Congo"
    },
    {
      "code": "CD",
      "value": "República Democrática del Congo"
    },
    {
      "code": "DO",
      "value": "República Dominicana"
    },
    {
      "code": "RE",
      "value": "Reunión"
    },
    {
      "code": "RW",
      "value": "Ruanda"
    },
    {
      "code": "RO",
      "value": "Rumania"
    },
    {
      "code": "RU",
      "value": "Rusia"
    },
    {
      "code": "WS",
      "value": "Samoa"
    },
    {
      "code": "AS",
      "value": "Samoa Americana"
    },
    {
      "code": "BL",
      "value": "San Bartolomé"
    },
    {
      "code": "KN",
      "value": "San Cristóbal y Nieves"
    },
    {
      "code": "SM",
      "value": "San Marino"
    },
    {
      "code": "MF",
      "value": "San Martín"
    },
    {
      "code": "PM",
      "value": "San Pedro y Miquelón"
    },
    {
      "code": "VC",
      "value": "San Vicente y las Granadinas"
    },
    {
      "code": "SH",
      "value": "Santa Elena, Ascensión y Tristán de Acuña"
    },
    {
      "code": "LC",
      "value": "Santa Lucía"
    },
    {
      "code": "ST",
      "value": "Santo Tomé y Príncipe"
    },
    {
      "code": "SN",
      "value": "Senegal"
    },
    {
      "code": "RS",
      "value": "Serbia"
    },
    {
      "code": "SC",
      "value": "Seychelles"
    },
    {
      "code": "SL",
      "value": "Sierra Leona"
    },
    {
      "code": "SG",
      "value": "Singapur"
    },
    {
      "code": "SX",
      "value": "San Martín"
    },
    {
      "code": "SY",
      "value": "Siria"
    },
    {
      "code": "SO",
      "value": "Somalia"
    },
    {
      "code": "LK",
      "value": "Sri Lanka"
    },
    {
      "code": "SZ",
      "value": "Suazilandia"
    },
    {
      "code": "ZA",
      "value": "Sudáfrica"
    },
    {
      "code": "SD",
      "value": "Sudán"
    },
    {
      "code": "SS",
      "value": "Sudán del Sur"
    },
    {
      "code": "SE",
      "value": "Suecia"
    },
    {
      "code": "CH",
      "value": "Suiza"
    },
    {
      "code": "SR",
      "value": "Surinam"
    },
    {
      "code": "SJ",
      "value": "Svalbard y Jan Mayen"
    },
    {
      "code": "TH",
      "value": "Tailandia"
    },
    {
      "code": "TW",
      "value": "Taiwán (República de China)"
    },
    {
      "code": "TZ",
      "value": "Tanzania"
    },
    {
      "code": "TJ",
      "value": "Tayikistán"
    },
    {
      "code": "IO",
      "value": "Territorio Británico del Océano Índico"
    },
    {
      "code": "TF",
      "value": "Tierras Australes y Antárticas Francesas"
    },
    {
      "code": "TL",
      "value": "Timor Oriental"
    },
    {
      "code": "TG",
      "value": "Togo"
    },
    {
      "code": "TK",
      "value": "Tokelau"
    },
    {
      "code": "TO",
      "value": "Tonga"
    },
    {
      "code": "TT",
      "value": "Trinidad y Tobago"
    },
    {
      "code": "TN",
      "value": "Túnez"
    },
    {
      "code": "TM",
      "value": "Turkmenistán"
    },
    {
      "code": "TR",
      "value": "Turquía"
    },
    {
      "code": "TV",
      "value": "Tuvalu"
    },
    {
      "code": "UA",
      "value": "Ucrania"
    },
    {
      "code": "UG",
      "value": "Uganda"
    },
    {
      "code": "UY",
      "value": "Uruguay"
    },
    {
      "code": "UZ",
      "value": "Uzbekistán"
    },
    {
      "code": "VU",
      "value": "Vanuatu"
    },
    {
      "code": "VA",
      "value": "Ciudad del Vaticano"
    },
    {
      "code": "VE",
      "value": "Venezuela"
    },
    {
      "code": "VN",
      "value": "Vietnam"
    },
    {
      "code": "WF",
      "value": "Wallis y Futuna"
    },
    {
      "code": "YE",
      "value": "Yemen"
    },
    {
      "code": "DJ",
      "value": "Yibuti"
    },
    {
      "code": "ZM",
      "value": "Zambia"
    },
    {
      "code": "ZW",
      "value": "Zimbabue"
    }
  ]

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
