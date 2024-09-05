import { ArrowForwardIosSharp, ExpandMoreTwoTone } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, styled, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { useDispatch } from "react-redux";

const MuiAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const MuiAccordionSummary = styled((props) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  padding: theme.spacing(1),
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CheckAlmacenes({
  almacenes,
  filter_almacenes,
  filteringAlmacenes,
}) {
  const dispatch = useDispatch();

  const handleChangeAll = (event) => {
    if (almacenes.length == filter_almacenes.length) {
      dispatch(filteringAlmacenes([]));
    } else {
      const alm = almacenes.map((e) => e.id);
      dispatch(filteringAlmacenes(alm));
    }
    //    setChecked([event.target.checked, event.target.checked]);
  };

  const handleToggleAlmacenes = (almacen) => () => {
    const currentIndex = filter_almacenes.indexOf(almacen);
    const newChecked = [...filter_almacenes];
    console.log(newChecked)
    if (currentIndex === -1) {
      newChecked.push(almacen);
      dispatch(filteringAlmacenes(newChecked));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(filteringAlmacenes(newChecked));
    }
  };

  const children = almacenes?.sort((a, b) => a.codigo.localeCompare(b.codigo)).map((e, i) => {
    return (
      <FormControlLabel
        key={e.id}
        label={e.tradeName}
        sx={{ width: 210, alignItems: 'center', border: 1, borderTop: i == 0 ? 1 : 0 }}
        control={
          <Checkbox
            checked={filter_almacenes?.indexOf(e.id) !== -1}
            onChange={handleToggleAlmacenes(e.id)}
          />
        }
      />
    );
  });

  return (
    <MuiAccordion sx={{ padding: 0 }}>
      <MuiAccordionSummary
        expandIcon={<ExpandMoreTwoTone />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        sx={{ padding: 0 }}
      >
        <Typography sx={{ marginLeft: 1 }}>ALMACENES</Typography>
      </MuiAccordionSummary>
      <MuiAccordionDetails  >{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
}
