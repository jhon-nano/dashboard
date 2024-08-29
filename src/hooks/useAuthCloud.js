// useApi.js
import { Auth, Hub, I18n } from "aws-amplify";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loadingPagina,
  networkStatus,
  outboxStatus,
  stopLoadingPagina
} from "../store/actions/app";



I18n.setLanguage("es");

I18n.putVocabulariesForLanguage("es", {
  "User is disabled.": "El usuario está deshabilitado.",
  "Sign Up Failed": "Registro fallido",
  "Sign In": "Registrarse", // Tab header
  "Signing in": "Iniciando sesión", // Tab header
  "Sign in": "Iniciar sesión", // Button label
  "Sign in to your account": "¡Bienvenido de nuevo!",
  Username: "Usuario", // Username label
  Password: "Contraseña", // Password label
  "Forgot your password?": "Olvidaste tu contraseña",
  "Create Account": "Registrar", // Tab header
  "Create a new account": "Nuevo Usuario", // Header text
  "Confirm Password": "Comfirmar la Contraseña", // Confirm Password label
  "Password must have at least 8 characters":
    "La contraseña debe tener al menos 6 caracteres",
  "Password must have numbers": "La contraseña debe tener números", // Tab header
  "Password must have lower case letters":
    "La contraseña debe tener letras minúsculas", // Tab header
  "Password must have upper case letters":
    "La contraseña debe tener letras mayúsculas", // Tab header
  Email: "Correo Electronico",
  "Phone Number": "Ingrese si Numero Telefono",
  "Reset your password": "Olvidaste tu contraseña",
  "Reset Password": "Restablecer la contraseña",
  "Enter your username": "Usuario o Correo",
  "Send code": "Restablecer mi contraseña",
  "Back to Sign In": "Atrás para iniciar sesión",
  Loading: "El código QR se mostraría aquí",
  Code: "2FA Code",
  "Enter your code": "Ingrese su código",
  Confirm: "Confirmar",
  Confirming: "Confirmando",
  Phone: "Telefono",
  "Code *": "Codigo *",
  "2FA Code": "Codigo Confirmacions",
  "Confirm SMS Code": "Confirmar código SMS",
  "Back to Sign In": "Atrás para iniciar sesión",
  "We Texted You": "Te enviamos un mensaje de texto",
  "Resend Code": "Reenviar codigo",
  "Your code is on the way. To log in, enter the code we texted to +********{####}. It may take a minute to arrive.":
    "Su código está en camino. Para iniciar sesión, ingrese el código que le enviamos por mensaje de texto al +********{####}. Puede demorar un minuto en llegar",
  "We Sent A Code": "Nosotros enviamos un codigo",
  "Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.":
    "Su código está en camino. Para iniciar sesión, ingrese el código que le enviamos. Puede tardar un minuto en llegar.",
  "Incorrect username or password": "Nombre de usuario o contraseña incorrecta",
  "Network error": "Error de red.",
  "This user pool is not configured with a role or Lambda trigger to send SMS messages": "Este grupo de usuarios no está configurado con una función o disparador Lambda para enviar mensajes SMS",
  "Invalid code or auth state for the user.":
    "Código no válido o estado de autenticación para la usuario.",
  "Your code is on the way. To log in, enter the code we texted to +********{####}. It may take a minute to arrive.":
    "Su código está en camino. Para iniciar sesión, ingrese el código que le enviamos por mensaje de texto a +********{####}. Puede tardar un minuto en llegar.",
});


