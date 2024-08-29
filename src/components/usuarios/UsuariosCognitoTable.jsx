import React, { useEffect, useMemo, useState } from "react";
// layout for this page
import { useAuthenticator } from "@aws-amplify/ui-react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import {
  AssignmentTwoTone,
  EditTwoTone,
  PostAddTwoTone
} from "@mui/icons-material";
import { Avatar, CardHeader, Icon, useMediaQuery, useTheme } from "@mui/material";
import { API, Auth } from "aws-amplify";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import TypesUsuarios from "../../types/typesUsuario";
import AuthUtils from "../../utils/authUtils";



export default function UsuariosTable() {

  const router = useRouter();
  const theme = useTheme();
  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { enqueueSnackbar } = useSnackbar();

  const { material_table } = useSelector((state) => state.app);

  const [data, setUsers] = useState([]);

  const userStore = useSelector((state) => state.usuario);
  const { user: userCognito } = useAuthenticator((context) => [context.user]);

  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
  const moduloUsuario = useMemo(() => new TypesUsuarios(router), [router]);


  useEffect(() => {
    const listUsers = async () => {
      try {

        const apiName = 'AdminQueries';
        const path = '/listUsers';
        const myInit = {
          queryStringParameters: {
            limit: 10,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          },
        };
        const response = await API.get(apiName, path, myInit);
        setUsers(response.Users);
      } catch (error) {
        console.error('Error listing users', error);
      }
    };

    listUsers();
  }, []);

  console.log(data);
  return (
    <>
      <MaterialTable

        title={
          <CardHeader
            avatar={
              <Avatar variant='rounded' sx={{ width: 50, height: 50 }}>
                <Icon style={{ fontSize: 45 }} color="primary" >
                  {moduloUsuario.icon}
                </Icon>
              </Avatar>
            }
            title={'LISTA DE USUARIOS'}
            titleTypographyProps={{
              variant: 'h6'
            }}
            subheader={data.length + ' Registros'}
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
            title: "USERNAME",
            field: "Username",
            type: "string",
            align: "left",
            filtering: false,
            grouping: false,
            defaultSort: "asc",
            headerStyle: {
              width: "20%",
              maxWidth: "20%",
              align: "center",
            },
            cellStyle: (rowData) => ({
              width: "20%",
              maxWidth: "20%",
            }),
          },
          {
            title: "Fecha Creacion",
            field: "UserCreateDate",
            render: (rowData) => moment.parseZone(rowData.UserCreateDate)
              .utc()
              .format("LLL"),
            type: "date",
            align: "left",
            filtering: false,
            grouping: false,
            defaultSort: "asc",
            headerStyle: {
              width: "20%",
              maxWidth: "20%",
              align: "center",
            },
            cellStyle: (rowData) => ({
              width: "20%",
              maxWidth: "20%",
            }),
          },

          {
            title: "Ultima Modificacion",
            field: "UserLastModifiedDate",
            align: "center",
            type: "date",
            render: (rowData) => moment.parseZone(rowData.UserLastModifiedDate)
              .utc()
              .format("LLL"),
            filtering: false,
            headerStyle: {
              width: "40%",
              maxWidth: "40%",
              align: "center",
            },
            cellStyle: (rowData) => ({
              width: "50%",
              maxWidth: "50%",
            }),
          },

          {
            title: "ESTADO",
            field: "UserStatus",
            hidden: breakpoints_sm ? false : true,
            filtering: false,
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
          {
            title: "ACTIVO",
            field: "Enabled",
            type: 'boolean',
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
        data={data}

        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: theme.palette.grey[300] }}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        options={{
          ...material_table.options,

          columnsButton: true,
          pageSize: 5

        }}
        icons={material_table.icons}
        localization={material_table.localization}
        style={material_table.style}
        actions={[
          {
            icon: () => (
              <PostAddTwoTone sx={{ fontSize: 24 }} color="secondary" />
            ),
            tooltip: "Ingresar",
            isFreeAction: true,
            onClick: (event) => utilsAuth.isPermisoAuthorized(TypesUsuarios.getAllPermisos().AGREGAR_USUARIO, true)
              && moduloUsuario.pushPathCreate('/usuario'),
          },
          {
            icon: () => (
              <AssignmentTwoTone sx={{ fontSize: 24 }} color={"action"} />
            ),
            tooltip: "Ver",
            onClick: (event, rowData) => utilsAuth.isPermisoAuthorized(TypesUsuarios.getAllPermisos().VER_USUARIO, true)
              && moduloUsuario.pushPathView({ sub: rowData.Attributes.find(attr => attr.Name === 'sub')?.Value, username: rowData.Username }, '/usuario'),
          },
          {
            icon: () => (
              <EditTwoTone sx={{ fontSize: 24 }} color={"action"} />
            ),
            tooltip: "Modificar",
            onClick: (event, rowData) =>
              utilsAuth.isPermisoAuthorized(TypesUsuarios.getAllPermisos().UPDATE_USUARIO, true)
              && moduloUsuario.pushPathUpdate(rowData.id, '/usuario'),


          },
        ]}
      />

    </>

  )
}
