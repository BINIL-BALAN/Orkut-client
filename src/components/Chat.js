import React, { useState, useEffect } from 'react'
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
import { getContacts } from '../servises/services';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { LAN_IP } from '../constants';
const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between'

})

const allChats = [
  {
    
    id: "810175d34c41234567000",
    chats:[
        {
          send:true,
          message:'hello'
        },
        {
          send:false,
          message:'haii'
        },
        {
           send:true,
          message:'how ar you'
        },
        {
           send:false,
          message:'fine'
        },
         {
          send:false,
          message:'how are you ?'
        },
        {
           send:true,
          message:'fine'
        }
    ]
  },
  {
    id:"c5bc838b7961234567000",
    chats:[
      {
        send:true,
        message:'hello'
      },
      {
        send:false,
        message:'haii'
      },
      {
         send:true,
        message:'how ar you'
      }
    ]
  },
  {
    id:"edaa089a6e61234567000",
    chats:[
      {
        send:true,
        message:'hello'
      },
      {
        send:false,
        message:'haii'
      },
      {
         send:true,
        message:'how ar you'
      }
    ]
  },
  {
    id:"f260b3196311234567000",
    chats:[
      {
        send:true,
       message:'how ar you'
     },
     {
        send:false,
       message:'fine'
     },
      {
       send:false,
       message:'how are you ?'
     },
     {
        send:true,
       message:'fine'
     }
    ]
  }
]

function Chat() {
  
  const [userId, setUserId] = useState(window.localStorage.getItem("id"))
  const [receiverName,setReceiverName] = useState('')
  const [chatsBuffer, setChatBuffer] = useState([])
  const [key, setKey] = useState()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState()
  const [contacts, setContacts] = useState()
  const [socket, setSocket] = useState()
  const [sendMsg, setSendMsg] = useState("")
  const [allMessages, setAllMessages] = useState([])
  useEffect(() => {
    getContacts().then((result) => {
      setContacts(result.data?.contacts) 
      setAllMessages(result.data?.allMessages)
    })
    const newSocket = io(`http://${LAN_IP}:5000/`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  // connecting to friend
  socket?.on('join-key', (key) => {
    if (userId === key) {
      socket.emit('join', key)
    }
  })


  // opening connection to othe user
 function connect(e, key,image) {
    e.preventDefault()
    setKey(key)
    setReceiverName(image)
    socket?.emit('join', key)
    setUser(contacts.find(contact => contact.id === key));
     const chats = allMessages.find(user => user.id === key)?.messages
     setChatBuffer(chats);
    setOpen(true)
   
  }

  //receiving a message from a friend
  socket?.on('receive-message',(messagebody)=>{
  // let message =  {
  //    send:false,
  //    message:messagebody.message
  // } 
  setChatBuffer([...chatsBuffer,messagebody])
 })

  //sending a message to frient
  function send(e) {
    e.preventDefault()
    const messageBody = {
      from: userId,
      to:key,
      message: sendMsg,
    }
    socket?.emit('send-message', messageBody, key)
   const newMessage = {
    send:true,
    message:sendMsg
  }
 setChatBuffer([...chatsBuffer,newMessage])
  }

  function handleMsg(e) {
    setSendMsg(e.target.value)
  }

  return (
    <Box sx={{ height: '100vh', backgroundColor: '#F0F2F5' }}>
      <Stack direction='row'>
        <Stack flex={1} direction='column'>
          <SidebarSmall />
        </Stack>
        <Stack p={2} flex={4} direction='column' sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', borderLeft: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Typography variant='h5' color='primary'>
            Chat
          </Typography>
          <Typography marginTop='3vh'>
            Contacts
          </Typography>
          <Box>
            <List sx={{ width: '100%' }}>
              {
                contacts?.map(contact => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemButton onClick={e => connect(e, contact.id,contact.profileImage)}>
                        <ListItemAvatar>
                          <Avatar alt={contact.firstName} src={contact.profileImage?.replace('localhost',LAN_IP)} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={contact.firstName + " " + contact.secondName}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                              </Typography>
                              
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                ))
              }
            </List>
          </Box>
        </Stack>

        {/* message display section */}
        <Stack flex={9} direction='column' sx={{ backgroundColor: '#F0F2F5', height: '100vh' }}>
          {
            open ? (
              <>
                <AppBar position='sticky'>
                  <StyledToolBar p={1.5}>
                    <Typography sx={{ display: { md: 'none' } }} variant='h6'>  Orkut</Typography>
                    <Stack sx={{ display: { xs: 'none', sm: 'none', md: "flex" }, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }} direction='row'>
                      <Avatar alt={user?.firstName} src={user?.profileImage?.replace('localhost',LAN_IP)} />
                      <Stack direction='column'>
                        <Typography variant='h6' marginLeft={2}>{user?.firstName + " " + user?.secondName}</Typography>
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

                <Box sx={{ maxHeight: '79vh',overflowY: 'scroll', '&::-webkit-scrollbar': { width: '0px' } }}>
          
                 {
                  chatsBuffer?.map(chat => (
                    <> 
                      {chat.send ? <SendMsg message={chat.message}/> : <ReceiveMsg message={chat.message} image={receiverName}/>}
                    </>
                  ))
                 }
                </Box>
                <AppBar position="fixed" sx={{ display: 'flex', width: '62.5vw', top: 'auto', bottom: 0 }}>
                  <Toolbar>
                    <Paper
                      component="form"
                      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700, borderRadius: '25px' }}
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
              </>) : (
              <Box sx={{ height: '99%' }}>
                  <AppBar position='sticky'>
                  <StyledToolBar p={1.5} sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{ display: { md: 'none' } }} variant='h6'>  Orkut</Typography> 
                    <Typography color='white' variant='h5'>Orkut</Typography>
                  </StyledToolBar>
                </AppBar >
                <img width='100%' height='100%' src='chat.gif'/>

              </Box>
            )
          }
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
            <ReceiveMsg /> 
          width: '58.5vw'
          */}

export default Chat