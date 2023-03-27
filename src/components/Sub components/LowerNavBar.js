import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from '@mui/material';

function LowerNavBar() {
  return (
    <AppBar position="fixed" color="primary" sx={{display:{xs:'block',sm:'none',md:'none'}, top: 'auto', bottom: 0 }}>
    <Toolbar >
     <Stack direction='row' sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
      <IconButton href='/Home'><HomeIcon/></IconButton>
      <IconButton href='/Profile'><PersonIcon/></IconButton>
      <IconButton href='/Chat'> <CommentIcon/></IconButton>
      <IconButton> <AddPhotoAlternateIcon/> </IconButton>
      <IconButton href='/Edit-profile'> <EditIcon/> </IconButton>
      <IconButton> <LogoutIcon/> </IconButton>
     </Stack>
    </Toolbar>
  </AppBar>
  )
}

export default LowerNavBar