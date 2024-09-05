import { useAuthenticator } from '@aws-amplify/ui-react';
import { AddAPhotoTwoTone, DeleteTwoTone, EditTwoTone, MoreVertTwoTone, SpellcheckTwoTone, TvTwoTone, WallpaperTwoTone } from '@mui/icons-material';
import { Avatar, Box, CardHeader, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs, Tooltip, useTheme } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Estado } from '../../../models';
import AuthUtils from '../../../utils/authUtils';
import TypesProductos from '../../../types/typesProductos';
import { Header } from '@mui-treasury/layout';
import ProductosHelpers from '../../../helpers/productosHelpers';
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from 'next/router';




const useStyles = makeStyles((theme) => ({

  input: {
    display: "none",
  },

}));


export default function ProductoViewEmcabezado({ producto, value, setValue, onChangeUpload, setOpenInventarios }) {

  const confirm = useConfirm();
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

  const { user: userCognito } = useAuthenticator((context) => [context.user]);

  const productoStore = useSelector((state) => state.productos);
  const userStore = useSelector((state) => state.usuario);

  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);
  const helpersProductos = useMemo(() => new ProductosHelpers(productoStore, dispatch, confirm, enqueueSnackbar, router), [productoStore, dispatch, confirm, enqueueSnackbar, router]);



  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };







  return (
    <Header

      sx={{
        display: 'flex',
        background: theme.palette.secondary.main,
        borderRadius: 2,
        mb:1
      }}>
      <Box display={'flex'}>

        <CardHeader
          avatar={
            <Avatar variant="rounded" sx={{
              background: producto?.estado == Estado.ACTIVO ? theme.palette.success.light : theme.palette.error.light,

            }}>
              <TvTwoTone fontSize="large" color="primary" />
            </Avatar>
          }

          title={producto?.nombreProducto}
          subheader={"CODIGO: " + producto?.codigo}
          titleTypographyProps={{
            variant: "h6",
            fontWeight: 'bold',
            color: 'white'
          }}
          subheaderTypographyProps={{
            variant: "body1",
            color: 'white'
          }}
          sx={{
            pb: 0,
            pt: 0
          }}
        />

        <Box flexGrow={1} />
   
  

        <Tooltip title='Mas Opciones'>
          <IconButton

            sx={{
              border: 2,
              background: "white",
              mr: 1,
              mt: 1,
              height: 50,
              width: 50
            }}
            onClick={handleClick}
            color="secondary"
          >
            <MoreVertTwoTone sx={{ fontSize: 24 }} color="inherit" />
          </IconButton>
        </Tooltip>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              border: "3px dashed grey",
              mt: 1,
              padding: 0.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >

          <Divider >Producto</Divider>
          <MenuItem
            onClick={() =>
              utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().UPDATE_PRODUCTO, true)
              &&
              helpersProductos.handleUpdateProducto(producto) && setAnchorEl(null)
            }
          >
            <ListItemIcon>
              <EditTwoTone fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText>Editar Producto</ListItemText>
          </MenuItem>


          <MenuItem
            onClick={() => utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().DELETE_PRODUCTO, true) &&
              helpersProductos.handleInactivarProducto(producto?.id) && setAnchorEl(null)}
          >
            <ListItemIcon>
              {producto?.estado == Estado.ACTIVO ? (
                <DeleteTwoTone fontSize="small" color="error" />
              ) : (
                <SpellcheckTwoTone fontSize="small" color="success" />
              )}
            </ListItemIcon>
            <ListItemText> {producto?.estado == Estado.ACTIVO ? (
              'Inactivar Producto'
            ) : (
              'Activar Producto'
            )}</ListItemText>
          </MenuItem>
          <Divider >Inventarios</Divider>
          <MenuItem
            onClick={() =>
              utilsAuth.isPermisoAuthorized(TypesProductos.getAllPermisos().AGREGAR_PRODUCTO_INVENTARIOS, true)
              &&
              setOpenInventarios(true) && setAnchorEl(null)
            }
          >
            <ListItemIcon>
              <EditTwoTone fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText>Agregar Almacen</ListItemText>
          </MenuItem>
        </Menu>


      </Box>


    </Header>
  )
}
