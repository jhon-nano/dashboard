import { ExpandMoreTwoTone } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { useDispatch } from "react-redux";

import { filteringCuotasCreditos, filteringEstadosCreditos } from "../../../store/actions/creditos";

export function CheckCuotas({ data, filter }) {
  const dispatch = useDispatch();

  const handleChangeAll = (event) => {
    if (data.length == filter.length) {
      dispatch(filteringCuotasCreditos([]));
    } else {
      dispatch(filteringCuotasCreditos(data));
    }
    //    setChecked([event.target.checked, event.target.checked]);
  };

  const handleToggle = (almacen) => () => {
    const currentIndex = filter.indexOf(almacen);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(almacen);
      dispatch(filteringCuotasCreditos(newChecked));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(filteringCuotasCreditos(newChecked));
    }
  };

  const children = data?.map((e) => {
    return (
      <FormControlLabel
        key={e}
        label={e}
        control={
          <Checkbox
            checked={filter?.indexOf(e) !== -1}
            onChange={handleToggle(e)}
          />
        }
      />
    );
  });

  return (
    <div>
      {data && filter && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreTwoTone />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <FormControlLabel
              label="Cuotas"
              control={
                <Checkbox
                  checked={data.length == filter.length}
                  indeterminate={data?.length !== filter?.length}
                  onChange={handleChangeAll}
                />
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>{children}</FormGroup>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export function CheckEstadoCredito({ data, filter }) {
  const dispatch = useDispatch();

  const handleChangeAll = (event) => {
    if (data.length == filter.length) {
      dispatch(filteringEstadosCreditos([]));
    } else {
      dispatch(filteringEstadosCreditos(data));
    }
    //    setChecked([event.target.checked, event.target.checked]);
  };

  const handleToggle = (almacen) => () => {
    const currentIndex = filter.indexOf(almacen);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(almacen);
      dispatch(filteringEstadosCreditos(newChecked));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(filteringEstadosCreditos(newChecked));
    }
  };

  const children = data?.map((e) => {
    return (
      <FormControlLabel
        key={e}
        label={e}
        control={
          <Checkbox
            checked={filter?.indexOf(e) !== -1}
            onChange={handleToggle(e)}
          />
        }
      />
    );
  });

  return (
    <div>
      {data && filter && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreTwoTone />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <FormControlLabel
              label="Estado"
              control={
                <Checkbox
                  checked={data.length == filter.length}
                  indeterminate={data?.length !== filter?.length}
                  onChange={handleChangeAll}
                />
              }
            />
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>{children}</FormGroup>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}

export default { CheckCuotas, CheckEstadoCredito };
