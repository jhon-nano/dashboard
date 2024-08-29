import CheckBoxTwoTone from '@mui/icons-material/CheckBoxTwoTone';
import CloseIcon from "@mui/icons-material/Close";
import AssignmentTwoTone from "@mui/icons-material/AssignmentTwoTone";
import { Box, Stack, useTheme } from "@mui/material";
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

interface SuccessCreateProps extends CustomContentProps {
  allowDownload?: boolean;
  detalle: string;
  message: string;
  children: any;
  
  push: any;
}

const SuccessCreate = forwardRef<HTMLDivElement, SuccessCreateProps>(
  ({ id, ...props }, ref) => {
    
    const classes = useStyles();
    const theme = useTheme();
    const { closeSnackbar } = useSnackbar();




    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card} style={{ backgroundColor: theme.palette.success.main }}>
          <CardActions classes={{ root: classes.actionRoot }}>
          <Box display="flex" flexDirection="row" alignItems="center" minWidth={0}>
          <IconButton
                aria-label="Show more"
                size="small"

                onClick={props.push}
              >
                <AssignmentTwoTone />
              </IconButton>
            <Stack margin={1} borderBottom={2} borderColor={'primary'}>
                <Typography
                    variant="button"
                    sx={{
                        lineHeight: "normal",
                        fontWeight: "bold",
                    }}
                >
                    {props.message}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        lineHeight: "normal",

                    }}
                    noWrap
                >
                    <b>
                  {props.detalle}
                    </b>
                </Typography>
            </Stack>
        </Box>
            <div className={classes.icons}>

              <IconButton
                size="small"
                className={classes.expand}
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </CardActions>

        </Card>
      </SnackbarContent>
    );
  }
);

SuccessCreate.displayName = "SuccessCreate";

export default SuccessCreate;
