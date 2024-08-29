import CheckBoxTwoTone from "@mui/icons-material/CheckBoxTwoTone";
import PendingTwoTone from "@mui/icons-material/PendingTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";
import { forwardRef, useCallback, useState } from "react";

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
    padding: 4
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

interface CompraCompleteProps extends CustomContentProps {
  allowDownload?: boolean;
  compra:any;
  validations: any;
}

const CompraComplete = forwardRef<HTMLDivElement, CompraCompleteProps>(
  ({ id, ...props }, ref) => {
    
    const classes = useStyles();
    const theme = useTheme()
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const { compra, validations } = props


   const completed = validations.filter((element: any) => element.completed == false).length == 0




    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card} style={{ backgroundColor: completed ? theme.palette.success.main : theme.palette.info.main }}>
          <CardActions classes={{ root: classes.actionRoot }}>
          {!completed ? <Typography variant="button" className={classes.typography}>
              ⚠️ {props.message}
            </Typography>
          :
            <Typography variant="button" className={classes.typography}>
              ✔ Compra COMPLETA
            </Typography>
            }
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
            </div>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper className={classes.paper}>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              dense
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Lista de Pendientes
                </ListSubheader>
              }
              
            >
              <Divider/>
            {validations.map((element: any, index: number) => (
                <ListItem key={index} divider>
                <ListItemIcon>
                  {element.completed ? <CheckBoxTwoTone color='success' /> : <PendingTwoTone color='error' />}
                </ListItemIcon>
                <ListItemText primary={element.message} sx={{color:element.completed ? 'black' : 'red'}}/>
              </ListItem>
              ))}
            </List>
            </Paper>
          </Collapse>
        </Card>
      </SnackbarContent>
    );
  }
);

CompraComplete.displayName = "CompraComplete";

export default CompraComplete;
