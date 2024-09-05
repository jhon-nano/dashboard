import { Image } from "@aws-amplify/ui-react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import moment from "moment";

export default function EncabezadoFormatos({
  titulo,
  almacen,
  consecutivo,
  fecha,
}) {
  const theme = useTheme();

  return (
    <Grid
      container
      alignContent="center"
      alignItems="flex-start"

    >
      <Grid item xs={12} sm={8} md={8} lg={8} xl={7}>
        <Box
          w={1}
          m={1}
          p={1}
          textAlign="center"
          alignContent="center"
          alignItems="center"
          borderTop={2}
          borderBottom={2}
          borderColor="primary.main"
        >
          <Grid container alignItems="center">
            <Grid item xs={4} sm={6} md={6} lg={6} xl={6}>
              <Image
                alt="logo"
                src="/img/logo_60.webp"
                height={75}
                margin={theme.tokens?.space.medium}
              />
            </Grid>
            <Grid item xs={8} sm={6} md={6} lg={6} xl={6}>
              <Box alignContent="center" alignItems="center" textAlign="center">
                <Typography
                  variant="caption"
                  color="primary"
                  display="block"
                  noWrap
                >
                  ALMACEN MOTOPARQUE S.A.S
                </Typography>
                <Box fontSize="h6.fontSize">
                  <b> {`${titulo} # ${consecutivo}`}</b>
                </Box>
                <Box>{moment(fecha).format("LL")}</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4} md={4} lg={4} xl={5}>
        <Box
          w={1}
          m={1}
          textAlign="right"
          borderTop={2}
          borderColor="primary.main"
        >
          <Typography variant="subtitle2">
            <Typography variant="button" gutterBottom noWrap>
              {almacen ? (
                <>
                  {almacen?.tradeName}
                  <br />
                </>
              ) : null}
            </Typography>

            {almacen?.direccion ? (
              <>
                {almacen?.direccion}
                <br />
              </>
            ) : null}
            {almacen?.telefono ? (
              <>
                {almacen?.telefono}
                <br />
              </>
            ) : null}
            {almacen?.ciudad ? (
              <>
                {almacen?.ciudad}
                <br />
              </>
            ) : null}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
