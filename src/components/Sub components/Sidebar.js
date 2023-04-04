// ,borderRight:'1px solid rgba(0, 0, 0, 0.12)'
import React,{useState} from 'react'
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
import { UNSAFE_DataRouterStateContext, useNavigate } from 'react-router-dom';
import { userLogout } from '../../servises/services';
import {CircularProgress} from '@mui/material';
function Sidebar({mode,setMode}) {
  const navigate = useNavigate()
  const [isChecked,setIsChecked] = useState(false)
  const [loading,setLoading] = useState(false)
function logout(e){
  setLoading(true)
  e.preventDefault()
  userLogout().then((result)=>{
  setTimeout(()=>{
    window.localStorage.removeItem("id")
    window.localStorage.removeItem("mode")
    setLoading(false)
    navigate('/')
  },2000)
  })
}

function nightModeSetting(e){
  e.preventDefault()
  setIsChecked(!isChecked)
  console.log('clicked')
}
  return (
    <>
      <Box sx={{display:{xs:'none',sm:'block'},position:'relative'}} p={2} flex={1} bgcolor={"background.default"} color={'text.primary'}>
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
                {loading? <CircularProgress/> : ''}
              </ListItemButton>
            </ListItem>
           <Divider/>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NightlightIcon />
                </ListItemIcon>
                <Switch checked={window.localStorage.getItem('mode') === 'dark' ? true : false} onChange={e=>{setMode(mode === 'light' ? "dark" : "light");
                 window.localStorage.setItem('mode',window.localStorage.getItem('mode') === 'light' ? 'dark' : 'light' )}}/>
              </ListItemButton>
            </ListItem>
          </List>
         </Stack>
        </Box>
    </>
  )
}
//setMode(mode === 'light' ? "dark" : "light")
export default Sidebar