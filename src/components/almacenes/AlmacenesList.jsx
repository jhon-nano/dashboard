import { Divider, FormHelperText, List, ListItem, ListItemText, ListSubheader, useTheme } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function AlmacenesList() {

    const theme = useTheme()



    const { modulo, almacenesAutorizados 
    } = useSelector((state) => state.usuario);


    return (
        <List
            dense
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: 3, borderColor: theme.palette.primary.main }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 900 }}>
                    Almacenes Autorizados
                </ListSubheader>
            }
        >
            <Divider />
            {almacenesAutorizados.map((e) =>
                <ListItem key={e.id} divider sx={{ padding: 0, paddingLeft: 1, margin: 0 }} s>

                    <ListItemText
                        primary={e.nombreAlmacen}
                        secondary={e.codigo}
                        secondaryTypographyProps={{ variant: 'caption', fontSize: 10 }}
                        sx={{ borderLeft: 3, padding: 0, paddingLeft: 1, margin: 0 }}
                    />

                </ListItem>
            )}
            <FormHelperText sx={{ paddingLeft: 1 }}>
                Modulo: {modulo.nombreModulo}
            </FormHelperText>
        </List>
    )
}
