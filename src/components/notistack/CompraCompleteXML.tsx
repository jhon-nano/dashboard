import { useState, forwardRef, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Producto } from "../../models";

const useStyles = makeStyles(() => ({
  root: {
    "@media (min-width:600px)": {
      minWidth: "344px !important"
    }
  },
  card: {
    width: "100%"
  },
  typography: {
    color: "#000"
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
    justifyContent: "space-between"
  },
  icons: {
    marginLeft: "auto"
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    color: "#000",
    transition: "all .2s"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  paper: {
    backgroundColor: "#fff",
    padding: 16
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 4
  },
  button: {
    padding: 0,
    textTransform: "none"
  }
}));

interface CompraCompleteXMLProps extends CustomContentProps {
  allowDownload?: boolean;
  compra_xml:any;
  rows: [];
}

const CompraCompleteXML = forwardRef<HTMLDivElement, CompraCompleteXMLProps>(
  ({ id, ...props }, ref) => {
    
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const { rows } = props





    const handleDismiss = useCallback(() => {
     // if(rows.length == 0 || props.compra_xml == null){
        closeSnackbar(id);
     // }
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card} style={{ backgroundColor: "#fddc6c" }}>
          <CardActions classes={{ root: classes.actionRoot }}>
            <Typography variant="body2" className={classes.typography}>
              {props.message}
            </Typography>
            <div className={classes.icons}>
              <IconButton
                aria-label="Show more"
                size="small"
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <IconButton
                size="small"
                className={classes.expand}
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper className={classes.paper}>
              <Typography
                gutterBottom
                variant="caption"
                style={{ color: "#000", display: "block" }}
              >
                Falta Configurar:
              </Typography>
              
              {rows?.map((e:any, index: number) => <Typography key={index} color='error'
                gutterBottom
                variant="caption"
                style={{ color: "#000", display: "block" }}
              > {e.Description}</Typography>)}    
            </Paper>
          </Collapse>
        </Card>
      </SnackbarContent>
    );
  }
);

CompraCompleteXML.displayName = "CompraCompleteXML";

export default CompraCompleteXML;
