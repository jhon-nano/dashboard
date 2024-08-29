import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, FormControlLabel, Icon, List, ListItem, ListItemText, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import TypesModulos from '../../types/typesModulos';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Favorite, PersonPin, Phone } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { Controller, useForm } from 'react-hook-form';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const ModuloConfiguracion = () => {

    const theme = useTheme();

    const { control, handleSubmit } = useForm();

    const [selectedTab, setSelectedTab] = useState(0); // Estado para mantener la pestaña seleccionada
    const [currentModuleConfig, setCurrentModuleConfig] = useState(null); // Estado para mantener la configuración actual del módulo seleccionado

    // Lista de módulos (puedes agregar más módulos aquí)
    const modules = new TypesModulos(useRouter())

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
        setCurrentModuleConfig(modules.getModulosApp()[newValue].constructor.DefaultConfig); // Actualiza la configuración del módulo seleccionado
    };


    const onSubmit = (data) => {
        console.log('Datos del formulario:', data);
    }


    const renderInputField = (key, value) => {


        switch (typeof value) {
            case 'boolean':
                return (
                    <FormControlLabel
                        control={
                            <Controller
                                name={key}
                                control={control}
                                render={({ field }) =>
                                    <Checkbox {...field} />} />}
                        label={value}
                    />
                );
            case 'date':
                return (
                    <Controller
                        name={key}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={value}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                );
            case 'number':
                return (
                    <Controller
                        name={key}
                        control={control}
                        render={({ field }) => <TextField {...field} label={value} type="number" />}
                    />
                );
            default:
                return (
                    <Controller
                        name={key}
                        control={control}
                        render={({ field }) => <TextField {...field} label={value} type="text" />}
                    />
                );
        }
    };



    return (
        <div>
            <BottomNavigation
                showLabels
                value={selectedTab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="inherit"
                sx={{
                    background: theme.palette.secondary.main
                }}
            >
                {modules.getModulosApp().map((module, index) => (
                    <BottomNavigationAction
                        key={index}

                        icon={<Icon>{module.icon}</Icon>}
                        label={module.nombreModulo}


                    />
                ))}
            </BottomNavigation>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Contenido de la pestaña seleccionada */}
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Configuraciones del Módulo: {modules.getModulosApp()[selectedTab].nombreModulo}
                    </Typography>

                    {currentModuleConfig && (
                        <List>
                            {Object.entries(currentModuleConfig).map(([key, value]) => (
                                <ListItem key={key}>
                                    <ListItemText primary={key} secondary={value} />
                                    {/* Agrega un campo de entrada o control para modificar la configuración */}
                                    {renderInputField(key, value)}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </div>
                <Button variant="contained" color="primary" type="submit">
                    Guardar Configuraciones
                </Button>
            </form>


        </div>
    );
};

export default ModuloConfiguracion;
