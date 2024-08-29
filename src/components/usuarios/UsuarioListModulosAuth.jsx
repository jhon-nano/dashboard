import { Icon, List, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, MenuList, Switch, Typography } from "@mui/material";
import TypesModulos from "../../types/typesModulos";
import UsuariosHelpers from "../../helpers/usuariosHelpers";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function UsuarioListModulosAuth(props) {

  const typesModulos = new TypesModulos(useRouter());

  const confirm = useConfirm();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const helpersUsuario = useMemo(() => new UsuariosHelpers(confirm, enqueueSnackbar, router), [confirm, enqueueSnackbar, router]);


  return (
    <List
      dense
      sx={{
        width: 320,
        maxWidth: "100%",
      }}
    >
      {typesModulos.getModulosAppAll().map((modulo) => (
        <MenuList key={modulo?.path}>
          <MenuItem>
            <ListItemIcon>
              <Icon>{modulo?.icon}</Icon>
            </ListItemIcon>
            <ListItemText>{modulo.nombreModulo}</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                key={modulo.path}
                color="secondary"
                edge="end"
                onChange={() => helpersUsuario.handleToggleGestionarModulo(modulo, props.checkedModulos, props.usuario)}
                checked={props.checkedModulos.indexOf(modulo.path) !== -1}
              />
            </ListItemSecondaryAction>
          </MenuItem>
        </MenuList>
      ))}
    </List>
  );
}