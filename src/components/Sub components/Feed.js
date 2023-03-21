import React from 'react'
import {Box,Stack, Typography} from "@mui/material"
import LowerNavBar from './LowerNavBar'
import Post from './Post'
import QuatsWrite from './QuatsWrite';

function Feed({posts,likedPost}) {
  return (
 
      <Box flex={4} sx={{overflowY:'scroll',maxHeight:'89.7vh','&::-webkit-scrollbar':{width:'0px'}}}>
       <Stack direction='column' sx={{backgroundColor:'#F0F2F5'}} >
       <Box sx={{display:'flex',justifyContent:'center',marginTop:'3vh'}}><QuatsWrite/></Box >
          {posts?.length > 0 ?
            posts?.map(post => (
              <Post imageURL={post.imageURL} 
              date={post.date} 
              username={post.firstName+  ' ' + post.secondName} 
              desc={post.desc}
              profileImage={post.profileImage}
              id={post.id}
              likes={post.likes}
              likedPost={likedPost}
              />
            )) : (<Typography variant='h5'>No other posts</Typography>)
          }
          <LowerNavBar/>
       </Stack >
      
      </Box>
      
   
  )
}

export default Feed