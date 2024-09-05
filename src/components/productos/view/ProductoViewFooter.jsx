import { Footer } from '@mui-treasury/layout'
import { PlaylistAddTwoTone } from '@mui/icons-material';
import { Alert, AlertTitle, Box, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

export default function ProductoViewFooter({ inventarios, setOpenInventarios }) {

    const theme = useTheme();

    return (

        <Box sx={{ border: 1, borderColor: theme.palette.grey[400] }}>
            <CardHeader
                subheader={"Inventarios"}
                subheaderTypographyProps={{
                    color: 'primary',
                    variant: 'button'
                }}
                sx={{
                    height: 25,
                    background: grey[400],
                    borderBottom: 1,
                    borderColor: grey[400],

                }}
            />
            {inventarios && inventarios.length > 0 ?
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Almacén</TableCell>
                 
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventarios.map((inv, i) =>
                            <TableRow key={inv.id}>
                                <TableCell>{inv.Almacen?.tradeName}</TableCell>
                  
                                <TableCell>{inv.precio.toLocaleString()}</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
                : <Alert
                    severity="info"
                    action={
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={() => setOpenInventarios(true)}
                            sx={{
                                border: 2,

                                mr: 1,
                                "&:hover": {
                                    backgroundColor: theme.palette.action.main,
                                    color: "white",
                                },
                            }}

                        >
                            <PlaylistAddTwoTone fontSize='large' color='primary' />
                        </IconButton>
                    }
                >
                    <AlertTitle>Producto sin Inventario</AlertTitle>
                    Este producto no presenta Inventarios Presiona + para Agregar.
                </Alert>}
        </Box>

    )
}
