import { BusinessTwoTone, CancelPresentation } from "@mui/icons-material";
import {
  DialogTitle,
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListSubheader,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";


export function SelectDialogAlmacen({ children, almacen, setAlmacen }) {

  const confirm = useConfirm();
  const router = useRouter();
  const {
    almacenesAutorizados
  } = useSelector((state) => state.usuario);

  if (almacen == undefined && almacenesAutorizados !== undefined) {
    if (almacenesAutorizados.length == 1) {
      setAlmacen(almacenesAutorizados[0]);
      return children;
    }

    if (almacenesAutorizados?.length > 1) {
      return (
        <Modal open={true}>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            ALMACENES
            <IconButton
              aria-label="close"
              onClick={() => router.back()}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CancelPresentation color="error" />
            </IconButton>
          </DialogTitle>
          <List
            dense={true}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Seleccione un Almacen
              </ListSubheader>
            }
          >
            {almacenesAutorizados
              .sort((a, b) => a.codigo.localeCompare(b.codigo))
              .map((e) => (
                <ListItemButton
                  key={e.id}
                  onClick={() =>
                    confirm({
                      title: "Confirma que desea Seleccionar el ALMACEN?",
                      description: e.nombreAlmacen,
                      confirmationText: "CONFIRMAR",
                      confirmationButtonProps: {
                        variant: "contained",
                        color: "info",
                      },
                      cancellationText: "CANCELAR",
                      cancellationButtonProps: {
                        variant: "outlined",
                        color: "error",
                      },
                    })
                      .then(() => {
                        setAlmacen(e);
                        return children;
                      })
                      .catch((err) => { })
                  }
                >
                  <ListItemText
                    primary={e.codigo + " - " + e.nombreAlmacen}
                    sx={{ width: 240 }}
                  />
                  <ListItemSecondaryAction>
                    <BusinessTwoTone />
                  </ListItemSecondaryAction>
                </ListItemButton>
              ))}
          </List>
        </Modal>
      );
    }
    return children;
  }
  return children;
}

export default SelectDialogAlmacen;
