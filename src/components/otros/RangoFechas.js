import { ArrowBackIos, ArrowForwardIos, DateRange } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import { DataStore } from "aws-amplify";
import es from "date-fns/locale/es";
import moment from "moment";
import React, { useState } from "react";
import DatePicker, {
  registerLocale
} from "react-datepicker";
import { useDispatch } from "react-redux";

registerLocale("es", es);

export default function RangoFechas({

  size,

  filterFechaFacturas,
}) {
  const breakpoints_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState();

  const [endDate, setEndDate] = useState();

  const onChangeDate = async (dates) => {
    // //console.log(dates);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end !== null) {
      //await DataStore.stop();

      await dispatch(
        filterFechaFacturas(
          moment(start).format(),
          moment(end).endOf('day').format()
        )
      );
      //await DataStore.start();

    }
  };


  return (
    <Stack direction={"column"} alignItems="center" alignContent={'center'}>
      <DatePicker
        selected={startDate}
        onChange={onChangeDate}
        startDate={startDate}
        endDate={endDate}
        showYearDropdown
        showMonthDropdown
        showMonthYearDropdown
        locale="es"
        selectsRange
        withPortal

        customInput={
          <Button variant="outlined" color="secondary" size={size} startIcon={<DateRange color="info" style={{ fontSize: 25 }} />}>
            RANGO FECHAS
          </Button>
        }
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <IconButton aria-label="Previous Month" className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            } onClick={decreaseMonth} style={customHeaderCount === 1 ? { visibility: "hidden" } : null}>
              <ArrowBackIos />
            </IconButton>
            <Typography >
              {monthDate.toLocaleString("es-ES", {
                month: "long",
                year: "numeric",
              }).toUpperCase()}
            </Typography>

            <IconButton aria-label="Next Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--next"
              }
              style={customHeaderCount === 0 && breakpoints_sm ? { visibility: "hidden" } : null}
              onClick={increaseMonth}>
              <ArrowForwardIos />
            </IconButton>

          </div>
        )}
        monthsShown={breakpoints_sm ? 2 : 1}
      />


    </Stack>
  );
}
/**
 *      <Stack spacing={1} margin={1}>

        <DatePicker
          selected={startDate}
          onChange={(date) => dispatch(
            filterFechaFacturas(
              moment(date).format(),
              moment(filter_fechas.end).endOf('day').format()
            )
          )}
          locale="es"
          selectsStart
          startDate={startDate}
          endDate={endDate}
          withPortal
          value={moment(filter_fechas.start).format("L")}
          customInput={<TextField label="Fecha Inicial" size="small" />}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => dispatch(
            filterFechaFacturas(
              moment(filter_fechas.start).format(),
              moment(date).endOf('day').format()
            )
          )}
          selectsEnd
          locale="es"
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          withPortal
          value={moment(filter_fechas.end).format("L")}
          customInput={
            <TextField
              label="Fecha Final"
              value={filter_fechas.end}
              size="small"
            />
          }
        />
      </Stack>
 */