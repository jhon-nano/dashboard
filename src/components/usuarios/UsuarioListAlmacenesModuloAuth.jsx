import { Icon, List, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, MenuList, Switch, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import UsuariosHelpers from "../../helpers/usuariosHelpers";
import { Estado } from "../../models";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function UsuarioListAlmacenesModuloAuth(props) {


  const confirm = useConfirm();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const helpersUsuario = useMemo(() => new UsuariosHelpers(confirm, enqueueSnackbar, router), [confirm, enqueueSnackbar, router]);

  const { almacenes, modulo, almacenes_usuario, usuario } = props;



  const [checkedAlmacenes, setCheckedAlmacenes] = useState([]);



  useEffect(() => {
    setCheckedAlmacenes([]);
    const newChecked = [];
    almacenes_usuario
      .filter(
        (e) =>
          e.ModuloNew?.path == modulo.path &&
          e.estado == Estado.ACTIVO
      )
      .map((almacen_usuario) =>
        newChecked.push(almacen_usuario.moduloUserAlmacenesAlmacenId)
      );
    setCheckedAlmacenes(newChecked);
    return () => {
      setCheckedAlmacenes([]);
    };
  }, [modulo, almacenes_usuario]);




  return (
    <List
      dense
      sx={{
        minWidth: 320,
      }}
    >
      {almacenes.map((almacen) => (
        <MenuList key={almacen.id}>
          <MenuItem>
            <ListItemIcon>
              <Icon>{"business"}</Icon>
            </ListItemIcon>
            <ListItemText
              primary={almacen.tradeName}
            // secondary={almacen.id}
            />

            <ListItemSecondaryAction>
              <Switch
                key={almacen.id}
                color="secondary"
                edge="end"
                onChange={() => helpersUsuario.handleToggleAlmacenModulo(almacen.id, checkedAlmacenes, modulo, almacenes_usuario, usuario)}
                checked={checkedAlmacenes.indexOf(almacen.id) !== -1}
              />
            </ListItemSecondaryAction>
          </MenuItem>
        </MenuList>
      ))}
    </List>
  );
}