import React from 'react'
import { Box } from '@mui/system'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack, Typography } from '@mui/material';
function SendMsg({message}) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'end',
            padding:2
        }}>
           <Stack>
                <Card  sx={{ maxWidth:250,backgroundColor:'rgb(0, 149, 246)',color:'white',marginRight:'1.6vw'}}>
                    <CardContent>
                     {message}
                    </CardContent>
                </Card>
                 <Typography sx={{width:'100%', textAlign:'right'}}>you</Typography>
           </Stack >
        </Box>
    )
}

export default SendMsg