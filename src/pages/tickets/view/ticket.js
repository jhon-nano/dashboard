import { useRouter } from 'next/router';
import React from 'react';
import { useModelTicketById } from '../../../hooks/models/useModelTicket';
import LayoutApp from './../../../layout/LayoutApp';
import { Card, CardContent, Divider, Grid, Typography, CardHeader, Avatar, IconButton } from '@mui/material';


export default function ViewTicket() {

    const router = useRouter();


    const { ticket } = useModelTicketById(router.query.id)



    return ticket &&  (
        <Card sx={{ maxWidth: 500, margin: 'auto', padding: 2, boxShadow: 3 }}>
          <CardHeader
            avatar={
              <Avatar aria-label="">
                
              </Avatar>
            }
            action={
              <IconButton aria-label="">
                
              </IconButton>
            }
            title={`Ticket # ${ticket.consecutivo}`}
            subheader={`de # ${ticket.Almacen?.tradeName}`}
            
          />
          <CardContent>

    
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Forma de Pago:</strong> {ticket.forma_pago}
                </Typography>
                <Typography variant="body1">
                  <strong>Cliente:</strong> {ticket.cliente}
                </Typography>
                <Typography variant="body1">
                  <strong>Teléfono:</strong> {ticket.telefono}
                </Typography>
              </Grid>
    
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Precio de Venta:</strong> ${ticket.precio_venta}
                </Typography>
                <Typography variant="body1">
                  <strong>Estado:</strong> {ticket.estado}
                </Typography>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      )
}

ViewTicket.getLayout = function getLayout(page) {

    return <LayoutApp {...page.props}  >{page}</LayoutApp>;
};


