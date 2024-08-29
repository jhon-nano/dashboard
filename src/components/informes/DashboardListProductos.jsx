import React, { useState } from "react";
// layout for this page
import { ArrowForwardIosSharp, BallotTwoTone, CategoryTwoTone, FormatListNumberedTwoTone, PriceChangeTwoTone, SortByAlphaTwoTone, StorefrontTwoTone, TvTwoTone } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, ToggleButton, ToggleButtonGroup, Tooltip as TooltipMui, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/styles";
import { useInformeDiaItems, useModelPedidosItems } from "../../hooks/models/useModelInformes";



const AccordionMui = styled((props) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
    width: '100%',
    margin: 3
}));

const AccordionSummaryMui = styled((props) => (
    <AccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetailsMui = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));





export default function DashboardListProductos({ pedidoDia }) {

    const theme = useTheme()

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const { data } = useModelPedidosItems(pedidoDia)

    const [filterData, setFilterData] = useState('totalTotal')



    const {
        productosAgrupados,
        lineasAgrupados,
        categoriasAgrupados,
        marcasAgrupados,
    } = useInformeDiaItems(data)



    return (
        <Grid container spacing={1} >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                <CardHeader
                    avatar={
                        <Avatar variant="rounded">
                            <TvTwoTone color="primary" />
                        </Avatar>
                    }
                    action={
                        <ToggleButtonGroup
                            value={filterData}
                            exclusive
                            onChange={(event, newAlignment) => setFilterData(newAlignment)}
                            aria-label="text alignment"
                            size="small"

                        >
                            <TooltipMui title='Ordenar Por Precio'>
                                <ToggleButton size="small" value="totalTotal" aria-label="left aligned">
                                    <PriceChangeTwoTone fontSize="small" />
                                </ToggleButton>
                            </TooltipMui>
                            <TooltipMui title='Ordenar Por Cantidad'>
                                <ToggleButton size="small" value="totalCantidad" aria-label="centered">
                                    <FormatListNumberedTwoTone fontSize="small" />
                                </ToggleButton>
                            </TooltipMui>
                            <TooltipMui title='Ordenar por alfabeto'>
                                <ToggleButton size="small" value="" aria-label="right aligned">
                                    <SortByAlphaTwoTone fontSize="small" />
                                </ToggleButton>
                            </TooltipMui>
                        </ToggleButtonGroup>
                    }
                    title="Ventas de Productos"
                    subheader="Lineas, Categorias & Marcas."

                />




            </Grid>
            <AccordionMui expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummaryMui aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Productos Vendidos</Typography>
                </AccordionSummaryMui>
                <AccordionDetailsMui>

                    <List
                        dense
                        sx={{


                            bgcolor: 'white',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },

                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"


                    >
                        {Object.values(productosAgrupados).sort(function (a, b) {

                            if (filterData == 'totalCantidad') {
                                a = a.totalCantidad;
                                b = b.totalCantidad;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else if (filterData == 'totalTotal') {
                                a = a.totalTotal;
                                b = b.totalTotal;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else {
                                return a.nombre.localeCompare(b.nombre)
                            }
                        }).map((producto, i) => (
                            <ListItem key={producto.id} divider sx={{ margin: 0, padding: 0 }}>
                                <ListItemAvatar>

                                    <Avatar variant="rounded" sx={{ bgcolor: theme.palette.primary.main, width: 30, height: 30, marginLeft: 1.5 }}>{i + 1}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={producto.nombre}
                                    primaryTypographyProps={{
                                        variant: 'caption',
                                        whiteSpace: 'nowrap', // Evita el salto de línea
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
                                        margin: 0,
                                        padding: 0
                                    }}
                                    secondary={
                                        <Box display={'flex'}>
                                            <Typography variant="caption" fontSize={12}>
                                                Cantidad: <b>{producto.totalCantidad.toFixed(2)}</b>
                                            </Typography>
                                            <Box flexGrow={1} />
                                            <Typography variant="caption" fontSize={12}>
                                                {`$ ${producto.totalTotal.toLocaleString()}`}
                                            </Typography>
                                        </Box>
                                    }
                                    secondaryTypographyProps={{
                                        margin: 0,
                                        padding: 0
                                    }}
                                    sx={{ marginRight: 1.5 }}
                                />
                            </ListItem>
                        ))}


                    </List>
                </AccordionDetailsMui>
            </AccordionMui>
            <AccordionMui expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummaryMui aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Lineas Vendidos</Typography>
                </AccordionSummaryMui>
                <AccordionDetailsMui>

                    <List
                        dense
                        sx={{


                            bgcolor: 'white',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },

                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{
                                background: theme.palette.secondary.main,
                                color: 'white',


                            }}>
                                <CardHeader

                                    avatar={
                                        <BallotTwoTone fontSize="small" />
                                    }

                                    title="Lineas Vendidos"
                                    subheader=""
                                    sx={{

                                        padding: 0.5
                                    }}
                                />

                            </ListSubheader>
                        }

                    >
                        {Object.values(lineasAgrupados).sort(function (a, b) {

                            if (filterData == 'totalCantidad') {
                                a = a.totalCantidad;
                                b = b.totalCantidad;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else if (filterData == 'totalTotal') {
                                a = a.totalTotal;
                                b = b.totalTotal;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else {
                                return a.nombre.localeCompare(b.nombre)
                            }
                        }).map((producto, i) => (
                            <ListItem key={producto.id} divider sx={{ margin: 0, padding: 0 }}>
                                <ListItemAvatar>

                                    <Avatar variant="rounded" sx={{ bgcolor: theme.palette.primary.main, width: 30, height: 30, marginLeft: 1.5 }}>{i + 1}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={producto.nombre}
                                    primaryTypographyProps={{
                                        variant: 'caption',
                                        whiteSpace: 'nowrap', // Evita el salto de línea
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
                                        margin: 0,
                                        padding: 0
                                    }}
                                    secondary={
                                        <Box display={'flex'}>
                                            <Typography variant="caption" fontSize={12}>
                                                Cantidad: <b>{producto.totalCantidad.toFixed(2)}</b>
                                            </Typography>
                                            <Box flexGrow={1} />
                                            <Typography variant="caption" fontSize={12}>
                                                {`$ ${producto.totalTotal.toLocaleString()}`}
                                            </Typography>
                                        </Box>
                                    }
                                    secondaryTypographyProps={{
                                        margin: 0,
                                        padding: 0
                                    }}
                                    sx={{ marginRight: 1.5 }}
                                />
                            </ListItem>
                        ))}


                    </List>

                </AccordionDetailsMui>
            </AccordionMui>
            <AccordionMui expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummaryMui aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Categorias Vendidos</Typography>
                </AccordionSummaryMui>
                <AccordionDetailsMui>
                    <List
                        dense
                        sx={{


                            bgcolor: 'white',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },

                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{
                                background: theme.palette.secondary.main,
                                color: 'white',


                            }}>
                                <CardHeader

                                    avatar={
                                        <CategoryTwoTone fontSize="small" />
                                    }

                                    title="Categorias Vendidos"
                                    subheader=""
                                    sx={{

                                        padding: 0.5
                                    }}
                                />

                            </ListSubheader>
                        }

                    >
                        {Object.values(categoriasAgrupados).sort(function (a, b) {

                            if (filterData == 'totalCantidad') {
                                a = a.totalCantidad;
                                b = b.totalCantidad;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else if (filterData == 'totalTotal') {
                                a = a.totalTotal;
                                b = b.totalTotal;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else {
                                return a.nombre.localeCompare(b.nombre)
                            }
                        }).map((producto, i) => (
                            <ListItem key={producto.id} divider sx={{ margin: 0, padding: 0 }}>
                                <ListItemAvatar>

                                    <Avatar variant="rounded" sx={{ bgcolor: theme.palette.primary.main, width: 30, height: 30, marginLeft: 1.5 }}>{i + 1}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={producto.nombre}
                                    primaryTypographyProps={{
                                        variant: 'caption',
                                        whiteSpace: 'nowrap', // Evita el salto de línea
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
                                        margin: 0,
                                        padding: 0
                                    }}
                                    secondary={
                                        <Box display={'flex'}>
                                            <Typography variant="caption" fontSize={12}>
                                                Cantidad: <b>{producto.totalCantidad.toFixed(2)}</b>
                                            </Typography>
                                            <Box flexGrow={1} />
                                            <Typography variant="caption" fontSize={12}>
                                                {`$ ${producto.totalTotal.toLocaleString()}`}
                                            </Typography>
                                        </Box>
                                    }
                                    secondaryTypographyProps={{
                                        margin: 0,
                                        padding: 0
                                    }}
                                    sx={{ marginRight: 1.5 }}
                                />
                            </ListItem>
                        ))}


                    </List>

                </AccordionDetailsMui>
            </AccordionMui>
            <AccordionMui expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummaryMui aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Marcas Vendidos</Typography>
                </AccordionSummaryMui>
                <AccordionDetailsMui>

                    <List
                        dense
                        sx={{


                            bgcolor: 'white',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },

                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader" sx={{
                                background: theme.palette.secondary.main,
                                color: 'white',


                            }}>
                                <CardHeader

                                    avatar={
                                        <StorefrontTwoTone fontSize="small" />
                                    }

                                    title="Marcas Vendidos"
                                    subheader=""
                                    sx={{

                                        padding: 0.5
                                    }}
                                />

                            </ListSubheader>
                        }

                    >
                        {Object.values(marcasAgrupados).sort(function (a, b) {

                            if (filterData == 'totalCantidad') {
                                a = a.totalCantidad;
                                b = b.totalCantidad;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else if (filterData == 'totalTotal') {
                                a = a.totalTotal;
                                b = b.totalTotal;

                                return a > b ? -1 : a < b ? 1 : 0;
                            } else {
                                return a.nombre.localeCompare(b.nombre)
                            }
                        }).map((producto, i) => (
                            <ListItem key={producto.id} divider sx={{ margin: 0, padding: 0 }}>
                                <ListItemAvatar>

                                    <Avatar variant="rounded" sx={{ bgcolor: theme.palette.primary.main, width: 30, height: 30, marginLeft: 1.5 }}>{i + 1}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={producto.nombre}
                                    primaryTypographyProps={{
                                        variant: 'caption',
                                        whiteSpace: 'nowrap', // Evita el salto de línea
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', // Recorta el texto que excede el ancho
                                        margin: 0,
                                        padding: 0
                                    }}
                                    secondary={
                                        <Box display={'flex'}>
                                            <Typography variant="caption" fontSize={12}>
                                                Cantidad: <b>{producto.totalCantidad.toFixed(2)}</b>
                                            </Typography>
                                            <Box flexGrow={1} />
                                            <Typography variant="caption" fontSize={12}>
                                                {`$ ${producto.totalTotal.toLocaleString()}`}
                                            </Typography>
                                        </Box>
                                    }
                                    secondaryTypographyProps={{
                                        margin: 0,
                                        padding: 0
                                    }}
                                    sx={{ marginRight: 1.5 }}
                                />
                            </ListItem>
                        ))}


                    </List>
                </AccordionDetailsMui>
            </AccordionMui>








        </Grid>
    )
}
