// ,borderRight:'1px solid rgba(0, 0, 0, 0.12)'
import React from 'react'
import { Box,Stack } from '@mui/system'
import { Typography,Divider,Switch } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import NightlightIcon from '@mui/icons-material/Nightlight';
import PostUpload from './PostUpload';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  const navigate = useNavigate()
function logout(e){
  e.preventDefault()
  window.localStorage.removeItem("id")
  navigate('/')
}
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
              <ListItemButton onClick={logout} >
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