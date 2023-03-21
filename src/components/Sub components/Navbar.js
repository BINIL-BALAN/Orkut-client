import React from 'react'
import {Typography,AppBar,Toolbar,Stack,InputBase,Box,Badge,Avatar } from '@mui/material';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import { theme } from '../../theme/theme';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
})

const Search = styled("div")(({ theme }) => ({
  color:'white',
  backgroundColor: "white",
  padding: "0px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}))
const IconBox = styled(Box)(({ theme }) => ({
  marginRight:'5vw',
  display:'flex',
  gap:'20px',
  padding: "0px",
  borderRadius: theme.shape.borderRadius
}))

const Icons = styled(Box)(({theme})=>({
  display:'none',
  gap:"20px",
  alignItems:'center',
  [theme.breakpoints.up('sm')]:{
    display:'flex'
  }
}))
const UserBox = styled(Box)(({theme})=>({
  display:'flex',
  alignItems:"center",
  gap:'10px',
   
}))


function Navbar({page,image,name,newMessage,newRequest}) {
  return (
<AppBar position='sticky'>
      <StyledToolBar p={1.5}>
            <Typography sx={{display:{md:'none'}}} variant='h6'>  Orkut</Typography>
          <Stack sx={{display:{xs:'none',sm:'none',md:"flex"},justifyContent:'center',alignItems:'center',fontWeight:'bold'}} direction='row'>
                  {page === 'Home'?(<HomeIcon sx={{marginRight:'5px'}}/>) : (<PersonIcon sx={{marginRight:'5px'}}/>)}{page}
          </Stack>
          <Search sx={{display:{xs:'none',sm:'block'}}}><InputBase placeholder='search...' /></Search>

          <IconBox>
         <Icons>
            <Badge badgeContent={newMessage?.length} color='error'>
              <MailIcon />
            </Badge>
            <Badge badgeContent={newRequest?.length} color='error'>
              <NotificationsIcon />
            </Badge> 
         </Icons>
         <UserBox>
          <Avatar src={image? image : 'no-dp.avif'}/>
          <Typography>{name ? name : 'user'}</Typography>
         </UserBox>
          </IconBox>
      </StyledToolBar>
</AppBar >
  )
}

export default Navbar