import { DashboardTwoTone, KeyboardDoubleArrowLeftTwoTone, KeyboardDoubleArrowRight, TodayTwoTone } from '@mui/icons-material';
import { Box, CardHeader, FormControl, InputLabel, MenuItem, Paper, Select, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import React from 'react';

export default function FormFooterInformes({ startOfDay, endOfDay, filter, setFilter, filterData, setFilterData }) {





    function fechasText(filter) {
        switch (filter) {
            case 'day':
                return `${startOfDay}`
            case 'week':
                return `Semama ${moment().add(filterData, filter).format('ww')}: ${startOfDay} al ${endOfDay}`
            case 'month':
                return `${startOfDay} al ${endOfDay}`

            default:
                break;
        }
    }


    const handleChange = (event) => {
        setFilter(event.target.value);
    };


    const handleIncrement = () => {
        setFilterData(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setFilterData(prevCount => prevCount - 1);
    };



    return (
        <Stack display={'flex'} component={Paper} sx={{ width: '100%', border: 1, borderColor: grey[400] }}>
            <CardHeader
                avatar={

                    <DashboardTwoTone style={{ fontSize: 75 }} color="secondary" />


                }

                title={'TABLERO INFORMES'}
                titleTypographyProps={{
                    variant: 'h4',
                    fontFamily: 'fantasy'
                }}
                subheader={fechasText(filter)}
                subheaderTypographyProps={{
                    variant: 'button',
                }}
                action={
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" >Filtro</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filter}
                                label="Filtro"
                                size="small"
                                onChange={handleChange}
                                color="info"
                            >
                                <MenuItem value={'day'}>Dia</MenuItem>
                                <MenuItem value={'week'}>Semana</MenuItem>
                                <MenuItem value={'month'}>Mes</MenuItem>
                            </Select>
                        </FormControl>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>


                            <ToggleButtonGroup
                                aria-label="text formatting"
                                size="small"
                                sx={{ marginTop: 1 }}
                            >
                                <Tooltip title='Fecha Anterior'>
                                    <ToggleButton value="bold" aria-label="bold" onClick={handleDecrement} >
                                        <KeyboardDoubleArrowLeftTwoTone fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title='Fecha Actual'>
                                    <ToggleButton value="italic" aria-label="italic" onClick={() => {
                                        setFilterData(0);
                                    }}>
                                        <TodayTwoTone fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title='Fecha Posterior'>
                                    <ToggleButton value="underlined" aria-label="underlined" onClick={handleIncrement}>
                                        <KeyboardDoubleArrowRight fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>


                        </div>
                    </Box>}

            />
        </Stack>
    )
}
