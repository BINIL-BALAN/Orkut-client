// ,borderRight:'1px solid rgba(0, 0, 0, 0.12)'
import React,{useState} from 'react'
import { Box,Stack } from '@mui/system'
import { Typography,Divider,Switch, Button  } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import PostUpload from './PostUpload';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Sidebar() {

  return (
    <>
      <Box sx={{display:{xs:'none',sm:'block'},position:'relative',backgroundColor:'#F0F2F5'}} p={2} flex={1}>
        <Typography color='primary' variant='h5' component='strong'>
            <strong>Orkut</strong>
        </Typography>
         <Stack direction='column' sx={{marginTop:'2vh'}}>
         <List>
            <ListItem disablePadding>
              <ListItemButton href='/Home'>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
                  <ListItemButton href='/Profile'>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Porfile" />
                  </ListItemButton>
            </ListItem>
         
            <ListItem disablePadding>
              <ListItemButton href='/chat'>
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <PostUpload page={'home'}/>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/Edit-profile'>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/'>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
           <Divider/>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NightlightIcon />
                </ListItemIcon>
                <Switch />
              </ListItemButton>
            </ListItem>
          </List>
         </Stack>
        </Box>
    </>
  )
}

export default Sidebar