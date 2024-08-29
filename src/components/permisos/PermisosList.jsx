import { Divider, FormHelperText, List, ListItem, ListItemText, ListSubheader, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import TypesModulos from '../../types/typesModulos';
import { useRouter } from 'next/router';

export default function PermisosList() {

    const theme = useTheme()


    const {
        modulo, permisosAutorizados
      } = useSelector((state) => state.usuario);

    const typesModulos = new TypesModulos(useRouter());

    return (
        <List
            dense
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: 3, borderColor: theme.palette.primary.main }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 900 }}>
                    Permisos Autorizados
                </ListSubheader>
            }
        >
            <Divider />
            {permisosAutorizados.map((e) =>
                <ListItem key={e} divider sx={{ padding: 0, paddingLeft: 1, margin: 0 }} s>

                    <ListItemText
                        primary={typesModulos.getPermisoByModuloAndCode(modulo, e).label}
                        secondary={typesModulos.getPermisoByModuloAndCode(modulo, e).code}
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
