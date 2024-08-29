//CSS
import "@aws-amplify/ui-react/styles.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import {
  Amplify,
  Auth
} from "aws-amplify";
import { ConfirmProvider } from "material-ui-confirm";
import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { createRef, useEffect } from "react";
import "../styles/globals.css";

//AWS
import { Alert, Fade, Snackbar } from "@mui/material";
import { SnackbarProvider } from "notistack";
import amplifyconfig from "../aws-exports";
/* Redux Store */
import { Provider, useDispatch } from "react-redux";
import { store, wrapper } from "../store/store";



import {
  createTheme,
  responsiveFontSizes
} from "@mui/material/styles";
import "react-datepicker/dist/react-datepicker.css";
// Create a theme instance.
import AuthModuloReport from "../components/notistack/AuthModuloReport";
import AuthPermisoReport from "../components/notistack/AuthPermisoReport";
import CompraComplete from "../components/notistack/CompraComplete";
import CompraCompleteXML from "../components/notistack/CompraCompleteXML";
import ReportComplete from "../components/notistack/ReportComplete";
import SuccessCreate from "../components/notistack/SuccessCreate";
//


import { AmplifyProvider, withAuthenticator } from "@aws-amplify/ui-react";
import moment from "moment";
import "moment/locale/es";
import useAuthCloud from "../hooks/useAuthCloud";
import { loadingPagina, stopLoadingPagina } from "../store/actions/app";
import palette from "../styles/theme";
import initApp from "../utils/eventsInit";
import { components } from "../components/auth/AuthLogin";



moment.locale("es"); // change the global locale to Spanish

Amplify.configure(amplifyconfig);


function MyApp({ Component, pageProps }) {



  const getLayout = Component.getLayout || ((page) => page);


  const notistackRef = createRef();
  const router = useRouter();
  const dispatch = useDispatch();


  const pathnames = router.pathname.split("/").filter((x) => x);

  let theme = createTheme({
    mode: "ligth",
    ...palette,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },

  });

  theme = responsiveFontSizes(theme);

  theme = {
    ...theme,
    components: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            background: theme.palette.grey[300],
            width: '100%',
            borderTop: 4,
            borderColor:
              theme.palette.secondary.main
          }
        }
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: theme.palette.grey[400],
            "&:hover": {
              backgroundColor: theme.palette.info.light,

            },
            color: 'white',
            margin: 2,
            border: 2,
            "&:active": {
              color: theme.palette.secondary.main,

            },
          }, label: {
            fontWeight: 5
          }

        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            boxShadow: 4,
            backgroundColor: theme.palette.grey[200],
            "&:hover": {
              background: `${theme.palette.info.light}`,
              transform: "scale(1.1)",
              boxShadow: `0 0 8px white`
            },
            margin: 1
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            "&:hover": {
              background: `${theme.palette.info.light}`,

            },
          }
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            background: 'white',
          },


        }
      },

      MuiAccordion: {
        styleOverrides: {
          root: {
            '& .MuiAccordion-root:before': {
              display: 'none',
            },
            '& .MuiAccordion-rounded': {
              border: 2,
              borderRadius: '16px',
            },
            '& .MuiPaper-elevation1': {
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
            },
            '& .MuiAccordionSummary-root': {

              color: '#4D4D4D',
              borderBottom: '1px solid #E5E5E5',

            },


          }
        }
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
          },
          label: {
            textTransform: 'capitalize',
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            background: '#dadada',
            '& .MuiInputBase-input': {
              // Estilos para el input dentro del TextField
              color: 'black', // Cambiar el color del texto del input
              textTransform: 'uppercase', // Convertir texto a mayúsculas
              "&:focus": {
                background: `white`,

              },
              // Puedes agregar más estilos según tus necesidades
            },
            '& .MuiInputBase-root.Mui-disabled': {
              // Estilos para el TextField en estado deshabilitado
              background: '#f5f5f5', // Cambiar el color de fondo cuando está deshabilitado
              // Puedes agregar más estilos según tus necesidades
            },
            label: {
              fontWeight: 'bold', // Aplicar negrita al label
            },
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#f5f5f5',
            height: 5,

          },

        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            opacity: 1,
            overflow: 'initial',
            minHeight: theme.spacing(7),
            color: '#d1eaff',

            transition: '0.2s',
            '&:before': {
              content: '" "',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(255,255,255,0.2)',
              transform: 'skewY(-4deg)',
              transformOrigin: '100%',
            },
            '&:after': {
              pointerEvents: 'none',
              transition: '0.2s',
              content: '" "',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              transform: 'translateX(100%)',
              display: 'block',
              width: 8,
              zIndex: 1,

              background:
                // eslint-disable-next-line max-len
                'linear-gradient(to top right, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 45%, transparent, transparent 64%)',
            },
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
              color: theme.palette.info.main,

            },
          },
          selected: {
            backgroundColor: theme.palette.action.active,
            fontWeight: theme.typography.fontWeightMedium,
            textTransform: 'uppercase',
            opacity: 1,
            zIndex: 3,
            '&:before': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              boxShadow: '3px 3px 8px 0 rgba(0,0,0,0.38)',
              fontWeight: 16
            },
            '&:after': {
              width: theme.spacing(2),
            },
          },
          wrapper: {
            zIndex: 2,
            marginTop: theme.spacing(1),
            textTransform: 'initial',
          },

        }
      }

    }
  }

  useEffect(() => {
    initApp();

  }, []);







  const { open, message } = useAuthCloud();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AmplifyProvider>
        <Head>
          <title>Code Lines App V2</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>


        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

        <ConfirmProvider >
          <SnackbarProvider
            dense={true}
            maxSnack={4}
            preventDuplicate
            ref={notistackRef}
            autoHideDuration={4000}
            Components={{
              reportComplete: ReportComplete,
              authModuloReport: AuthModuloReport,
              authPermisoReport: AuthPermisoReport,
              compraCompleteXML: CompraCompleteXML,
              successCreate: SuccessCreate,
              compraComplete: CompraComplete
            }}

            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Fade}

          >
            <Provider store={store}>
              {getLayout(
                <Component {...pageProps} pathnames={pathnames} open_cloud={open} />
              )}
              <Snackbar open={open} autoHideDuration={8000} anchorOrigin={{
                vertical: 'top', horizontal: 'right'
              }}>
                <Alert

                  severity="info"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {message}
                </Alert>
              </Snackbar>

            </Provider>
          </SnackbarProvider>
        </ConfirmProvider>

      </AmplifyProvider>   </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  user: PropTypes.object,
};


export default wrapper.withRedux(withAuthenticator(MyApp, {
  hideSignUp: true,
  formFields: {
    signUp: {
      phone_number: {
        dialCodeList: ["+57"],
        dialCode: "+57",
      },
    },
  },
  components: components,

}));