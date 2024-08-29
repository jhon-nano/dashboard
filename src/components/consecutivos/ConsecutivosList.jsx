import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Icon } from '@mui/material';

export default function ConsecutivosList({ consecutivos }) {
    console.log(consecutivos)
    return (
        <List sx={{ width: '100%' }}>
            {consecutivos.map((consecutivo) =>
                <ListItem key={consecutivo.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon color='secondary' >
                                {consecutivo.ModuloNew.icon}
                            </Icon>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={consecutivo.ModuloNew.nombreModulo} secondary={`Consecutivo: ${consecutivo.consecutivo}`} />
                </ListItem>
            )}


        </List>
    );
}
