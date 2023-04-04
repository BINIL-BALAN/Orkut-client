import React from 'react'
import { Box } from '@mui/system'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, Stack,Typography } from '@mui/material';
import { LAN_IP } from '../../constants';
function ReceiveMsg({message,image}) {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        padding:2
    }}>
       <Stack direction='column' sx={{display:'flex',alignItems:'top'}}>
            <Card  sx={{minWidth:90, maxWidth:250,backgroundColor:'white',color:'black',marginLeft:'2.1vw',borderRadius:'18px'}}>
                <CardContent>
                   {message}
                </CardContent>
            </Card>
            <Avatar src={image?.replace('localhost',LAN_IP)} sx={{width:32,height:32}}/>
       </Stack >
    </Box>
  )
}

export default ReceiveMsg