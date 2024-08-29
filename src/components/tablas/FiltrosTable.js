import {
  CancelPresentationTwoTone,
  FilterAltTwoTone
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardHeader,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Stack,
  Switch
} from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import RangoFechas from "../otros/RangoFechas";
import CheckAlmacenes from "./Filtros/CheckAlmacenes";

import { grey } from "@mui/material/colors";
import CheckEstado from "./Filtros/CheckEstado";






export function DrawerFiltrosTable({
  open,
  setOpen,
  almacenesAutorizados,
  filter_fechas,
  filter_almacenes,
  filterFecha,

  grouping,

  groupingApp,
  filteringAlmacenes,
  children,

}) {
  const dispatch = useDispatch();


  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };


  const {
    modulo
  } = useSelector((state) => state.usuario);



  return (

    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          boxShadow: 9,

        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
      <CardHeader
        avatar={
          <Avatar variant="rounded" sx={{ width: 35, height: 35 }}>
            <FilterAltTwoTone color="primary"  fontSize="large"/>
          </Avatar>
        }
        action={
          <IconButton size={"small"} onClick={handleDrawerClose} sx={{  mt: -0.5 }}>
            <CancelPresentationTwoTone color="error" />
          </IconButton>
        }
        title="FILTRAR"

        titleTypographyProps={{
          color: 'primary',
          variant: 'h6'
        }}
        subheader={modulo?.nombreModulo}
        subheaderTypographyProps={{
          color: 'primary',
          variant: 'button'
        }}
        sx={{ background: grey[500], height:50 }}
      />

      <Divider variant="middle" >Lista</Divider>
      <Stack direction={'row'} >
        <Box flexGrow={1} />
        <FormControlLabel
          control={
            <Switch
              checked={grouping}
              onChange={() => dispatch(groupingApp())}
              name="checked1"
              sx={{marginLeft:1, borderLeft:1}}
            />
          }
          label="Agrupar Columnas"
          labelPlacement="start"
        />
        <Box flexGrow={1} />

      </Stack>


      <Stack width={1} padding={1} spacing={1} alignContent={'center'} alignItems={'center'}  >
        {filter_fechas && (
          <RangoFechas
            filter_fechas={filter_fechas}
            filterFechaFacturas={filterFecha}
          />
        )}
        {filter_fechas && (
          <Typography variant="caption" color="primary">
            {moment(filter_fechas.start).format("L") +
              " al " +
              moment(filter_fechas.end).add(-1, "day").format("L")}
          </Typography>
        )}


      </Stack>

      <Divider variant="middle" >Registros</Divider>
      <Stack >
        {almacenesAutorizados && filter_almacenes && (
          <CheckAlmacenes
            almacenes={almacenesAutorizados}
            filter_almacenes={filter_almacenes}
            filteringAlmacenes={filteringAlmacenes}
          />
        )}
        {children}



      </Stack>

    </Drawer>

  );
}


export default { DrawerFiltrosTable };
