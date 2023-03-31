import React,{useState,useEffect} from 'react'
import { Typography, AppBar, Toolbar, Stack, Box, Badge, Avatar,ListItemButton,IconButton } from '@mui/material';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import { theme } from '../../theme/theme';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Follow from './Follow';
import { LAN_IP } from '../../constants';
import io from 'socket.io-client'

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between"
})

const Search = styled("div")(({ theme }) => ({
  color: 'white',
  backgroundColor: "white",
  padding: "0px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}))
const IconBox = styled(Box)(({ theme }) => ({
  marginRight: '5vw',
  display: 'flex',
  gap: '20px',
  padding: "0px",
  borderRadius: theme.shape.borderRadius
}))

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  gap: "20px",
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'flex'
  }
}))
const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: "center",
  gap: '10px',

}))


function Navbar({ page, image, name, newMessage, newRequest,miniProfile,following }) {
  const [socket, setSocket] = useState()
  const [notification,setNotification] = useState([])
  const [id,setId] = useState(window.localStorage.getItem("id"))
  useEffect(()=>{
    setNotification(newMessage)
    const newSocket = io(`http://${LAN_IP}:5000/`)
    setSocket(newSocket)
    return () => newSocket.close()
  },[setSocket])

  socket?.emit('new-messages', id)
  socket?.on('get-newChats', (newMsg) => {
  console.log('default new message',notification)
  console.log('default new message props',newMessage)
  console.log('reat time newMessage',newMsg);
    setNotification(newMsg);
  })

  return (
    <AppBar position='sticky'>
      <StyledToolBar p={1.5}>
        <Typography sx={{ display: { md: 'none' } }} variant='h6'>  Orkut</Typography>
        <Stack sx={{ display: { xs: 'none', sm: 'none', md: "flex" }, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }} direction='row'>
          {page === 'Home' ? (<HomeIcon sx={{ marginRight: '5px' }} />) : (<PersonIcon sx={{ marginRight: '5px' }} />)}{page}
        </Stack>
        {/* <Search sx={{display:{xs:'none',sm:'block'}}}><InputBase placeholder='search...' /></Search> */}

{ page === 'Home' ? ( <>
       <Autocomplete
      id="country-select-demo"
      size='small'
      sx={{ width: 500,padding:'0px',borderRadius:'10px'}}
      options={miniProfile}
      autoHighlight
      freeSolo
      getOptionLabel={(option) => option.firstName}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <ListItemButton href={`/view-other/${option.id}`}>
            <img
              style={{borderRadius:'40px',marginRight:'1vw'}}
              loading="lazy"
              width="40"
              height="40"
              src={option.profileImage.replace('localhost',LAN_IP)}
              srcSet={option.profileImage.replace('localhost',LAN_IP)}
              alt=""
            />
            
            {option.firstName} {option.secondName}  
          </ListItemButton>
          {following.includes(following.find(user => user.id === option.id)) ? "following" :  <Follow text="Follow" requestId={option.id}/> }
        </Box>
      )}
      renderInput={(params) => (
        <TextField
         size="small"
        sx={{backgroundColor:'white',padding:'0px',borderRadius:'10px'}}
          {...params}
          label="Search..."
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
       </>) : (<Typography variant='h5'>Orkut</Typography>)}

        <IconBox>
          <Icons>
            <IconButton sx={{color:'white'}} href='/Chat'>
            <Badge badgeContent={notification?.length} color='error'>
              <MailIcon />
            </Badge>
            </IconButton>
            <Badge badgeContent={newRequest?.length} color='error'>
              <NotificationsIcon />
            </Badge>
          </Icons>
          <UserBox>
            <Avatar src={image ? image.replace('localhost', LAN_IP) : 'no-dp.avif'} />
            <Typography>{name ? name : 'user'}</Typography>
          </UserBox>
        </IconBox>
      </StyledToolBar>
    </AppBar >
  )
}

export default Navbar