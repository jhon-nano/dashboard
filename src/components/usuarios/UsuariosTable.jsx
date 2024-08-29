import React, { useMemo } from "react";
// layout for this page
import { useAuthenticator } from "@aws-amplify/ui-react";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import {
    AssignmentTwoTone,
    EditTwoTone,
    PostAddTwoTone
} from "@mui/icons-material";
import { Avatar, CardHeader, Icon, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import TypesUsuarios from "../../types/typesUsuario";
import AuthUtils from "../../utils/authUtils";



export default function UsuariosTable({ data, loadingUsuarios }) {

    const router = useRouter();
    const theme = useTheme();
    const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
    const { enqueueSnackbar } = useSnackbar();

    const { material_table } = useSelector((state) => state.app);



    const userStore = useSelector((state) => state.usuario);
    const { user: userCognito } = useAuthenticator((context) => [context.user]);

    const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
    const moduloUsuario = useMemo(() => new TypesUsuarios(router), [router]);

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
                        field: "username",
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
                        title: "MODULOS",
                        field: "modulos",
                        type: "string",
                        align: "left",
                        editable: 'never',
                        render: (rowData) =>
                            <Stack direction={'row'}>
                                {rowData.modulos_new?.map((modulo) =>
                                    <Stack
                                        key={modulo.path}
                                        alignItems={"center"}
                                        sx={{
                                            p: 0.5,
                                            height: "100%",

                                            border: '1px dashed grey'
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{ boxShadow: `0 0 8px ${theme.palette.primary.main}` }}
                                        >
                                            <Icon color='primary' style={{
                                                fontSize: 15,

                                            }}>
                                                {modulo?.icon}
                                            </Icon>
                                        </IconButton>
                                        <Typography
                                            sx={{
                                                noWrap: true,
                                                padding: "1px",
                                                textAlign: "center",
                                                fontSize: 9,

                                                fontWeight: "bold",

                                            }}
                                            color='secondary'
                                        >
                                            {modulo?.nombreModulo}
                                        </Typography>
                                    </Stack>)}
                            </Stack>,
                        defaultSort: "asc",
                        headerStyle: {
                            width: "40%",
                            maxWidth: "40%",
                            align: "center",
                        },
                        cellStyle: (rowData) => ({
                            width: "40%",
                            maxWidth: "40%",
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
                data={data}
                isLoading={loadingUsuarios}
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

        </>

    )
}
