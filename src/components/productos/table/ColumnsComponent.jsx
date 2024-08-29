import { Badge, Box, Icon, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Estado } from '../../../models';
import { CheckBoxTwoTone, PendingTwoTone } from '@mui/icons-material';
import TypesCompra from '../../../types/typesCompra';
import InventarioService from '../../../services/inventarioService';

export function EditComponentConsecutivo(props) {

  

    const{ id } = props;
    const [inventario, setInventario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(id){
        const fetchInventario = async () => {
            const serviceInventario = new InventarioService();

            try {
                const inventario = await serviceInventario.getInventarioByProducto(id);
                setInventario(inventario);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInventario();
    }
    }, [id]);

    const calculateInventoryStatus = (inventarios) => {
        if (inventarios.length === 0) {
            return 'SIN INVENTARIOS';
        }

        const cantidadDisponible = inventarios.reduce((total, item) => {
            return total + (item.inventario - item.separado);
        }, 0);

        return cantidadDisponible > 0 ? 'DISPONIBLE' : 'AGOTADO';
    };

    if (loading) {
        return <Skeleton variant="text" sx={{ fontSize: '1rem' }} />;
    }

    if (error) {
        return (
            <Typography color="error" variant="caption">
                <b>Error al cargar inventario</b>
            </Typography>
        );
    }

    return (
        <Box
            display="flex"
            borderRadius="borderRadius"
            alignContent="center"
            alignItems="center"
            textAlign="center"
            flexDirection="column"
        >
            {inventario.length === 0 ? (
                <Typography color="error" variant="caption">
                    <b>SIN INVENTARIOS</b>
                </Typography>
            ) : (
                <Typography color="success" variant="caption">
                    {calculateInventoryStatus(inventario)}
                </Typography>
            )}
        </Box>
    );
};


export default { EditComponentConsecutivo }