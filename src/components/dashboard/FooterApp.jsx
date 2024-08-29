import {
    BackupTwoTone,
    CloudDoneTwoTone,
    WifiOffTwoTone
} from "@mui/icons-material";
import {
    Badge,
    Button,
    Chip,
    Grow,
    Icon,
    Stack,
    Tooltip,
    useTheme
} from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";


import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "@mui-treasury/layout";
import { DataStore } from "aws-amplify";
import { loadingPedidos } from "../../store/actions/pedidos";


const StyledBadge = styled(Badge)(({ theme }) => ({

    '& .MuiBadge-badge': {
        right: 0,
        top: 5,
        border: `1.5px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}



export default function FooterApp({ pathnames, open_cloud }) {

    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();

    const { online, status } = useSelector((state) => state.app);

    const { usuario } = useSelector((state) => state.usuario);


    const renderChip = () => {
        if (open_cloud) {
            return (
                <Chip
                    size="small"
                    color="info"
                    icon={<CloudDoneTwoTone color="success" />}
                    label="Sincronizando..."
                    variant="filled"
                />
            );
        }

        if (online) {
            return status ? (
                <Chip
                    size="small"
                    color="success"
                    icon={<CloudDoneTwoTone color="success" />}
                    label="Conectado Y Actualizado"
                    variant="filled"
                />
            ) : (
                <Chip
                    size="small"
                    color="info"
                    icon={<BackupTwoTone color="info" />}
                    label="Datos Pendientes"
                    variant="filled"
                />
            );
        }

        return (
            <Chip
                size="small"
                color="error"
                icon={<WifiOffTwoTone />}
                label="Sin Internet!"
                variant="filled"
            />
        );
    };



    return (
        <Box

            sx={{
                background: theme.palette.grey[600],
                padding: 1,

                position: 'fixed',
                top: 'auto',
                bottom: 0,
                minWidth: '100%',
                zIndex: 1,
                displayPrint: "none",
                display: 'flex'
            }}

        >



            <Breadcrumbs aria-label="breadcrumb" sx={{ minWidth: 290, color: 'white' }}  >
                <Chip

                    component="a"

                    variant="outlined"
                    sx={{ borderRadius: 2, color: 'white' }}

                    size="small"
                    icon={
                        <Icon color="inherit">
                            {"home"}
                        </Icon>
                    }
                    onClick={() => {
                        router.push("/");
                    }}
                />

                {
                    pathnames?.map((name, index) => {
                        const isLast = index === pathnames.length - 1;

                        const modulo = usuario?.modulos_new.find(
                            (modulo) => modulo?.path == "/" + name
                        );

                        return (
                            <Grow
                                key={name}
                                in={true}
                                style={{ transformOrigin: "0 0 0" }}
                                {...(true ? { timeout: 2500 * index } : {})}
                            >
                                <Chip
                                    variant={index > 0 || isLast ? "filled" : "outlined"}
                                    label={
                                        <b>
                                            {modulo
                                                ? modulo.nombreModulo.toUpperCase()
                                                : name.toUpperCase()}
                                        </b>
                                    }
                                    disabled={index > 0 || isLast}
                                    sx={{ borderRadius: 2, color: 'white' }}

                                    size="small"
                                    icon={
                                        <Icon color="inherit">
                                            {modulo ? modulo?.icon : "turn_right"}
                                        </Icon>
                                    }
                                    onClick={() => {
                                        router.push("/" + name);
                                    }}
                                />
                            </Grow>
                        );
                    })}
            </Breadcrumbs>
            <Box flexGrow={1} />


            <Box flexGrow={1} />
            <Tooltip title='Estado de la Aplicacion'>
            {renderChip()}
            </Tooltip>


            <Box width={100} />
        </Box>
    )
}
