import { Image, useAuthenticator } from '@aws-amplify/ui-react';
import {
  DeleteTwoTone,
  PlaylistAddTwoTone
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  ButtonBase,
  Card,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Table, TableBody, TableCell,
  TableHead, TableRow,
  TextField,
  useTheme
} from "@mui/material";
import { grey } from '@mui/material/colors';
import { Storage } from "aws-amplify";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import AuthUtils from "../../utils/authUtils";


export default function ProductosCard({ producto, linea, categoria, marca, inventario, inventarios, childrenMenuItem }) {

  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthenticator((context) => [context.user]);


  const userStore = useSelector((state) => state.usuario);
  const { user: userCognito } = useAuthenticator((context) => [context.user]);
  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);

  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imagen, setImagen] = useState();




  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Grid container spacing={1}  >
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Box sx={{ border: 1, borderColor: grey[400], marginBottom: 1 }}>
          <CardHeader
            subheader={"Datos Producto"}
            subheaderTypographyProps={{
              color: 'primary',
              variant: 'button'
            }}
            sx={{
              height: 25,
              background: grey[400],
              borderBottom: 1,
              borderColor: grey[400],
              marginBottom: 1
            }}
          />
          <Grid container spacing={2} padding={1} >

            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} >

              <Grid container spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"

              >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                  <TextField

                    fullWidth
                    focused
                    variant="outlined"
                    value={producto?.Linea?.nombreLinea}
                    label={'LINEA'}
                    size="small"
                    sx={{ fontSize: '8px' }}
                  />

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                  <TextField

                    fullWidth
                    focused
                    variant="outlined"
                    value={producto?.Marca?.nombreMarca}
                    label={'MARCA'}
                    size="small"
                    sx={{ fontSize: '8px' }}
                  />


                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                  <TextField

                    fullWidth
                    focused
                    variant="outlined"
                    value={producto?.Categoria?.nombreCategoria}
                    label={'CATEGORIA'}
                    size="small"
                    sx={{ fontSize: '8px' }}
                  />


                </Grid>

              </Grid>
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                id="filled-multiline-static"
                multiline
                label={"Detalle"}
                rows={3}
                value={producto?.descripcion ? producto.descripcion : ''}
                variant="outlined"
                focused
                fullWidth

              />


            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ border: 1, borderColor: theme.palette.grey[400] }}>
            <CardHeader
                subheader={"Inventarios"}
                subheaderTypographyProps={{
                    color: 'primary',
                    variant: 'button'
                }}
                sx={{
                    height: 25,
                    background: grey[400],
                    borderBottom: 1,
                    borderColor: grey[400],

                }}
            />
            {inventarios && inventarios.length > 0 ?
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Almacén</TableCell>
                 
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventarios.map((inv, i) =>
                            <TableRow key={inv.id}>
                                <TableCell>{inv.Almacen?.tradeName}</TableCell>
                  
                                <TableCell>{inv.precio.toLocaleString()}</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
                : <Alert
                    severity="info"
                    action={
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={() => setOpenInventarios(true)}
                            sx={{
                                border: 2,

                                mr: 1,
                                "&:hover": {
                                    backgroundColor: theme.palette.action.main,
                                    color: "white",
                                },
                            }}

                        >
                            <PlaylistAddTwoTone fontSize='large' color='primary' />
                        </IconButton>
                    }
                >
                    <AlertTitle>Producto sin Inventario</AlertTitle>
                    Este producto no presenta Inventarios Presiona + para Agregar.
                </Alert>}
        </Box>
            </Grid>
          </Grid>

        </Box>
      </Grid>


    </Grid>
  );

}

/**
 *      
 */