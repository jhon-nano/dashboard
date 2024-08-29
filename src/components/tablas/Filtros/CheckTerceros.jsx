import { ExpandMoreTwoTone } from "@mui/icons-material";
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


export default function CheckTerceros({ label, data, terceros, filter, filtering }) {
  const dispatch = useDispatch();

  const handleChangeAll = (event) => {
    if (data.length == filter.length) {
      dispatch(filtering([]));
    } else {
      const alm = data.map((e) => e);
      dispatch(filtering(alm));
    }
    //    setChecked([event.target.checked, event.target.checked]);
  };

  const handleToggleAlmacenes = (almacen) => () => {
    const currentIndex = filter.indexOf(almacen);
    const newChecked = [...filter];

    if (currentIndex === -1) {
      newChecked.push(almacen);
      dispatch(filtering(newChecked));
    } else {
      newChecked.splice(currentIndex, 1);
      dispatch(filtering(newChecked));
    }
  };

  const children = data?.sort((a, b) => terceros[a].localeCompare(terceros[b]))
    .map((e, i) => {
      return (
        <FormControlLabel
          key={e}
          label={terceros[e]}
          slotProps={{
            typography: {
              fontSize: 12
            }
          }}
          control={
            <Checkbox
              checked={filter?.indexOf(e) !== -1}
              onChange={handleToggleAlmacenes(e)}
            />
          }
          sx={{ width: 210, alignItems: 'center', border: 1, borderTop: i == 0 ? 1 : 0 }}
        />
      );
    });
  /*
    React.useEffect(() => {
      if (data && data.length > 0) {
        const alm = data.map((e) => e.id);
        dispatch(filtering(alm));
      }
      return () => {
        dispatch(filtering([]));
      };
    }, [data]);
  */
  return (
    <MuiAccordion         sx={{ padding: 0 }}>
      <MuiAccordionSummary
        expandIcon={<ExpandMoreTwoTone />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        sx={{ padding: 0 }}
      >
        <Typography sx={{ marginLeft: 1 }}>TERCEROS</Typography>
      </MuiAccordionSummary>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
}
