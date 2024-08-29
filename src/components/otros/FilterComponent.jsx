import { ExpandMoreTwoTone } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Divider, FormControlLabel, FormGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';


const useStyles = makeStyles({
    label: {
        fontSize: '11px', // Puedes ajustar el tamaño de fuente según tus preferencias
    },
});

const FilterComponent = ({ data, onFilterChange }) => {
    const classes = useStyles();

    const [filters, setFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});

    useEffect(() => {
        // Extraer las categorías únicas y sus opciones de filtro del objeto de datos
        const filter = Object.keys(data).reduce((acc, category) => {
            const uniqueOptions = [...new Set(data[category])];
            acc[category] = uniqueOptions;
            return acc;
        }, []);
        //console.log(filter)
        // Inicializar los filtros seleccionados

        setFilters(filter);




    }, [data]);

    const handleFilterChange = (category, value) => {



        setSelectedFilters((prevFilters) => {
            const categoryFilters = prevFilters[category] || [];
            const updatedFilters = categoryFilters.includes(value)
                ? categoryFilters.filter((item) => item !== value)
                : [...categoryFilters, value];

            const newFilters = {
                ...prevFilters,
                [category]: updatedFilters,
            };

            // Si el array de opciones de la categoría quedó vacío, eliminar la propiedad del estado
            if (newFilters[category].length === 0) {
                delete newFilters[category];
            }

            return newFilters;
        });
    };

    const applyFilter = () => {
        onFilterChange(selectedFilters);
    };

    useEffect(() => {
        onFilterChange(selectedFilters);


    }, [selectedFilters])

    return (
        <div>


            {Object.keys(filters).map((category) => (

                <Accordion key={category}         >
                    <AccordionSummary
                        expandIcon={<ExpandMoreTwoTone />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"

                    >
                        <FormControlLabel
                            label={category}
                            control={
                                <Checkbox
                                    checked={Boolean(selectedFilters[category]?.length > 0)}
                                    indeterminate={selectedFilters[category]?.length == 0}

                                />
                            }

                        />
                    </AccordionSummary>
                    <AccordionDetails>



                        <FormGroup >
                            {filters[category].map((option, index) => (
                                <div key={option}>
                                    <FormControlLabel

                                        label={option}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={Boolean(selectedFilters[category]?.includes(option))}
                                                onChange={() => handleFilterChange(category, option)}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                    />
                                    {index < filters[category].length - 1 && <Divider />} {/* Agregar Divider hasta el penúltimo FormControlLabel */}
                                </div>
                            ))}</FormGroup>
                    </AccordionDetails>
                </Accordion>






            ))}

        </div>
    );
};

export default FilterComponent;
