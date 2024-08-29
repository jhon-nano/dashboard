import { BusinessTwoTone, CancelTwoTone, ExpandMoreTwoTone, Security, SecurityTwoTone } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, CardHeader, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, MenuList, Switch, Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import UsuariosHelpers from "../../helpers/usuariosHelpers";
import { Estado } from "../../models";
import TypesModulos from "../../types/typesModulos";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function UsuarioListPermisosModuloAuth(props) {

  const typesModulos = new TypesModulos(useRouter());

  const confirm = useConfirm();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const helpersUsuario = useMemo(() => new UsuariosHelpers(confirm, enqueueSnackbar, router), [confirm, enqueueSnackbar, router]);



  const { modulo, permisos_usuario, usuario } = props;



  const [checked, setChecked] = useState([]);



  useEffect(() => {
    setChecked([]);
    const newChecked = [];
    permisos_usuario
      .filter(
        (e) =>
          e.ModuloNew.path == modulo.path &&
          e.estado == Estado.ACTIVO
      )
      .map((permiso_usuario) =>
        newChecked.push(permiso_usuario.code)
      );
    setChecked(newChecked);
    return () => {
      setChecked([]);
    };
  }, [modulo, permisos_usuario]);




  return (

    <List
      dense

    >

      {Object.keys(typesModulos.getPermisos(modulo)).map((categoria) => (
        <Accordion key={categoria}>
          <AccordionSummary expandIcon={<ExpandMoreTwoTone />}>
            <Typography variant="h6">{categoria}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: 320,
                maxWidth: "100%",
              }}
     
            >
              {Object.keys(typesModulos.getPermisos(modulo)[categoria]).map((permiso) => (
                <ListItem key={permiso} divider>
                  <ListItemIcon>
                    <SecurityTwoTone color={checked.indexOf(typesModulos.getPermisos(modulo)[categoria][permiso].code) !== -1 ? 'success': 'error'} />
                  </ListItemIcon>
                  <ListItemText primary={typesModulos.getPermisos(modulo)[categoria][permiso].label} secondary={typesModulos.getPermisos(modulo)[categoria][permiso].code} />
                  <ListItemSecondaryAction>
                    <Switch
                      key={typesModulos.getPermisos(modulo)[categoria][permiso].code}
                      color="secondary"
                      edge="end"
                      onChange={() => helpersUsuario.handleTogglePermisoModulo(typesModulos.getPermisos(modulo)[categoria][permiso].code, checked, modulo, permisos_usuario, usuario)}
                      checked={checked.indexOf(typesModulos.getPermisos(modulo)[categoria][permiso].code) !== -1}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}






    </List>
  );
}

/**
 * 
      {typesModulos.getPermisos(modulo)?.map((permiso) => (
        <MenuList key={permiso.code}>
          <MenuItem>

            <ListItemText
              primary={permiso.label}
            // secondary={almacen.id}
            />


          </MenuItem>
        </MenuList>
      ))}
 */