import React from 'react'
import { Box } from '@mui/system'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack,Typography } from '@mui/material';
function ReceiveMsg() {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        padding:2
    }}>
       <Stack>
            <Card  sx={{ maxWidth:250,backgroundColor:'white',color:'black'}}>
                <CardContent>
                   hellsdsdfgvdgdfodfg fgbfghfgh fghfghfgh fghbfghfh
                </CardContent>
            </Card>
            <Typography>sender</Typography>
       </Stack >
    </Box>
  )
}

export default ReceiveMsg