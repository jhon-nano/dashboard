import { Avatar, Icon, Skeleton, Stack, Typography, useTheme } from '@mui/material';

export default function TitleTable({ icon, nombreModulo, detalle }) {

    const theme = useTheme();

    return (
        <Stack direction={'row'} minWidth={220} >
            <Avatar variant='rounded' sx={{ width: 56, height: 56, bgcolor: theme.palette.grey[400] }}>
                {icon ?
                    <Icon color="primary" style={{ fontSize: 50 }}>{icon}</Icon>

                    :
                    <Skeleton variant="rounded" width={50} height={50} />}
            </Avatar>

            <Stack margin={1} borderBottom={2} borderColor={'primary'}>
                <Typography
                    variant="h6"
                    sx={{
                        lineHeight: "normal",
                        fontWeight: "bold",
                    }}
                >
                    {nombreModulo ?
                        nombreModulo
                        :
                        <Skeleton variant="text" width={150} />}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        lineHeight: "normal",

                    }}
                    noWrap
                >
                    <b>
                        {detalle ?
                            detalle :
                            <Skeleton variant="text" width={150} />}
                    </b>
                </Typography>

            </Stack>
        </Stack>
    )
}
