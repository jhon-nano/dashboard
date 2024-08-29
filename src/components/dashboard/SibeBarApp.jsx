import {
  Image, useAuthenticator
} from "@aws-amplify/ui-react";
import { AddToQueueTwoTone, ControlPointTwoTone, ExpandLessTwoTone, ExpandMoreTwoTone } from "@mui/icons-material";
import {
  Avatar,
  CardHeader,
  Collapse,
  Icon,
  IconButton,
  ListItemButton,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import * as React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import TypesDocumentos from "../../types/typesDocumentos";
import TypesModulos from "../../types/typesModulos";
import TypesVenta from "../../types/typesVentas";
import AuthUtils from "../../utils/authUtils";



export function SibeBarApp({
  state,
  setOpen,
  setCollapsed,
  pathnames
}) {

  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const userStore = useSelector((state) => state.usuario);
  const { user: userCognito } = useAuthenticator((context) => [context.user]);

  const { usuario, modulo } = userStore


  const modulos = useMemo(() => new TypesModulos(router), [router]);
  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);


  const moduloVentas = useMemo(() => new TypesVenta(router), [router]);

  const moduloDocumentos = useMemo(() => new TypesDocumentos(router), [router]);


  const [openStates, setOpenStates] = React.useState(() => {
    const initialState = {};
    Object.keys(modulos).forEach(modulo => {
      initialState[modulos[modulo].path] = false;
    });
    return initialState;
  });

  const handleClickOpenState = (key) => {
    console.log(key)
    setOpenStates(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };




  React.useEffect(() => {

    setCollapsed("leftEdgeSidebar", true);

    return (() => {
      setCollapsed("leftEdgeSidebar", true);
    })
  }, [router]);


  function SubHeader() {
    return (
      <Box sx={{ background: "white", paddingLeft: 0.4 }}>
        {(!state?.leftEdgeSidebar?.collapsed ||
          state?.leftEdgeSidebar?.open ? (
          <CardHeader
            avatar={
              <Avatar aria-label="" variant="rounded" sizes="large" sx={{
                width: 56, height: 56,
                background: theme.palette?.secondary.main
              }} >
                <Image
                  alt="logo"
                  src="/img/CodeLine.png"
                  padding={theme.tokens?.space.medium}
                  style={{ color: 'white' }}
                />
              </Avatar>
            }
            title={pathnames.length !== 0 ? "MODULOS AUTORIZADOS" : "ACCESO RAPIDO"}
            titleTypographyProps={{
              variant: 'button',
              color: 'white',
              fontSize: 16
            }}
            sx={{ background: theme?.palette?.primary.main, height: 65 }}
          />
        ) : (
          <React.Fragment>
            <Box display={{ xs: "none", sm: "none", md: "block" }} paddingLeft={1} paddingRight={1} paddingTop={0.5} sx={{ background: theme?.palette?.secondary.main }}>
              <Image
                alt="logo"
                src="/img/CodeLine.png"

                padding={theme.tokens?.space.medium}
                style={{ color: 'white' }}
              />
            </Box>
            {pathnames.length !== 0 ? <Typography
              sx={{
                noWrap: true,
                padding: 0,
                textAlign: 'center',
                fontSize: 8,
                flexWrap: 1,
                fontWeight: "bold",
                background: theme?.palette?.primary.main
              }}
              color={'white'}
            >
              MODULOS AUTORIZADOS
            </Typography> :
              <Typography
                sx={{
                  noWrap: true,
                  padding: 0,
                  textAlign: 'center',
                  fontSize: 8,
                  flexWrap: 1,
                  fontWeight: "bold",
                  background: theme?.palette?.primary.main
                }}
                color={'white'}
              >
                ACCESO RAPIDO
              </Typography>
            }
          </React.Fragment>
        ))}
      </Box>
    );
  }





  function HomeButton() {

    return (
      <Box >
        {!state?.leftEdgeSidebar?.collapsed || state?.leftEdgeSidebar?.open ?
          (router.pathname !== "/" &&
            <ListItemButton

              alignItems="center"
              disableGutters
              divider
              onClick={() => {
                router.push('/');
              }}
              sx={{ background: 'white' }}
            >
              <ListItemIcon sx={{ margin: 0.5, paddingLeft: 1, paddingRight: 1 }}>

                <IconButton

                  sx={{ boxShadow: `0 0 8px ${theme.palette.primary.main}`, background: 'white' }}
                >
                  <Icon color='primary' style={{
                    fontSize: 35,

                  }}>
                    {'home'}
                  </Icon>
                </IconButton>

              </ListItemIcon>

              <ListItemText
                sx={{
                  borderRadius: "3%",
                  WebkitTextStroke: "1px " + theme?.palette?.text.secondary,
                }}
                primary={'PAGINA'}
                secondary='Principal'

                primaryTypographyProps={{
                  noWrap: true,

                  variant: 'caption'
                }}

              />
            </ListItemButton>
          ) :
          (
            (router.pathname !== "/") &&
            <Stack
              alignItems={"center"}
              sx={{

                pt: 0.5,


                borderBottom: '1px dashed grey'
              }}
            >
              <IconButton
                onClick={() => {
                  router.push('/');
                }}
                sx={{ background: 'white', boxShadow: `0 0 8px ${theme.palette.primary.main}` }}

              >
                <Icon color='primary' style={{
                  fontSize: 35,

                }}>
                  {'home'}
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
                INICIO
              </Typography>
            </Stack>

          )}
      </Box>
    );
  }



  function ModuloButton() {

    const condicion = pathnames.length > 1
    const excluir = router.pathname !== '/ventas/pedidos' &&
      router.pathname !== '/ventas/cotizacion' &&
      router.pathname !== '/carteras/clientes' &&
      router.pathname !== '/carteras/proveedores' &&
      router.pathname !== '/documentos/recaudo' &&
      router.pathname !== '/documentos/pagos'



    return (condicion && excluir &&
      <Box >
        {!state?.leftEdgeSidebar?.collapsed || state?.leftEdgeSidebar?.open ?
          (
            <ListItemButton

              alignItems="center"
              disableGutters
              divider
              onClick={() => {
                modulo.pushPath()
              }}

            >
              <ListItemIcon sx={{ margin: 0.5, paddingLeft: 1, paddingRight: 1 }}>

                <IconButton
                  onClick={() => router.back()}
                  sx={{ background: 'white', boxShadow: `0 0 8px ${theme.palette.primary.main}` }}

                >
                  <Icon color='primary' style={{
                    fontSize: 35,
                    color: `/${pathnames[0]}` === modulo?.path
                      ? `white`
                      : null,
                  }}>
                    {modulo?.icon}
                  </Icon>
                </IconButton>

              </ListItemIcon>

              <ListItemText
                sx={{
                  borderRadius: "3%",
                  WebkitTextStroke: "1px " + theme?.palette?.text.secondary,
                }}
                primary={'LINEA'}
                secondary={modulo && modulo.nombreModulo && modulo?.nombreModulo.toUpperCase()}

                primaryTypographyProps={{
                  noWrap: true,

                  variant: 'caption'
                }}

              />
            </ListItemButton>
          ) :
          (

            <Stack
              alignItems={"center"}
              sx={{

                pt: 0.5,

                borderBottom: '1px dashed grey'
              }}
            >
              <IconButton
                onClick={() => modulo.pushPath()}
                sx={{ background: 'white', boxShadow: `0 0 8px ${theme.palette.primary.main}` }}

              >
                <Icon color='primary' style={{
                  fontSize: 40,

                }}>
                  {modulo?.icon}
                </Icon>
              </IconButton>
              <Typography
                sx={{
                  noWrap: true,
                  padding: "1px",
                  textAlign: "center",
                  fontSize: 8,

                  fontWeight: "bold",

                }}
              >
                {modulo && modulo.nombreModulo && modulo?.nombreModulo.toUpperCase()}
              </Typography>
            </Stack>

          )}
      </Box>
    );
  }

  function CreateButton() {






    const incluir = router.pathname == "/productos/view/producto" ||
      router.pathname == "/compras/view/compra" ||
      router.pathname == "/terceros/view/tercero" ||
      router.pathname == "/ventas/view/pedido" ||
      router.pathname == "/ventas/view/cotizacion" ||
      router.pathname == "/documentos/view/pago" ||
      router.pathname == "/documentos/view/recibo"





    function clickCreate() {
      switch (router.pathname) {
        case "/productos/view/producto":
          return modulo.pushPathCreate('/' + 'producto')
        case "/compras/view/compra":
          return modulo.pushPathCreate('/' + 'compra')
        case "/terceros/view/tercero":
          return modulo.pushPathCreate()
        case "/ventas/view/pedido":
          return moduloVentas.pushPathCreate('/' + 'pedido')
        case "/ventas/view/cotizacion":
          return moduloVentas.pushPathCreate('/' + 'cotizacion')
        case "/documentos/view/pago":
          return moduloDocumentos.pushPathCreate('/' + 'pago')
        case "/documentos/view/recibo":
          return moduloDocumentos.pushPathCreate('/' + 'recibo')
        default:
          break;
      }
    }

    return (
      <Box >
        {!state?.leftEdgeSidebar?.collapsed || state?.leftEdgeSidebar?.open ?
          incluir && (
            <ListItemButton

              alignItems="center"
              disableGutters
              divider
              onClick={() => clickCreate()}

            >
              <ListItemIcon sx={{ margin: 0.5, paddingLeft: 1, paddingRight: 1 }}>

                <IconButton
                  onClick={() => router.back()}
                  sx={{ background: 'white', boxShadow: `0 0 8px ${theme.palette.primary.main}` }}

                >
                  <AddToQueueTwoTone color='primary' sx={{
                    fontSize: 35,

                  }} />
                </IconButton>

              </ListItemIcon>

              <ListItemText
                sx={{
                  borderRadius: "3%",
                  WebkitTextStroke: "1px " + theme?.palette?.text.secondary,
                }}
                primary={'AGREGAR'}
                secondary={modulo?.nombreModulo?.toUpperCase()}

                primaryTypographyProps={{
                  noWrap: true,

                  variant: 'caption'
                }}

              />
            </ListItemButton>
          ) :
          incluir && (

            <Stack
              alignItems={"center"}
              sx={{

                pt: 0.5,

                borderBottom: '1px dashed grey'
              }}
            >
              <IconButton
                onClick={() => clickCreate()}
                sx={{ background: 'white', boxShadow: `0 0 8px ${theme.palette.primary.main}` }}

              >
                <ControlPointTwoTone color='secondary' style={{
                  fontSize: 35,

                }} />
              </IconButton>
              <Typography
                sx={{
                  noWrap: true,
                  padding: "1px",
                  textAlign: "center",
                  fontSize: 8,

                  fontWeight: "bold",

                }}
              >
                AGREGAR {modulo?.nombreModulo?.toUpperCase()}
              </Typography>
            </Stack>

          )}
      </Box>
    );
  }


  return (
    <List
      component="nav"

      dense
      subheader={
        <SubHeader />
      }
      sx={{
        maxWidth: 256,
      }}
    >


      <HomeButton />
      <ModuloButton />
      <CreateButton />




      {usuario && usuario.modulos_new.length > 0 ? (
        modulos.getModulosApp().filter((m) => utilsAuth.isAdmin(userCognito) || usuario.modulos_new?.some(e => e?.path == m.path && m.visible == true))
        .sort((a, b) => a.nombreModulo.localeCompare(b.nombreModulo))  
        .map((modulo, i) => (
            <Box key={i} >
              {!state?.leftEdgeSidebar?.collapsed || state?.leftEdgeSidebar?.open && pathnames.length < 2 ?
                (<>
                  <ListItemButton
                    selected={`/${pathnames[0]}` === modulo?.path}
                    alignItems="center"
                    disableGutters
                    divider

                    onClick={() => modulo.submodulos ? handleClickOpenState(modulo.path) : utilsAuth.isModuloAuthorized(modulo, true) && modulo.pushPath()}
                    sx={{ background: 'white' }}
                  >
                    <ListItemIcon sx={{ margin: 0.5, paddingLeft: 1, paddingRight: 1 }}>

                      <IconButton

                        sx={{
                          boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                          background: `/${pathnames[0]}` === modulo?.path
                            ? `${theme.palette.secondary.main}`
                            : `white`,
                        }}
                      >
                        <Icon color='primary' style={{
                          fontSize: 35,
                          color: `/${pathnames[0]}` === modulo?.path
                            ? `white`
                            : null,
                        }}>
                          {modulo?.icon}
                        </Icon>
                      </IconButton>

                    </ListItemIcon>

                    <ListItemText
                      sx={{
                        borderRadius: "3%",
                        WebkitTextStroke: "1px " + theme?.palette?.text.secondary,
                      }}
                      primary={'LINEA'}


                      primaryTypographyProps={{
                        noWrap: true,

                        variant: 'caption'
                      }}
                      secondary={modulo?.nombreModulo?.toUpperCase()}
                    />
                    {modulo.submodulos && (openStates[modulo.path] ? <ExpandLessTwoTone /> : <ExpandMoreTwoTone />)}


                  </ListItemButton>
                  {modulo.submodulos &&
                    <Collapse in={openStates[modulo.path]} timeout="auto" unmountOnExit>
                      <List dense component="div" disablePadding>
                        {Object.keys(modulo.submodulos).map((submodKey) => {

                          const submod = modulo.submodulos[submodKey];

                          return submod.visible && (
                            <ListItemButton key={submodKey} sx={{ pl: 2 }} divider
                              onClick={() => utilsAuth.isModuloAuthorized(submod, true) && modulo.pushPath()}

                            >
                              <ListItemIcon sx={{ margin: 0.2, paddingLeft: 0.5, paddingRight: 0.5 }}>

                                <IconButton

                                  sx={{
                                    boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                                    background: `/${pathnames[0]}` === submod?.path
                                      ? `${theme.palette.secondary.main}`
                                      : `white`,
                                  }}
                                >
                                  <Icon color='primary' style={{
                                    fontSize: 25,
                                    color: `/${pathnames[0]}` === submod?.path
                                      ? `white`
                                      : null,
                                  }}>
                                    {submod?.icon}
                                  </Icon>
                                </IconButton>
                              </ListItemIcon>
                              <ListItemText
                                sx={{
                                  borderRadius: "3%",
                                  WebkitTextStroke: "1px " + theme?.palette?.text.secondary,
                                }}
                                primary={'SUB LINEA'}


                                primaryTypographyProps={{
                                  noWrap: true,

                                  variant: 'caption'
                                }}
                                secondary={submod?.nombreModulo?.toUpperCase()}
                              />
                            </ListItemButton>)
                        })}
                      </List>
                    </Collapse>}
                </>
                ) :
                (
                  (router.pathname !== "/") && pathnames.length < 2 ||
                    router.pathname == '/ventas/pedidos' ||
                    router.pathname == '/ventas/cotizacion' ||
                    router.pathname == '/carteras/clientes' ||
                    router.pathname == '/carteras/proveedores' ||
                    router.pathname == '/documentos/recaudo' ||
                    router.pathname == '/documentos/pagos' ?
                    <>
                      <Stack
                        alignItems={"center"}
                        sx={{

                          pt: 0.5,

                          borderBottom: '1px dashed grey'
                        }}
                      >

                        {modulo.submodulos ?
                          <Avatar
                            variant="rounded"
                            onClick={() => handleClickOpenState(modulo.path)}
                            sx={{
                              width: 45,
                              height: 45,
                              boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                              background: `/${pathnames[0]}` === modulo?.path
                                ? `${theme.palette.secondary.main}`
                                : `white`,


                            }}
                          >
                            <Icon color='primary' style={{
                              fontSize: 40,
                              color: `/${pathnames[0]}` === modulo?.path
                                ? `white`
                                : null,
                            }}>
                              {modulo?.icon}
                            </Icon>

                          </Avatar>
                          :
                          <IconButton
                            onClick={() => utilsAuth.isModuloAuthorized(modulo, true) && modulo.pushPath()}
                            sx={{
                              boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                              background: `/${pathnames[0]}` === modulo?.path
                                ? `${theme.palette.secondary.main}`
                                : `white`,

                            }}

                          >
                            <Icon color='primary' style={{
                              fontSize: 30,
                              color: `/${pathnames[0]}` === modulo?.path
                                ? `white`
                                : null,
                            }}>
                              {modulo?.icon}
                            </Icon>
                          </IconButton>
                        }

                        <Typography
                          sx={{
                            noWrap: true,
                            padding: "1px",
                            textAlign: "center",
                            fontSize: 10,
                            width: 70,
                            paddingLeft: 1,
                            fontWeight: "bold",
                            whiteSpace: 'nowrap', // Evita el salto de línea
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
                          }}
                        >
                          {modulo?.nombreModulo?.toUpperCase()}
                          {modulo.submodulos && (openStates[modulo.path] ? <ExpandLessTwoTone sx={{ fontSize: 10 }} /> : <ExpandMoreTwoTone sx={{ fontSize: 10 }} />)}
                        </Typography>
                      </Stack>
                      {modulo.submodulos &&
                        <Collapse in={openStates[modulo.path]} timeout="auto" unmountOnExit>
                          <List dense component="div" disablePadding>
                            {Object.keys(modulo.submodulos).map((submodKey) => {

                              const submod = modulo.submodulos[submodKey];

                              return submod.visible && (

                                <Stack
                                  key={submodKey}
                                  alignItems={"center"}
                                  sx={{

                                    pt: 0.5,

                                    borderBottom: '1px dashed grey'
                                  }}
                                >
                                  <IconButton
                                    onClick={() => utilsAuth.isModuloAuthorized(submod, true) && submod.pushPath()}
                                    sx={{
                                      boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                                      background: `/${pathnames[0]}` === submod?.path
                                        ? `${theme.palette.secondary.main}`
                                        : `white`,

                                    }}

                                  >
                                    <Icon color='primary' style={{
                                      fontSize: 25,
                                      color: `/${pathnames[0]}` === submod?.path
                                        ? `white`
                                        : null,
                                    }}>
                                      {submod?.icon}
                                    </Icon>
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      noWrap: true,
                                      padding: "1px",
                                      textAlign: "center",
                                      fontSize: 8,

                                      fontWeight: "bold",

                                    }}
                                  >
                                    {submod?.nombreModulo?.toUpperCase()}
                                  </Typography>
                                </Stack>)
                            })}
                          </List>
                        </Collapse>}


                    </>
                    :
                    <Stack alignContent={'center'} alignItems={'center'} borderBottom='1px dashed grey' padding={1}>
                      <Skeleton variant="circular" width={45} height={45} />
                      <Skeleton variant="text" height={16} width={45} />

                    </Stack>
                )}
            </Box>
          ))
      ) : (
        <Stack spacing={1}>
          {Array.from(new Array(1)).map((dato, i, array) => (
            <Skeleton key={i} variant="rect" width="100%" height={50} />
          ))}


        </Stack>
      )}





    </List>
  );
}

SibeBarApp.propTypes = {
  state: PropTypes.shape({}),
  setCollapsed: PropTypes.func,
  setOpen: PropTypes.func,
};

SibeBarApp.defaultProps = {};

export default SibeBarApp;
