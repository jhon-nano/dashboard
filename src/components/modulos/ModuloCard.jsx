import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  Icon,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import AuthUtils from "../../utils/authUtils";

export default function ModuloCard(props) {

  const theme = useTheme();

  const userStore = useSelector((state) => state.usuario);

  const { user: userCognito } = useAuthenticator((context) => [context.user]);
  const { enqueueSnackbar } = useSnackbar();

  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);


  return (
    <Card
      elevation={5}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        color: 'white',
        border: 2,
        borderColor: '#5a92a8',
        background: !props.modu.submodulos ? 'linear-gradient(45deg, #AEB6BF  30%,#ABB2B9   95%)' : grey[300],
        borderRadius: '8px',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255 , .3)',
        borderRadius: !props.modu.submodulos && '8px 46px 46px 8px',
        "&:hover": {
          transform: "scale(1.03)",
          color: utilsAuth.isModuloAuthorized(props.modu, false) ? `white` : `${theme.palette.error.light}`
        }
      }}

    >
      <CardActionArea
        disabled={!!props.modu.submodulos}
        onClick={() => utilsAuth.isModuloAuthorized(props.modu, true) && props.modu.pushPath()}
        sx={{


          borderColor: '#5a92a8',
          borderRadius: '8px',
          "&:hover": {
            transform: "scale(1.02)",
            color: utilsAuth.isModuloAuthorized(props.modu, false) ? `white` : `${theme.palette.error.light}`,
            background: grey[500],
          }
        }}
      >
        <CardHeader
          avatar={props.modu.submodulos ?
            <Avatar
              sx={{
                boxShadow: `0 0 8px #F0F0F0`,
                width: 45,
                height: 45,
                alignContent: 'center',
                textAlign: 'center',
                border: 2,
                mt: 0.3,
                mr: 1,
                borderColor: 'darkgray',
                background: 'white'
              }}
              variant="rounded"
            >
              <Icon
                color="secondary"
                sx={{
                  color: utilsAuth.isModuloAuthorized(props.modu, false) ? `${theme.palette.secondary.light}` : `${theme.palette.error.light}`,
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: utilsAuth.isModuloAuthorized(props.modu, false) ? `${theme.palette.primary.light}` : `${theme.palette.error.light}`
                  }
                }}
                style={{
                  fontSize: 35
                }}
              >
                {props.modu.icon}
              </Icon>
            </Avatar> :
            <Avatar
              sx={{
                boxShadow: `0 0 8px #F0F0F0`,
                width: 5,
                height: 65,
                alignContent: 'center',
                textAlign: 'center',
                border: 2,

                borderColor: 'darkgray',
                background: 'white'
              }}
              variant="rounded"
            >

            </Avatar>}
          action={!props.modu.submodulos &&
            <Avatar
              sx={{
                boxShadow: `0 0 8px #F0F0F0`,
                width: 70,
                height: 70,
                alignContent: 'center',
                textAlign: 'center',
                border: 2,
                mt: 0.3,
                mr: 1,
                borderColor: 'darkgray',
                background: 'white'
              }}
              variant="circular"
            >
              <Icon
                color="secondary"
                sx={{
                  color: utilsAuth.isModuloAuthorized(props.modu, false) ? `${theme.palette.secondary.light}` : `${theme.palette.error.light}`,
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: utilsAuth.isModuloAuthorized(props.modu, false) ? `${theme.palette.primary.light}` : `${theme.palette.error.light}`
                  }
                }}
                style={{
                  fontSize: 45
                }}
              >
                {props.modu.icon}
              </Icon>
            </Avatar>
          }
          title={
            <Typography
              color={props.modu.submodulos ? 'secondary' : "primary"}
              sx={{
                fontWeight: 'bold',
                fontSize: props.modu.submodulos ? '0.8rem' : '0.9rem',
                "&:hover": {
                  color: utilsAuth.isModuloAuthorized(props.modu, false) ? `white` : `${theme.palette.error.light}`
                }
              }}
            >
              <b> {props.modu.submodulos ? 'MODULO' : 'LINEA'}</b>
            </Typography>
          }
          subheader={
            <Stack>
              <Typography
                color="primary"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}
              >
                <b> { props.modu.nombreModulo.toUpperCase()}</b>


              </Typography>
              <Typography
                variant="caption"
                fontSize={10}
              >
                <b>{!props.modu.submodulos && 'Presiona Click para Ingresar.'}</b>
              </Typography>
            </Stack>
          }
          sx={{ padding: 1 }}

        />

      </CardActionArea>

      {props.modu.submodulos &&
        <Stack direction="column" spacing={1} sx={{ p: 1 }} alignContent={'start'} alignItems={'start'}>
          {Object.keys(props.modu.submodulos).map((submodKey) => {
            const submod = props.modu.submodulos[submodKey];

            return submod.visible && (

              <Card
                key={submodKey}
                elevation={5}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(45deg, #AEB6BF  30%,#ABB2B9   95%)',
                  width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                  color: 'white',
                  border: 2,
                  borderColor: '#5a92a8',
                  borderRadius: '8px 46px 46px 8px',
                  boxShadow: '0 3px 5px 2px rgba(255, 255, 255 , .3)',
                  "&:hover": {
                    transform: "scale(1.03)",
                    color: utilsAuth.isModuloAuthorized(submod, false) ? `white` : `${theme.palette.error.light}`,
                    background: grey[500],
                  }
                }}
              >
                <CardActionArea
                  onClick={() => utilsAuth.isModuloAuthorized(submod, true) && submod.pushPath()}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          boxShadow: `0 0 8px #F0F0F0`,
                          width: 5,
                          height: 65,
                          alignContent: 'center',
                          textAlign: 'center',
                          border: 2,

                          borderColor: 'darkgray',
                          background: 'white'
                        }}
                        variant="rounded"
                      >

                      </Avatar>
                    }
                    title={
                      <Typography
                        color="primary"
                        variant="caption"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          "&:hover": {
                            color: utilsAuth.isModuloAuthorized(submod, false) ? `white` : `${theme.palette.error.light}`
                          }
                        }}
                      >
                        <b> {'LINEA'}</b>
                      </Typography>
                    }
                    subheader={
                      <Stack>
                        <Typography
                          color="primary"
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '1.0rem'
                          }}
                        >
                          <b> {submod.nombreModulo.toUpperCase()}</b>
                        </Typography>
                        <Typography
                          variant="caption"
                          fontSize={8}
                        >
                          <b>Presiona Click para Ingresar.</b>
                        </Typography>
                      </Stack>


                    }
                    action={
                      <Avatar
                        sx={{
                          boxShadow: `0 0 8px #F0F0F0`,
                          width: 70,
                          height: 70,
                          alignContent: 'center',
                          textAlign: 'center',
                          border: 2,
                          mt: 0.3,
                          mr: 1,
                          borderColor: 'darkgray',
                          background: 'white'
                        }}
                        variant="circular"
                      >
                        <Icon
                          color="secondary"
                          sx={{
                            color: utilsAuth.isModuloAuthorized(submod, false) ? `${theme.palette.secondary.light}` : `${theme.palette.error.light}`,
                            "&:hover": {
                              transform: "scale(1.1)",
                              color: utilsAuth.isModuloAuthorized(submod, false) ? `${theme.palette.primary.light}` : `${theme.palette.error.light}`
                            }
                          }}
                          style={{
                            fontSize: 45
                          }}
                        >
                          {submod.icon}
                        </Icon>
                      </Avatar>
                    }
                    sx={{ padding: 1 }}

                  />

                </CardActionArea>
              </Card>
            );
          })}
        </Stack>}
    </Card>
  );
}