export default function useAuthCloud() {

  const router = useRouter();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')


  useEffect(() => {
    // Escuchar eventos de DataStore
    const listener = (data) => {
      const { payload } = data;

      switch (payload.event) {
        case "networkStatus":
          dispatch(networkStatus(payload.data.active));
          break;
        case "outboxStatus":
          dispatch(outboxStatus(payload.data.isEmpty));
          break;
        case "syncQueriesStarted":
          setOpen(true);
          setMessage(`Sincronizando Información...`);
          break;
        case "modelSynced":

          setMessage(`Model: ${payload.data.model.name}, New: ${payload.data.counts.new}, Updated: ${payload.data.counts.updated}, Deleted: ${payload.data.counts.deleted}`);

          break;
        case "ready":
          setMessage(`Ready`);
          setTimeout(() => {
            setOpen(false)
       
          }, 5000);
          break;
        case "syncQueriesReady":
          setMessage(`syncQueriesReady`);
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
        case "storageSubscribed":
          setMessage(`storageSubscribed`);
          break;
        case "subscriptionsEstablished":
          setMessage(`subscriptionsEstablished`);
          break;
        case "outboxMutationEnqueued":
          setOpen(true);
          let { model, counts } = payload.data;
          setMessage(`Model: ${payload.data.model.name}, outboxMutationEnqueued`);


          break;
        case "outboxMutationProcessed":
          setMessage(`Model: ${payload.data.model.name}, outboxMutationProcessed`);
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
          case "nonApplicableDataReceived":
            console.error(payload)
            setMessage(`Model: ${payload.data.modelName}, nonApplicableDataReceived`);
            setTimeout(() => {
              setOpen(false)
  
            }, 5000);
            break;
  

        default:
          console.log('Evento no manejado:', payload.event, payload);
          break;
      }
    };

    Hub.listen("datastore", listener);

    // Devolver las variables de estado necesarias
    return () => {
      Hub.remove("datastore");
    };

  }, []); // Asegúrate de incluir todas las dependencias necesarias aquí



  useEffect(() => {
    const listener = (data) => {
      const { payload } = data;
      console.error(payload);
      switch (payload.event) {
        case "signOut":
          setOpen(true)


          router.push("/");

          setMessage('Hasta Luego de Code Lines!')
          setTimeout(() => {
            setOpen(false)

          }, 5000);

          break;
        case "signIn":
          setOpen(true)
          setMessage('Bienvenido a Code Line - Solutions!')
          setTimeout(() => {
            setOpen(false)

          }, 5000);

          break;
        case "signIn_failure":
          console.log('user sign in failed');
          setOpen(true)
          setMessage('El inicio de sesión del usuario falló')
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
        case "tokenRefresh":
          console.log('token refresh succeeded');
          setOpen(true)
          setMessage('La actualización del token se realizó correctamente')
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
        case "tokenRefresh_failure":
          console.log('token refresh failed');
          setOpen(true)
          setMessage('El inicio de sesión del usuario falló')
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
        case "autoSignIn":
          console.info("Auto Sign In after Sign Up succeeded");
          setOpen(true)
          setMessage('Inicio de sesión automático después de registrarse correctamente')
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
        case "autoSignIn_failure":
          console.log('auto sign in failed');
          setOpen(true)
          setMessage('El inicio de sesión automático después del error de registro')
          setTimeout(() => {
            setOpen(false)

          }, 5000);
          break;
        case 'configured':
          console.log('the Auth module is configured');
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signUp_failure':
          console.log('user sign up failed');
          break;
        case 'confirmSignUp':
          console.log('user confirmation successful');
          break;
        case 'completeNewPassword_failure':
          console.log('user did not complete new password flow');
          break;
        case 'forgotPassword':
          console.log('password recovery initiated');
          break;
        case 'forgotPassword_failure':
          console.log('password recovery failed');
          break;
        case 'forgotPasswordSubmit':
          console.log('password confirmation successful');
          break;
        case 'forgotPasswordSubmit_failure':
          console.log('password confirmation failed');
          break;
        case 'verify':
          console.log('TOTP token verification successful');
          break;
        case 'cognitoHostedUI':
          console.log('Cognito Hosted UI sign in successful');
          break;
        case 'cognitoHostedUI_failure':
          console.log('Cognito Hosted UI sign in failed');
          break;
        case 'customOAuthState':
          console.log('custom state returned from CognitoHosted UI');
          break;
        case 'customState_failure':
          console.log('custom state failure');
          break;
        case 'parsingCallbackUrl':
          console.log('Cognito Hosted UI OAuth url parsing initiated');
          break;
        case 'userDeleted':
          console.log('user deletion successful');
          break;
        case 'updateUserAttributes':
          console.log('user attributes update successful');
          break;
        case 'updateUserAttributes_failure':
          console.log('user attributes update failed');
          break;
        default:
          console.log('unknown event type');
          setOpen(true)
          setMessage(payload.message)
          setTimeout(() => {
            setOpen(false)
          }, 5000);
          break;
      }
    };
    Hub.listen("auth", listener);

    return () => {
      Hub.remove("auth", listener);
    };
  }, []);


  useEffect(() => {
    const handleRouteChangeStart = () => {
      dispatch(loadingPagina("CARGANDO PAGINA"));

    };

    const handleRouteChangeComplete = () => {
      dispatch(loadingPagina("PAGINA COMPLETADA"));
      setTimeout(() => {

        dispatch(stopLoadingPagina());

      }, 1000);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);

    };
  }, [router]);



  async function getTokens() {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();
    const accessToken = session.getAccessToken().getJwtToken();
    const refreshToken = session.getRefreshToken().getToken();
    const idTokenExpiry = session.getIdToken().getExpiration();
    const accessTokenExpiry = session.getAccessToken().getExpiration();

    //console.log('ID Token:', idToken);
    //console.log('Access Token:', accessToken);
    //console.log('Refresh Token:', refreshToken);
    //console.log('ID Token Expiry:', idTokenExpiry);
    //console.log('accessTokenExpiry:', accessTokenExpiry);
    //console.log('ID Token Expiry:', new Date(idTokenExpiry * 1000).toLocaleString());
    //console.log('Access Token Expiry:', new Date(accessTokenExpiry * 1000).toLocaleString());

    return { idToken, accessToken, refreshToken, idTokenExpiry, accessTokenExpiry };
  }




  return { open, message }

}
