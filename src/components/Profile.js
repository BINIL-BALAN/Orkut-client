import React,{useEffect,useState} from 'react'
import { Box, Stack } from '@mui/system'
import { Button, Divider } from '@mui/material'
import SideBar from './Sub components/Sidebar'
import Navbar from './Sub components/Navbar'
import styled from '@emotion/styled'
import { Avatar, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ProfileUpload from './Sub components/PostUpload'
import ViewFollowers from './Sub components/ViewFollowers'
import ViewFollowing from './Sub components/ViewFollowing'
import { getProfileData } from '../servises/services'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import GridOnIcon from '@mui/icons-material/GridOn';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
const ProfileArea = styled(Stack)({
  width: '100%',
  height: '89.5vh',
  overflowY:'scroll',
  '&::-webkit-scrollbar':{width:'0px'}
})

const PostsView = styled(Stack)({
  width: '100%',
  paddingTop: '2vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
})

function Profile() {
  const [details,setDetails] = useState({})
  const [post,setPost] = useState([])
useEffect(()=>{
  getProfileData().then((result)=>{
    setDetails(result.data.details);
    setPost(result.data.posts)
    console.log('inside profile',result.data.posts[0]);
  })
},[])
  return (
    <Box sx={{ backgroundColor: '#F0F2F5' }}>
      <Stack sx={{ height: '100%' }} direction='row' justifyContent='space-between' spacing={.3}>
        <Box sx={{ width: '20vw' }}><SideBar sx={{ height: 100 }} /></Box >
        <Box flex={4} sx={{}}>
          <Navbar page={'Profile'} />
          <Stack direction='column'>
            <ProfileArea direction='column'>
              <Stack direction='row' sx={{ marginTop: '5vh', marginLeft: '10vw' }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    details.profileImage? details.profileImage : 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
                  }
                  sx={{ width: 200, height: 200 }}
                />
                <Box sx={{ marginLeft: '5vw' }}>
                  <Stack direction='column'>
                    <Typography variant='h6'>{details.firstName ? details.firstName + ' ' + details.secondName : 'user name'}</Typography>
                    <Stack spacing={5} direction='row' marginTop='5vh'>
                      <Button variant='p' fontSize='large'><strong>{details.postsCount}</strong> &nbsp; Posts</Button>
                      <ViewFollowers count={details.followersCount}/>
                       <ViewFollowing count={details.followingCount}/>
                    </Stack>
                    <Stack direction='column' marginTop='5vh'>
                      <Typography component='strong' sx={{display:'flex',alignItems:'center',marginBottom:'3vh'}}>
                        <LocationOnIcon color='error'/>  {details.location}
                      </Typography>
                      <Typography variant='p' sx={{ width: '30vw',marginTop:'.5vh',display:'flex',alignItems:'center' }}>
                        <DescriptionIcon/> Bio
                      </Typography>
                      <Typography component='p' sx={{ width: '30vw',marginTop:'1vh',marginLeft:'2vw' }}>
                        {details.bio} 
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>

              <Stack spacing={2} direction='row' marginTop='6vh' sx={{ marginLeft: '12vw' }}>
                <ProfileUpload page='profile' details={details}/>
                <Button variant='contained' color='primary' href='/Edit-profile'>Edit &nbsp; <EditIcon /></Button>
              </Stack>
              <Divider sx={{ marginTop: '3vh',width:'66vw', marginLeft:'7vw'}} />

              <PostsView>
                   <Typography sx={{ width: '30vw',marginTop:'.5vh',display:'flex',justifyContent:'center'}}><GridOnIcon/> POSTS</Typography >
                    {
                    post ? (<ImageList sx={{ width: 900,height:'100%'}} cols={3} rowHeight={300} gap={10}>
                      {post?.map((item) => (
                        <ImageListItem key={item.imageURL}>
                          <img
                            src={item.imageURL}
                            srcSet={item.imageURL}
                            alt={item.desc}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>) : (
                    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginY:'7vh'}}>
                      <Box sx={{display:'flex',justifyContent:'center'}}><CameraAltRoundedIcon sx={{fontSize:'8rem'}}/></Box >
                      <Typography variant="h3" sx={{}}><strong>No post yet</strong></Typography>
                    </Box>
                    )
                    }
              </PostsView>
              <Typography sx={{width:'100%',textAlign:'center'}}>All &copy; copyright @ Binil.E.B 2023 </Typography>
            </ProfileArea>
          </Stack>
        </Box>
      </Stack>

      
    </Box>
  )
}

export default Profile