import { useAuthenticator } from "@aws-amplify/ui-react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { AssignmentTwoTone } from "@mui/icons-material";
import { Avatar, CardHeader, Icon, MenuItem, Select, useTheme } from '@mui/material';
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import AlmacenesHelpers from "../../helpers/almacenesHelpers";
import { Estado } from "../../models";
import TypesAlmacenes from "../../types/typesAlmacenes";
import AuthUtils from "../../utils/authUtils";



export default function AlmacenesTable({ data }) {

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    material_table,
    organizationTypeArray,
    municipalities,
    departments
  } = useSelector((state) => state.app);

  const userStore = useSelector((state) => state.usuario);



  const helpersAlmacen = useMemo(() => new AlmacenesHelpers(enqueueSnackbar), [enqueueSnackbar]);

  const { user: userCognito } = useAuthenticator((context) => [context.user]);
  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
  const moduloAlmacen = useMemo(() => new TypesAlmacenes(router), [router]);


  const [almacen, setAlmacen] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departmentLookup = departments.reduce((acc, item) => {
    acc[item.code] = item.value;
    return acc;
  }, {});

  const municipalityLookup = municipalities
    .filter(municipality => municipality.departmentCode === String(selectedDepartment))
    .reduce((acc, item) => {
      acc[item.code] = item.value;
      return acc;
    }, {});


  return (
    <>

      <MaterialTable
        title={
          <CardHeader
            avatar={
              <Avatar variant='rounded' sx={{ width: 50, height: 50 }}>
                <Icon style={{ fontSize: 45 }} color="primary" >
                  {moduloAlmacen.icon}
                </Icon>
              </Avatar>
            }
            title={'LISTA DE ALMACENES'}
            titleTypographyProps={{
              variant: 'h6'
            }}
            subheader={data.length + ' Registros'}
          />
        }
        data={data}
        columns={[
          { title: "ID", field: "id", hidden: true },
          {
            title: "TIPO ORGANIZACION", field: "organizationType", lookup: organizationTypeArray.reduce((acc, item) => {
              acc[item.code] = item.value;
              return acc;
            }, {})
          },
          { title: "NIT", field: "identificationNumber" },
          { title: "DV", field: "dv" },
          { title: "NOMBRE", field: "name" },
          { title: "NOMBRE COMERCIAL", field: "tradeName" },
          { title: "DIRECCION", field: "direccion" },
          { title: "TELEFONO", field: "telefono" },
          {
            title: "DEPARTAMENTO", field: "departments", lookup: departmentLookup,
            editComponent: props => (
              <Select
                value={props.value}
                onChange={e => {
                  const selectedCode = parseInt(e.target.value);
                  setSelectedDepartment(selectedCode);
                  props.onChange(selectedCode);
                }}
              >
                {Object.keys(departmentLookup).map(key => (
                  <MenuItem  key={key} value={key}>
                    {departmentLookup[key]}
                  </MenuItem >
                ))}
              </Select>
            )

          },
          { title: "MUNICIPIO", field: "ciudad", lookup: municipalityLookup },
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
          columnsButton: true,
          pageSize: 8,
        }}
        icons={material_table.icons}
        localization={material_table.localization}
        style={material_table.style}
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: theme.palette.grey[300] }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        editable={{
          isDeleteHidden: rowData => rowData.estado === Estado.INACTIVO,
          onRowAdd: (newData) => utilsAuth.isPermisoAuthorized(TypesAlmacenes.getAllPermisos().AGREGAR_ALMACEN, true)
            && helpersAlmacen.onRowAddTableAlmacen(newData),


          onRowDelete: (oldData) => utilsAuth.isPermisoAuthorized(TypesAlmacenes.getAllPermisos().INACTIVAR_ALMACEN, true)
            && helpersAlmacen.onRowDeleteTableAlmacen(oldData)

        }}
        actions={[
          {
            icon: () => (
              <AssignmentTwoTone sx={{ fontSize: 24 }} color={"action"} />
            ),
            tooltip: "Ver Almacen",
            onClick: (event, rowData) =>
              utilsAuth.isPermisoAuthorized(TypesAlmacenes.getAllPermisos().VER_ALMACEN, true)
              && moduloAlmacen.pushPathView(rowData.id, '/almacen'),
          },
        ]}
      />
      {!!almacen && (
        <Modal open={almacen !== undefined}
          onClose={() => setAlmacen()}
          maxWidth='md'
          sx={{ padding: 4 }} >

        </Modal>)
      }
    </>

  )
}
