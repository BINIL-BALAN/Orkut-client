import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
function QuatsWrite() {
  return (
    <Card sx={{ width:'95%'}}>
    <CardContent>
        <Stack direction='row' alignItems='center'>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Typography marginLeft='1vw'>User</Typography>
        </Stack>
      
    <Box marginTop='2.5vh'>
          <TextField
              sx={{width:'100%'}}
              id="filled-multiline-static"
              label="Whats in your mind ?"
              multiline
              rows={3}
              defaultValue="Write something......"
              variant="outlined"
            />
    </Box >

    </CardContent>
    <CardActions>
      <Button varient='contained' size="small">Post</Button>
    </CardActions>
  </Card>
  )
}

export default QuatsWrite