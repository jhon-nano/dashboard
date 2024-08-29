import React, { useEffect, useMemo, useState } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import TypesUsuarios from '../../types/typesUsuario';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { Avatar, CardHeader, Icon, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { AssignmentTwoTone, EditTwoTone, PostAddTwoTone } from '@mui/icons-material';

const ListUsers = () => {

    const theme = useTheme();
    const router = useRouter();
    const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));


    const moduloUsuario = useMemo(() => new TypesUsuarios(router), [router]);

    const appStore = useSelector((state) => state.app);

    const { material_table } = appStore;
    const [users, setUsers] = useState([]);

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


    console.log(users)

    return (
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
                    subheader={users.length + ' Registros'}
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
                    title: "USUARIO",
                    field: "nombreUsuario",
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
                    title: "SUB",
                    field: "sub",
                    align: "center",

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
                    field: "estado",
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
            ]}
            data={users}
            // isLoading={loadingUsuarios}
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
                        && moduloUsuario.pushPathView(rowData.id, '/usuario'),
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
    );
};

export default ListUsers;
