import React,{useEffect,useState} from 'react'
import { Box,Stack } from '@mui/system'
import Feed from './Feed'
import RightBar from './RightBar'
import Navbar from './Navbar'
import {getFeed} from '../../servises/services'
function FeedSection({page}) {
  const [details,setDetails] = useState([])
  const [newMessages,setNewMessages] = useState([])
  useEffect(()=>{
     getFeed().then((result)=>{
      setDetails(result.data);
      setNewMessages(result.data.user.newMessage)
      console.log('new messages',result.data.user?.newMessage)
     })
  },[])
  
  return (
    <Box flex={4}  bgcolor={'background.default'}>
        <Navbar page={page} 
        image={details.user?.profileImage} 
        name={details.user?.firstName+ " " +details.user?.secondName}
        newMessage={newMessages}
        details={details}
        miniProfile={details?.miniProfile}
        following={details.following}
        notificationStatus={true}
        />
        <Stack direction='row'>
            <Feed miniProfiles={details?.miniProfile} posts={details?.post} likedPost={details.user?.likedPost} profileImage={details.user?.profileImage} name={details.user?.firstName+ " " +details.user?.secondName}/>
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