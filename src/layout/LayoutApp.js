import {
  Content,
  EdgeSidebar,
  EdgeTrigger,
  Footer,
  getFixedScheme,
  Header,
  Root,
  SidebarContent
} from "@mui-treasury/layout";
import {
  ContentMockup,
  HeaderMockup,
  NavSidebarMockup
} from "@mui-treasury/mockup/layout";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Menu as MenuIcon
} from "@mui/icons-material";
import {
  ButtonBase,
  CardHeader,
  ClickAwayListener,
  Divider,
  Fade,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
//CONTEXT

import { Image, useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { useDispatch, useSelector } from "react-redux";

import SibeBarApp from "../components/dashboard/SibeBarApp";
import BackdropLoading from "../components/otros/BackdropLoading";


import FooterApp from "../components/dashboard/FooterApp";

import useCheckUser from "../hooks/useCheckUser";

import { useSnackbar } from "notistack";

import UsuarioAvatar from "../components/usuarios/UsuarioAvatar";
import AuthUtils from "../utils/authUtils";
import { DataStore } from "aws-amplify";
import { components } from "../components/auth/AuthLogin";
import { loadingPagina, stopLoadingPagina } from "../store/actions/app";
import { useRouter } from "next/router";



const scheme = getFixedScheme();



function LayoutApp({ pathnames, header, children, open, message, open_cloud }) {


  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const router = useRouter();
  const dispatch = useDispatch();

  const { user: userCognito, route } = useAuthenticator((context) => [context.user, context.route]);


  const userStore = useSelector((state) => state.usuario);
  const appStore = useSelector((state) => state.app);

  const { loadingUser } = useCheckUser(pathnames);

  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);

  const [value, setValue] = useState(0);


  const { usuario, modulo, modulosAutorizados } = userStore;
  const { loading_pag } = appStore;


  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { value, userCognito, userStore, appStore, utilsAuth,setValue  }) // props a las paginas
  );

  const headerWithProps = React.Children.map(header, (child) =>
    React.cloneElement(child, { pathnames, value, userCognito, userStore, appStore, utilsAuth, setValue }) // props a las paginas
  );





  useEffect(() => {
    setValue(0)

    return () => {
      setValue(0)
    }
  }, [pathnames])





  return (
    route === 'authenticated' && userCognito ?
      <>
        <Root
          scheme={{
            ...scheme,
            header: {
              ...scheme.header,
              config: {
                ...scheme.header.config,
                md: {
                  ...scheme.header.config.md,
                  position: 'fixed'
                }
              }
            },
            leftEdgeSidebar: {
              ...scheme.leftEdgeSidebar,
              autoCollapse: "md",
              config: {
                ...scheme.leftEdgeSidebar.config,
                md: {
                  ...scheme.leftEdgeSidebar.config.md,
                  collapsedWidth: 88,
                },
              },
            },

          }}
        >
          {({ setOpen, setCollapsed }) => (
            <Box>
              <ClickAwayListener
                onClickAway={() => {
                  setCollapsed("leftEdgeSidebar", true);
                  setOpen("leftEdgeSidebar", false);
                }}
              >
                <Box >
                  <Header sx={{ background: theme.palette.primary.main, displayPrint: "none", }}>
                    {utilsAuth.isAdmin(userCognito) ||
                      utilsAuth.isUser(userCognito) && loadingUser ? (
                      ({ state }) => {
                        //console.log(state)
                        return <Toolbar>
                          <EdgeTrigger target={{ anchor: "left", field: "open" }}>
                            {(open, setOpen) => (
                              <IconButton
                                onClick={() => setOpen(!open)}
                                edge="end"
                                sx={{ width: 42, height: 42 }}
                              >
                                {open ? (
                                  <KeyboardArrowLeft />
                                ) : (
                                  <MenuIcon
                                    color='action'
                                    sx={{
                                      fontSize: 30,
                                      margin: 1,
                                    }}
                                  />
                                )}
                              </IconButton>
                            )}
                          </EdgeTrigger>


                          <CardHeader


                            subheader={breakpoints_sm && pathnames.length > 0 ? modulo?.nombreModulo : <b>
                              {usuario?.nombreUsuario}
                            </b>}
                            title={breakpoints_sm && pathnames.length > 0 ? 'LINEA' : 'Bienvenid@'}
                            titleTypographyProps={{
                              color: 'white',
                              fontSize: 16,
                              
                            }}
                            subheaderTypographyProps={{
                              variant: 'h6',
                              textTransform: 'uppercase',
                              color: 'whitesmoke',
                              fontSize: 12,
                            }}
                          />

                          <Box flexGrow={1}>
                            {headerWithProps}
                          </Box>
                          <Divider orientation="vertical" variant="middle" flexItem sx={{ background: 'white', margin: 1 }} />
                          <UsuarioAvatar />
                        </Toolbar>
                      }

                    ) : (
                      <HeaderMockup />
                    )}

                  </Header>
                  <EdgeSidebar anchor="left" sx={{ zIndex: 1400, displayPrint: "none", }}>
                    {({ state }) => (
                      <>
                        <SidebarContent sx={{ background: theme.palette.grey[300] }}>
                          {utilsAuth.isAdmin(userCognito) || utilsAuth.isUser(userCognito) ? (
                            <SibeBarApp
                              state={state}
                              setOpen={setOpen}
                              setCollapsed={setCollapsed}
                              modulosAutorizados={modulosAutorizados}
                              pathnames={pathnames}
                            />
                          ) : (
                            <NavSidebarMockup />
                          )}
                        </SidebarContent>
                        <EdgeTrigger
                          target={{ anchor: "left", field: "collapsed" }}
                        >
                          {(collapsed, setCollapsed) => (
                            <ButtonBase
                              onClick={() => setCollapsed(!collapsed)}
                              sx={{ flexGrow: 1, height: 48 }}
                            >
                              {collapsed ? (
                                <KeyboardArrowRight />
                              ) : (
                                <KeyboardArrowLeft />
                              )}
                            </ButtonBase>
                          )}
                        </EdgeTrigger>
                      </>
                    )}
                  </EdgeSidebar>
                </Box>
              </ClickAwayListener>
              <Content sx={{ marginBottom: 6 }}>
                <Stack>
                  {!loading_pag &&
                    (utilsAuth.isAdmin(userCognito) || utilsAuth.isUser(userCognito)) ? (
                    <Stack>
                      <Fade

                        in={!loading_pag}
                        {...(!loading_pag ? { timeout: 2000 } : {})}
                      >
                        <Stack>
                          <Box sx={{ padding: 1 }} >{childrenWithProps}

                          </Box>
                        </Stack>
                      </Fade>
                    </Stack>
                  ) : (
                    <ContentMockup />
                  )}
                </Stack>


              </Content>
              <Footer>
                <FooterApp pathnames={pathnames} open={open} message={message} open_cloud={open_cloud} />
              </Footer>


            </Box>
          )
          }
        </Root >
        <BackdropLoading />
      </>
      : 'Loading...'

  );
}


export default LayoutApp;
