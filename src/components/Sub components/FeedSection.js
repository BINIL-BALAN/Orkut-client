import React,{useEffect,useState} from 'react'
import { Box,Stack } from '@mui/system'
import Feed from './Feed'
import RightBar from './RightBar'
import Navbar from './Navbar'
import {getFeed} from '../../servises/services'
import { useSelector } from 'react-redux'
function FeedSection({page}) {
  const [details,setDetails] = useState([])
  useEffect(()=>{
     getFeed().then((result)=>{
      setDetails(result.data);
      console.log(result.data.miniProfile)
     })
  },[])
  
  return (
    <Box flex={4}  sx={{}}>
        <Navbar page={page} 
        image={details.user?.profileImage} 
        name={details.user?.firstName+ " " +details.user?.secondName}
        newMessage={details.user?.newMessage}
        newRequest={details.user?.newRequests}
        miniProfile={details?.miniProfile}
        following={details.following}
        />
        <Stack direction='row'>
            <Feed posts={details?.post} likedPost={details.user?.likedPost}/>
            <RightBar user={details?.user} 
            miniProfiles={details?.miniProfile} 
            posts={details?.userPosts}
            followers={details.followers}
            following={details.following}
            />
        </Stack>
    </Box>
  )
}

export default FeedSection