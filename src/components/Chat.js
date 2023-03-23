import React,{useState,useEffect} from 'react'
import Contacts from './Sub components/Contacts'
import SidebarSmall from './Sub components/SidebarSmall'
import { Typography, AppBar, Toolbar, Stack, Box, Avatar } from '@mui/material';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import SendMsg from './Sub components/SendMsg';
import ReceiveMsg from './Sub components/ReceiveMsg';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import io from 'socket.io-client'
const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between'

})

function Chat() {
  const [socket, setSocket] = useState()
  const [sendMsg,setSendMsg] = useState("")
  const [receiveMsg,setReceiveMsg] = useState('')
  useEffect(() => {
    const newSocket = io('http://localhost:5000/')
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

function send(e){
    e.preventDefault()
    socket?.emit('send-message',sendMsg)
}
socket?.on('receive-message',(message)=>{
  setReceiveMsg(message)
})
  function handleMsg(e){
    setSendMsg(e.target.value)
  }

  return (
    <Box sx={{ height: '100vh' ,backgroundColor:'#F0F2F5' }}>
      <Stack  direction='row'>
        <Stack flex={1} direction='column'>
          <SidebarSmall />
        </Stack>
        <Stack p={2} flex={5} direction='column' sx={{borderRight:'1px solid rgba(0, 0, 0, 0.12)',borderLeft:'1px solid rgba(0, 0, 0, 0.12)'}}>
          <Typography variant='h5' color='primary'>
            Chat
          </Typography>
          <Typography marginTop='3vh'>
            Contacts
          </Typography>
          <Box>
            <Contacts />
          </Box>
        </Stack>
        <Stack flex={9} direction='column' sx={{ backgroundColor: '#F0F2F5', height: '100vh' }}>
          <AppBar position='sticky'>
            <StyledToolBar p={1.5}>
              <Typography sx={{ display: { md: 'none' } }} variant='h6'>  Orkut</Typography>
              <Stack sx={{ display: { xs: 'none', sm: 'none', md: "flex" }, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }} direction='row'>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Stack direction='column'>
                  <Typography variant='h6' marginLeft={2}>user</Typography>
                  <Typography marginLeft={2}>online</Typography>
                </Stack >
              </Stack>
              <Typography color='white' variant='h5'>Orkut</Typography>
              <Stack direction='row' spacing={1}>
                <Tooltip title="Delete all chats" sx={{ color: 'white' }}>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete all chats" sx={{ color: 'white' }}>
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </StyledToolBar>
          </AppBar >

          <Box sx={{ maxHeight: '79vh', overflowY: 'scroll', '&::-webkit-scrollbar': { width: '0px' } }}>
            hello
            {receiveMsg}
          </Box>
          <AppBar position="fixed"  sx={{ display: 'flex', width: '58.5vw', top: 'auto', bottom: 0 }}>
            <Toolbar>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700 ,borderRadius:'25px'}}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Type....."
                  inputProps={{ 'aria-label': 'search google maps' }}
                  value={sendMsg}
                  onChange={handleMsg}
                />
                <IconButton onClick={send} type="button" sx={{ p: '10px' }} aria-label="search">
                  <SendIcon />
                </IconButton>
              </Paper>
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <EmojiEmotionsIcon />
                </IconButton>
            </Toolbar>
          </AppBar>
        </Stack>
      </Stack>
    </Box>
  )
}

{/* <SendMsg />
            <ReceiveMsg />
            <SendMsg />
            <SendMsg />
            <SendMsg />
            <ReceiveMsg />
            <ReceiveMsg />
            <ReceiveMsg />
            <ReceiveMsg /> */}

export default Chat