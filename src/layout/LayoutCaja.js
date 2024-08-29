import {
  Content,
  EdgeSidebar,
  EdgeTrigger,
  getFixedScheme,
  Root,
  SidebarContent
} from "@mui-treasury/layout";
import {
  ContentMockup,
  NavSidebarMockup
} from "@mui-treasury/mockup/layout";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@mui/icons-material";
import {
  ButtonBase,
  ClickAwayListener,
  Fade,
  Stack,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
//CONTEXT

import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { useDispatch, useSelector } from "react-redux";

import BackdropLoading from "../components/otros/BackdropLoading";



import useCheckUser from "../hooks/useCheckUser";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { components } from "../components/auth/AuthLogin";
import SibeBarApp from "../components/dashboard/SibeBarApp";
import AuthUtils from "../utils/authUtils";
import { loadingPagina, stopLoadingPagina } from "../store/actions/app";



const scheme = getFixedScheme();



function LayoutCaja({ user, pathnames, children, header }) {


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
    React.cloneElement(child, { value, userCognito, userStore, appStore, utilsAuth, setValue }) // props a las paginas
  );

  const headerWithProps = React.Children.map(header, (child) =>
    React.cloneElement(child, { pathnames, value, setValue, userCognito, userStore, appStore, utilsAuth }) // props a las paginas
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
            topHeader: {
              ...scheme.header,
              md: {
                ...scheme.header.config.md,

              }
            }

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
                  <EdgeSidebar anchor="left" sx={{ zIndex: 1400, displayPrint: "none", }}>
                    {({ state }) => (
                      <>
                        <SidebarContent sx={{ background: theme.palette.grey[300] }}>
                          {utilsAuth.isAdmin(userCognito) || utilsAuth.isUser(userCognito) ? (
                            <SibeBarApp
                              state={state}
                              setOpen={setOpen}
                              setCollapsed={setCollapsed}

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
              <Content   >


                {!loading_pag &&
                  (utilsAuth.isAdmin(userCognito) || utilsAuth.isUser(userCognito)) ? (
                  <Stack>
                    <Fade

                      in={!loading_pag}
                      {...(!loading_pag ? { timeout: 2000 } : {})}
                    >
                      <Stack>
                        <Box sx={{ padding: 1 }} >
                          {childrenWithProps}
                        </Box>
                      </Stack>
                    </Fade>
                  </Stack>
                ) : (
                  <ContentMockup />
                )}


              </Content>




            </Box>
          )
          }
        </Root >
        <BackdropLoading />
      </>
      : 'Loading...'

  );
}

export default LayoutCaja
