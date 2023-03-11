import React from 'react'
import {Box,Stack} from "@mui/material"
import Paper from '@mui/material/Paper';
import LowerNavBar from './LowerNavBar'
import Post from './Post'
import QuatsWrite from './QuatsWrite';

function Feed() {
  return (
 
      <Box flex={4} sx={{overflowY:'scroll',maxHeight:'89.7vh','&::-webkit-scrollbar':{width:'0px'}}}>
       <Stack direction='column' sx={{backgroundColor:'#F0F2F5'}} >
       <Box sx={{display:'flex',justifyContent:'center',marginTop:'3vh'}}><QuatsWrite/></Box >
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <LowerNavBar/>
       </Stack >
      
      </Box>
      
   
  )
}

export default Feed