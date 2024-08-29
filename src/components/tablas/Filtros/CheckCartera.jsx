import { ExpandMoreTwoTone } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { useDispatch } from "react-redux";
import { filteringAlmacenesCartera, filteringCuotasCartera, filteringEdadesCartera } from "../../../store/actions/carteras";

export function CheckEdades({ data, filter }) {
 // //console.log('CheckEdades')
  const dispatch = useDispatch();


  const handleChangeAll = (event) => {
    if (data.length == filter.length) {
      dispatch(filteringEdadesCartera([]));
    } else {
      dispatch(filteringEdadesCartera(data));
    }
    //    setChecked([event.target.checked, event.target.checked]);
  };

  const handleToggle = (almacen) => () => {
    const currentIndex = filter.indexOf(almacen);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(almacen);
      dispatch(filteringEdadesCartera(newChecked));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(filteringEdadesCartera(newChecked));
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
              label="Edades"
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

export function CheckCuotas({ data, filter }) {
  const dispatch = useDispatch();


  const handleChangeAll = (event) => {
    if (data.length == filter.length) {
      dispatch(filteringCuotasCartera([]));
    } else {
      dispatch(filteringCuotasCartera(data));
    }
    //    setChecked([event.target.checked, event.target.checked]);
  };

  const handleToggle = (almacen) => () => {
    const currentIndex = filter.indexOf(almacen);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(almacen);
      dispatch(filteringCuotasCartera(newChecked));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(filteringCuotasCartera(newChecked));
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




export default { CheckEdades,CheckCuotas };
