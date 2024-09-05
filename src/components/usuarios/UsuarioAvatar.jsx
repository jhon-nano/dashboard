import {
  IconButton,
  Skeleton,
  Stack,
  Tooltip
} from "@mui/material";
import * as React from "react";

import { useTheme } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  CloudSyncTwoTone,
  ExitToAppTwoTone
} from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import AuthHelpers from "../../helpers/authHelpers";
import { Auth } from "aws-amplify";

export default function UsuarioAvatar() {

  const theme = useTheme();


  const { status } = useSelector((state) => state.app);
  const { usuario } = useSelector((state) => state.usuario);


  const channel = new BroadcastChannel('app_channel');

  const helpersAuth = new AuthHelpers(useConfirm(), useSnackbar(),channel);



  const { user } = useAuthenticator((context) => [context.user]);



  return user ? (
    <Stack direction={"row"} >



      <Stack alignContent={"center"} alignItems="center">

        <Tooltip title='Salir de la Aplicación'>

          <IconButton color="error" onClick={(e) => helpersAuth.handleExitToApp(e)}
            sx={{
              width: 42,
              height: 42,
              border: 3,
              borderColor: !status ? theme.palette.info.dark : theme.palette.error.dark,
              background: !status ? theme.palette.info.light : theme.palette.error.light,

            }}>
            {!status ? (
              <CloudSyncTwoTone color="info" sx={{ fontSize: 30, m: 1 }} />
            ) : (
              <ExitToAppTwoTone sx={{ color: 'white' }} fontSize="medium" />
            )}
          </IconButton>

        </Tooltip>

      </Stack>



    </Stack>
  ) : (
    <Stack
      sx={{ marginTop: 1 }}
      alignContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Skeleton variant="circular" width={35} height={35} />
      <Skeleton variant="text" width={100} height={15} />
    </Stack>
  );
}

UsuarioAvatar.propTypes = {};

UsuarioAvatar.defaultProps = {};
