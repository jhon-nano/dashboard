import { BusinessTwoTone, CancelTwoTone } from "@mui/icons-material";
import {
  Avatar,
  CardHeader,
  DialogContent,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  Skeleton,
  Stack,
  useTheme
} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { DataStore } from "aws-amplify";
import { useSnackbar } from "notistack";
import { Consecutivo } from "../../models";
import Modal from "../otros/Modal";
import { useFormContext, useWatch } from "react-hook-form";

export function AlmacenesSelectDialog({ children, codigo }) {
  const theme = useTheme();
  const confirm = useConfirm();
  const router = useRouter();
  const { usuario, modulo, almacenesAutorizados } = useSelector((state) => state.usuario);
  const { formState: { errors }, control, setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const almacen = useWatch({ control, name: "Almacen" });



  useEffect(() => {
    if (almacen !== undefined && almacen !== null && modulo && codigo) {
      const sub = DataStore.observeQuery(
        Consecutivo,
        (p) =>
          p.and((p) => [
            p.consecutivoAlmacenId.eq(almacen.id),
            p.codigo.eq(codigo)
          ]),
        (c) => c
      ).subscribe(({ items }) => {
        if (items.length > 0) {
          setValue('Consecutivo', items[0]);
          setValue('Usuario', usuario);
        } else if (almacen !== undefined) {
          enqueueSnackbar(`Almacen de ${almacen.tradeName}, sin Consecutivo. ${codigo}`, {
            variant: "warning",
          });
          setValue('Almacen', null);
        }
      });

      return () => {
        sub.unsubscribe();
      };
    }
  }, [almacen, codigo, modulo, setValue, enqueueSnackbar, usuario]);

  useEffect(() => {
    if (modulo && almacen == undefined && almacenesAutorizados !== undefined) {
      if (almacenesAutorizados.length == 0) {
        enqueueSnackbar('No hay ningun Almacen Autorizado!', { variant: 'info' });
      } else if (almacenesAutorizados.length == 1) {
        setValue("Almacen", almacenesAutorizados[0]);
      } else if (almacenesAutorizados.length > 1) {
        enqueueSnackbar('Seleccione un Almacen!', { variant: 'info' });
      }
    }
  }, [modulo, almacen, almacenesAutorizados, enqueueSnackbar, setValue]);

  if (modulo && almacen == undefined && almacenesAutorizados !== undefined) {
    if (almacenesAutorizados.length == 0 || almacenesAutorizados.length == 1) {
      return children;
    }

    return (
      <Modal open={true}>
        <CardHeader
          avatar={
            <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
              <BusinessTwoTone color='secondary' fontSize="large" />
            </Avatar>
          }
          title="Seleccione"
          subheader={`un Almacen`}
          titleTypographyProps={{ color: 'white', variant: 'button', fontSize: 18 }}
          subheaderTypographyProps={{ color: 'white', fontSize: 16, variant: 'caption' }}
          sx={{ background: theme.palette.secondary.main }}
          action={
            <IconButton
              aria-label="close"
              onClick={() => router.back()}
              sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
              <CancelTwoTone color="error" />
            </IconButton>
          }
        />

        <DialogContent sx={{ boxShadow: '0 3px 5px 2px rgba(255, 255, 255 , .3)', border: 3 }}>
          {almacenesAutorizados.length > 0 ? (
            <List
              sx={{ bgcolor: "background.paper", border: 2, borderRadius: 2, borderColor: 'gray' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {almacenesAutorizados
                .sort((a, b) => a.tradeName.localeCompare(b.tradeName))
                .map((e) => (
                  <ListItemButton
                    key={e.id}
                    divider
                    onClick={() =>
                      confirm({
                        title: "Confirma que desea Seleccionar el ALMACEN?",
                        description: e.tradeName,
                        confirmationText: "CONFIRMAR",
                        confirmationButtonProps: { variant: "contained", color: "info" },
                        cancellationText: "CANCELAR",
                        cancellationButtonProps: { variant: "outlined", color: "error" },
                      })
                        .then(() => {
                          setValue("Almacen", e);
                        })
                        .catch(() => { })
                    }
                  >
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ width: 42, height: 42 }}>
                        <BusinessTwoTone color={e.estado === 'INACTIVO' ? 'error' : 'success'} fontSize="large" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                 
                      secondary={e.tradeName}
                      primaryTypographyProps={{ variant: 'button', marginLeft: 1, fontSize: 16 }}
                      secondaryTypographyProps={{ variant: 'caption', marginLeft: 1, fontSize: 16 }}
                      sx={{ width: 240 }}
                    />
                  </ListItemButton>
                ))}
            </List>
          ) : (
            <Stack spacing={1}>
              {Array.from(new Array(5)).map((_, i) => (
                <Skeleton key={i} variant="rect" width={280} height={30} />
              ))}
            </Stack>
          )}
        </DialogContent>
      </Modal>
    );
  }

  return children;
}

export default AlmacenesSelectDialog;
