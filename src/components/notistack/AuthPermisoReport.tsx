import { useState, forwardRef, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TitleTable from "../tablas/TitleTable";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import {  Divider, useTheme } from "@mui/material";

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

interface AuthPermisoReportProps extends CustomContentProps {
  allowDownload?: boolean;
  data: any;
}

const AuthPermisoReport = forwardRef<HTMLDivElement, AuthPermisoReportProps>(
  ({ id, ...props }, ref) => {
    
    const classes = useStyles();
    const theme = useTheme()
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card} style={{ backgroundColor: theme.palette.warning.main }}>
          <CardActions classes={{ root: classes.actionRoot }}>
            <AppsOutageIcon color="inherit" fontSize="large" sx={{marginRight:1}}/>
            <Divider flexItem orientation="vertical" />
            <Typography variant="body1" className={classes.typography} borderBottom={2} sx={{margin:1}}>
              <b>{props.message}</b>
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
            <TitleTable 
            icon={'security'} 
            detalle ={'CODIGO: '+props.data.code} 
            nombreModulo={props.data.label} />
            <Button size="small" color="primary" className={classes.button}>
                <CheckCircleIcon className={classes.checkIcon} />
                Contacte con un Administrador.
              </Button>
            </Paper>
          </Collapse>
        </Card>
      </SnackbarContent>
    );
  }
);

AuthPermisoReport.displayName = "AuthPermisoReport";

export default AuthPermisoReport;
