// pages/index.js
import { AppsTwoTone } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Tooltip
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useMemo } from "react";
import ModuloCard from "../components/modulos/ModuloCard";
import LayoutApp from "../layout/LayoutApp";
import TypesModulos from "../types/typesModulos";
import AuthUtils from "../utils/authUtils";



function IndexAppBar({ appStore, userCognito, userStore }) {

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const typesModulos = new TypesModulos(useRouter());

  const { status } = appStore;


  const utilsAuth = useMemo(() => new AuthUtils(enqueueSnackbar, userStore, userCognito), [enqueueSnackbar, userStore, userCognito]);


  useEffect(() => {

    enqueueSnackbar('Seleccione un MODULO!', {
      variant: 'info',
    });

  }, [])





  return (

    <Stack direction={'row'} alignContent={'center'} alignItems={'center'} mr={1}>

      <Box sx={{ flexGrow: 1 }} />


      <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }}>
        <Tooltip title='Ir a la Configuracion'>
          <IconButton
            sx={{
              border: 4, borderColor: status
                ? theme.palette.success.main
                : theme.palette.info.main,
            }}

            onClick={() => utilsAuth.isModuloAuthorized(typesModulos.configuracion, true) && typesModulos.configuracion.pushPath()}
            color="inherit"
          >
            <Icon color="primary">
              {typesModulos.configuracion.obtenerIcon()}
            </Icon>
          </IconButton>
        </Tooltip>
      </Box>

    </Stack>


  )
}

function Index({ userCognito, userStore }) {


  const router = useRouter();
  const { usuario } = userStore;



  const typesModulos = useMemo(() => new TypesModulos(router), [router]);


  return (<Card elevation={10} >
    <CardHeader

    
      sx={{
        padding: 0.5,
        background: grey[500],
        height:25
      }}
    />
    <CardContent sx={{
      backgroundSize: "cover",
      backgroundImage: `url(/img/fondo.jpg)`,


      boxShadow: 9,
      padding: 2, minHeight: '75vh'
    }}>




      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} spacing={3}>
        {userCognito && usuario
          ? typesModulos.getModulosApp().filter((m) => m.visible == true)
          .sort((a, b) => a.nombreModulo.localeCompare(b.nombreModulo))
            .map((modu, index) => (
              <ModuloCard key={index} modu={modu} />
            ))
          : Array.from(new Array(7)).map((dato, i, array) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Skeleton variant="rect" width="100%" height={170} />
            </Grid>
          ))}

      </Masonry>



    </CardContent>
  </Card>
  );
}


Index.getLayout = function getLayout(page) {

  return <LayoutApp {...page.props} header={<IndexAppBar />} >{page}</LayoutApp>;
};


export default Index;