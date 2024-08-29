import { AppsTwoTone, BusinessTwoTone, FormatListNumberedTwoTone, PointOfSaleTwoTone } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CardHeader,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import AlmacenesTableCajas from "../../../components/almacenes/AlmacenesTableCajas";
import ConsecutivosList from "../../../components/consecutivos/ConsecutivosList";
import ConsecutivosTable from "../../../components/consecutivos/ConsecutivosTable";
import ModuloConfiguracion from "../../../components/modulos/ModuloConfiguracion";
import { useModelIDAlmacenes } from "../../../hooks/models/useModelAlmacen";
import { useModelConsecutivosByAlmacenId } from "../../../hooks/models/useModelConsecutivo";
import LayoutApp from "../../../layout/LayoutApp";
import AlmacenUpdateForm from "../../../ui-components/AlmacenUpdateForm";


moment.locale("es");


function ComponentAppBar({ value, setValue }) {

  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box display={'flex'} alignContent={'center'} alignItems={'center'}>

      <Box flexGrow={1}>
        <Tabs
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue); {/* Pasa la función para actualizar el valor desde la prop de la página */ }
          }}
          centered
          textColor="inherit"
          indicatorColor='secondary'
          aria-label="icon position tabs example"
          sx={{ color: 'white' }}
        >

          <Tab
            icon={<BusinessTwoTone fontSize='large' />}
            iconPosition="start"
            label={"ALMACEN"}
          />
          <Tab
            icon={<FormatListNumberedTwoTone fontSize='large' />}
            iconPosition="start"
            label={breakpoints_sm ? "CONSECUTIVOS" : ''}

          />
                    <Tab
            icon={<PointOfSaleTwoTone fontSize='large' />}
            iconPosition="start"
            label={breakpoints_sm ? "CAJAS" : ''}

          />
                    <Tab
            icon={<AppsTwoTone fontSize='large' />}
            iconPosition="start"
            label={breakpoints_sm ? "MODULOS" : ''}

          />
        </Tabs>
      </Box>

    </Box>




  )
}

export default function AlmacenID({ value }) {
  const router = useRouter();
  const theme = useTheme();



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const { loading, almacen, error } = useModelIDAlmacenes(router.query.id);


  const { data } = useModelConsecutivosByAlmacenId(almacen?.id)


  const activeStepComponent = useCallback(() => {
    switch (value) {

      case 0:
        return (
          <Container >
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <BusinessTwoTone sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 40 }} />
                  <Stack padding={1}>

                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: "normal",
                        fontStyle: "italic",
                      }}
                      noWrap
                    >
                      <b>
                        ALMACEN
                      </b>
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        lineHeight: "normal",
                        fontStyle: "italic",
                        fontWeight: "bold",
                      }}
                    >
                      {almacen?.nombreAlmacen}
                    </Typography>
                  </Stack>

                  <Box flexGrow={1} />


                </Toolbar>
              </Container>
            </AppBar>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="start"
              spacing={2}

            >

              <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                <Box sx={{ border: 1, borderColor: grey[400] }}>

                  <CardHeader
                    subheader="Formulario de Actualiación"
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
                  <AlmacenUpdateForm {...almacen} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                <Box sx={{ border: 1, borderColor: grey[400] }}>

                  <CardHeader
                    subheader="Lista de Consecutivos"
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
                  <ConsecutivosList consecutivos={data} />
                </Box>
              </Grid>
            </Grid>

          </Container>
        );
      case 1:
        return (
          <ConsecutivosTable almacen={almacen} data={data} />
        );
        case 2:
          return (
            <AlmacenesTableCajas almacen={almacen} />
          );
        case 3:
          return (
            <ModuloConfiguracion/>
          );
  
      default:
        break;
    }
  }, [
    loading, almacen, error, value, data
  ]);



  return (
    <>

      {activeStepComponent()}

    </>);
}

AlmacenID.getLayout = function getLayout(page) {
  return <LayoutApp {...page.props} header={<ComponentAppBar />} >{page}</LayoutApp>;
};