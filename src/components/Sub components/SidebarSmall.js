import React,{useState} from 'react'
import { Box,Stack } from '@mui/system'
import { Typography,Divider,Switch  } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from '@emotion/styled';
import PostUpload from './PostUpload';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import { userLogout } from '../../servises/services';
const ListButton = styled(ListItemButton)({
    display:'flex',
    justifyContent:'center',
    marginTop:'2vh'
})
function SidebarSmall() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
function logout(e){
  setLoading(true)
  e.preventDefault()
  userLogout().then((result)=>{
    window.localStorage.removeItem("id")
    window.localStorage.removeItem("mode")
    setTimeout(() => {
      navigate('/')
    }, 2000);
  })
  
}
  return (
    <Box sx={{display:{xs:'none',sm:'block'},position:'relative',backgroundColor:'#F0F2F5'}}>
      <Box sx={{textAlign:'center',marginTop:'2vh'}}>
      <CommentIcon color='primary'/>
      </Box>
       <Stack direction='column' sx={{marginTop:'2vh'}}>
       <List>
          <ListItem disablePadding>
          <Tooltip title='Home' placement='right'>
              <ListButton href='/Home'>
                  <HomeIcon />
              </ListButton>
          </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title='View profile' placement='right'>
              <ListButton href='/Profile'>
                  <PersonIcon />
              </ListButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title='Messages' placement='right'>
              <ListButton href='/Chat'>
                  <CommentIcon />
              </ListButton>
            </Tooltip>
          </ListItem>
         <Tooltip title='Upload post' placement='right'>
            <ListItem disablePadding>
              <PostUpload page={'message'}/>
            </ListItem>
         </Tooltip >
          <ListItem disablePadding>
            <Tooltip title='Edit profile' placement='right'>
              <ListButton href='/Edit-profile'>
                  <EditIcon />
              </ListButton>
            </Tooltip >
          </ListItem>
          <ListItem disablePadding>
           <Tooltip title='Log out' placement='right'>
              <ListButton onClick={logout}>
                  <LogoutIcon /> &nbsp; {loading ? (<CircularProgress/>) : ''}
              </ListButton>
           </Tooltip>
          </ListItem>
        </List>
       </Stack>
       
      </Box>
  )
}

export default SidebarSmall