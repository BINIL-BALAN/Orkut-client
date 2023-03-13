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
const ListButton = styled(ListItemButton)({
    display:'flex',
    justifyContent:'center',
    marginTop:'2vh'
})
function SidebarSmall() {
  const [open,setOpen] = useState(false)
  function handleOPen(){
    setOpen(true)
  }
  return (
    <Box sx={{display:{xs:'none',sm:'block'},position:'relative',backgroundColor:'#F0F2F5'}}>
      <Box sx={{textAlign:'center',marginTop:'2vh'}}>
      <CommentIcon color='primary'/>
      </Box>
       <Stack direction='column' sx={{marginTop:'2vh'}}>
       <List>
          <ListItem disablePadding>
            <ListButton href='/Home'>
                <HomeIcon />
            </ListButton>
          </ListItem>
          <ListItem disablePadding>
            <ListButton href='/Profile'>
            
                <PersonIcon />
              
            </ListButton>
          </ListItem>
          <ListItem disablePadding>
            <ListButton href='/Chat'>
            
                <CommentIcon />
              
            </ListButton>
          </ListItem>
          <ListItem disablePadding>
            <PostUpload page={'message'}/>
          </ListItem>
          <ListItem disablePadding>
            <ListButton href='/Edit-profile'>
            
                <EditIcon />
              
            </ListButton>
          </ListItem>
          <ListItem disablePadding>
            <ListButton>
            
                <LogoutIcon />
              
            </ListButton>
          </ListItem>
        </List>
       </Stack>
       
      </Box>
  )
}

export default SidebarSmall