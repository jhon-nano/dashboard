import { AdminPanelSettings, AppRegistrationTwoTone, AppsTwoTone, Business, BusinessTwoTone, CancelTwoTone, PersonTwoTone } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  CardHeader,
  Container,
  DialogContent,
  Divider,
  Grid,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
  useTheme
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ModuloCardActions from "../../../components/modulos/ModuloCardActions";
import Modal from "../../../components/otros/Modal";
import UsuarioListAlmacenesModuloAuth from "../../../components/usuarios/UsuarioListAlmacenesModuloAuth";
import UsuarioListModulosAuth from "../../../components/usuarios/UsuarioListModulosAuth";
import UsuarioListPermisosModuloAuth from "../../../components/usuarios/UsuarioListPermisosModuloAuth";
import { useModelIDUsuario } from "../../../hooks/models/useModelUsuario";
import { useModel } from "../../../hooks/useModel";
import LayoutApp from "../../../layout/LayoutApp";
import {
  Almacen
} from "../../../models";


moment.locale("es");




export default function UsuarioID(props) {
  const router = useRouter();
  const theme = useTheme();



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [open_autorizacion, setOpenAutorizacion] = useState(false);
  const [open_aut_almacenes, setOpenAutAlmacenes] = useState(false);
  const [open_aut_permisos, setOpenAutPermisos] = useState(false);
  const [checkedModulos, setCheckedModulos] = useState([]);

  const [modulo_select, setModuloSelect] = useState(null);


  const { loading, usuario, almacenes_usuario, permisos_usuario, error } = useModelIDUsuario(router.query.id);



  const { data: almacenes } = useModel(Almacen);



  useEffect(() => {
    if (usuario !== null) {


      const newChecked = [];
      usuario.modulos_new?.map((modulo) => newChecked.push(modulo?.path));
      setCheckedModulos(newChecked);

    }
  }, [usuario]);




  return (
    usuario && (
      <Container >
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <PersonTwoTone sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 40 }} />
              <Stack padding={1}>

                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: "normal",
                    fontStyle: "italic",
                  }}
                  noWrap
                >
                  <b>
                    USUARIO
                  </b>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    lineHeight: "normal",
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}
                >
                  {usuario.nombreUsuario}
                </Typography>
              </Stack>

              <Box flexGrow={1} />
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                sx={{
                  background: "white",
                  mr: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                  },
                }}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="secondary"
              >
                <AdminPanelSettings sx={{ fontSize: 24 }} color="inherit" />
              </IconButton>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                sx={{
                  background: "white",
                  mr: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                  },
                }}
                onClick={() => setOpenAutorizacion(true)}
                color="secondary"
              >
                <AppRegistrationTwoTone sx={{ fontSize: 24 }} color="inherit" />
              </IconButton>

            </Toolbar>
          </Container>
        </AppBar>
        <Divider sx={{ m: 1 }}><Typography align="center" variant="h5">MODULOS AUTORIZADOS</Typography></Divider>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}

        >

          {usuario !== null && usuario.modulos_new?.length > 0
            ? usuario.modulos_new
              .map((modulo, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Stack alignItems="center">
                    <ModuloCardActions modulo={modulo} setModuloSelect={setModuloSelect} setOpenAutAlmacenes={setOpenAutAlmacenes} setOpenAutPermisos={setOpenAutPermisos} />

                  </Stack>
                </Grid>
              ))
            : Array.from(new Array(9)).map((dato, i, array) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={4} xl={4}>
                <Skeleton variant="rect" width="100%" height={170} />
              </Grid>
            ))}
        </Grid>

        {!!open_aut_almacenes && (
          <Modal
            open={open_aut_almacenes}
            onClose={() => setOpenAutAlmacenes(false)}
          >
                        <CardHeader
              avatar={
                <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                  <BusinessTwoTone color="secondary" sx={{ fontSize: 50 }}/>
                </Avatar>}
              title="ALMACENES"
              subheader={'para ' + modulo_select.nombreModulo}
              titleTypographyProps={{
                color: 'primary',
                variant: 'button',
                color: 'white',
                fontSize: 18
              }}
              subheaderTypographyProps={{
                color: 'white',
                fontSize: 16,
                variant: 'caption',
              }}
              sx={{

                background: theme.palette.secondary.main,
              }}
              action={
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenAutPermisos(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelTwoTone color="error" />
                </IconButton>}
            />
            <DialogContent sx={{ boxShadow: '0 3px 5px 2px rgba(255, 255, 255 , .3)', border: 3 }}>
            <UsuarioListAlmacenesModuloAuth
              almacenes={almacenes}
              modulo={modulo_select}
              almacenes_usuario={almacenes_usuario}
              usuario={usuario}
            />

            </DialogContent>
           
          </Modal>
        )}
        {!!open_aut_permisos && (
          <Modal open={open_aut_permisos} onClose={() => setOpenAutPermisos(false)}>
            <CardHeader
              avatar={
                <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                  <Icon color="secondary" style={{ fontSize: 50 }}>
                    {modulo_select.icon}
                  </Icon>
                </Avatar>}
              title="PERMISOS"
              subheader={'para ' + modulo_select.nombreModulo}
              titleTypographyProps={{
                color: 'primary',
                variant: 'button',
                color: 'white',
                fontSize: 18
              }}
              subheaderTypographyProps={{
                color: 'white',
                fontSize: 16,
                variant: 'caption',
              }}
              sx={{

                background: theme.palette.secondary.main,
              }}
              action={
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenAutPermisos(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelTwoTone color="error" />
                </IconButton>}
            />
            <DialogContent sx={{ boxShadow: '0 3px 5px 2px rgba(255, 255, 255 , .3)', border: 3 }}>
              <UsuarioListPermisosModuloAuth
                usuario={usuario}
                modulo={modulo_select}
                permisos_usuario={permisos_usuario}
              />

            </DialogContent>

          </Modal>)}
        {!!open_autorizacion && (
          <Modal
            open={open_autorizacion}
            onClose={() => setOpenAutorizacion(false)}
          >
            <CardHeader
              avatar={
                <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                  <AppsTwoTone color="secondary" sx={{ fontSize: 50 }}/>
                </Avatar>}
              title="MODULOS"
              subheader={'para Autorizar' }
              titleTypographyProps={{
                color: 'primary',
                variant: 'button',
                color: 'white',
                fontSize: 18
              }}
              subheaderTypographyProps={{
                color: 'white',
                fontSize: 16,
                variant: 'caption',
              }}
              sx={{

                background: theme.palette.secondary.main,
              }}
              action={
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenAutPermisos(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CancelTwoTone color="error" />
                </IconButton>}
            />
            <DialogContent sx={{ boxShadow: '0 3px 5px 2px rgba(255, 255, 255 , .3)', border: 3 }}>
              <UsuarioListModulosAuth
                usuario={usuario}
                checkedModulos={checkedModulos}

              />
            </DialogContent>
          </Modal>)}
      </Container>
    )
  );
}

UsuarioID.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props}>{page}</LayoutApp>;
};