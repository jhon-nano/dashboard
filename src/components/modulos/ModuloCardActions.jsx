import React from "react";
import { TouchApp } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    Divider,
    Icon,
    Paper,
    Stack,
    Typography,
    useTheme
} from "@mui/material";




export default function ModuloCardActions(props) {

    const theme = useTheme()

    return (
        <Card sx={{
            maxWidth: 283,
            borderEndEndRadius: 16,
            borderEndStartRadius: 16,
            borderStartEndRadius: 8,
            borderStartStartRadius: 8,
            boxShadow: `0 0 16px ${theme.palette.secondary.main}`,
            border: '1px dashed'
        }}>
            <Paper sx={{
                maxWidth: 285,
                pb: 1,
                pr: 1,
                pl: 1,
                borderEndEndRadius: 16,
                borderEndStartRadius: 48,
                borderStartEndRadius: 8,
                borderStartStartRadius: 8,
                borderColor: theme.palette.secondary.main
            }}>
                <Divider>
                    <TouchApp color="secondary" />
                </Divider>
                <Stack direction={"row"} spacing={1} alignContent="cemter" alignItems={"center"}>
                    <Avatar sx={{
                        boxShadow: `0 0 8px ${theme.palette.light}`,
                        width: 80,
                        height: 80,
                        alignContent: 'center',
                        textAlign: 'center'
                    }}>
                        <Icon color="secondary" sx={{
                            "&:hover": {
                                transform: "scale(1.1)"
                            }
                        }} style={{
                            fontSize: 60
                        }}>
                            {props.modulo.icon}
                        </Icon>
                    </Avatar>

                    <Divider orientation="vertical" variant="fullWidth" flexItem sx={{
                        background: "#c0c0c0"
                    }} />
                    <Stack>
                        <Typography variant="button">
                            MODULO
                        </Typography>
                        <Typography variant="h6" lineHeight={1}>
                            <b> {props.modulo.nombreModulo}</b>
                        </Typography>
                        <Divider />
                        <Typography variant="caption" lineHeight={1}>
                            {props.modulo.detalle}
                        </Typography>
                    </Stack>
                </Stack>
                <CardActions>
                    <Button variant="contained" color="secondary" disabled={!props.modulo.maneja_almacenes} onClick={() => {
                        props.setModuloSelect(props.modulo);
                        props.setOpenAutAlmacenes(true);
                    }}>Almacenes</Button>
                    <Button variant="contained" color="secondary" onClick={() => {
                        props.setModuloSelect(props.modulo);
                        props.setOpenAutPermisos(true);
                    }}>Permisos</Button>
                </CardActions>

            </Paper>
        </Card>
    );

}