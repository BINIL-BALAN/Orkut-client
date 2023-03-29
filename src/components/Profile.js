import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/system'
import { Button, Divider,CircularProgress } from '@mui/material'
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '../servises/services'
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import {Alert} from '@mui/material'
import { LAN_IP } from '../constants'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ProfileArea = styled(Stack)({
  width: '100%',
  height: '89.5vh',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '0px' }
})

const PostsView = styled(Stack)({
  width: '100%',
  paddingTop: '2vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

function Profile() {
  const [details, setDetails] = useState({})
  const [post, setPost] = useState([])
  const [open, setOpen] = useState(false);
  const [imgUrl, setimgUrl] = useState('')
  const [loading,setLoading] = useState(false)
  const [statusMsg,setStatusMsg] = useState('')
  const [status,setStatus] = useState(true)
  const [following,setFollowing] = useState([]) 
  const [followers,setFollowers] = useState([])
  const handleClose = (e) => {
    e.preventDefault()
    setOpen(false);
  }

  function handleOpen(e, imgURL) {
    e.preventDefault()
    setimgUrl(imgURL)
    setOpen(true)
  }
  function deleteOnePost(e, id, imageUrl) {
    setLoading(true)
    e.preventDefault()
    const body = {
      id,
      imageUrl
    }
    console.log(body);
    deletePost(body).then((result) => {
        setTimeout(() => {
        setLoading(false)
      }, 2000);

      setTimeout(() => {
        setStatusMsg(result.data.message)
        setStatus(true)
      }, 2000);
    
      setTimeout(() => {
        setStatusMsg('')
        setStatus(true)
        setOpen(false)
        getProfileData().then((result) => {
          setPost(result.data.posts.postedImages)
        })
      }, 4500);
    }).catch((result)=>{
      setTimeout(() => {
        setLoading(false)
      }, 1500);

      setTimeout(() => {
        setStatusMsg(result.data.message)
        setStatus(false)
      }, 2000);
    
      setTimeout(() => {
        setStatusMsg('')
        setStatus(true)
      }, 4500);
    })
  }

  useEffect(() => {
    getProfileData().then((result) => {
      setDetails(result.data.details);
      setPost(result.data.posts.postedImages)
      setFollowers(result.data.followers)
      setFollowing(result.data.following)
      console.log('inside profile', result.data);
    })
  }, [])
  return (
    <Box sx={{ backgroundColor: '#F0F2F5' }}>
      <Stack sx={{ height: '100%' }} direction='row' justifyContent='space-between' spacing={.3}>
        <Box sx={{ width: '20vw' }}><SideBar sx={{ height: 100 }} /></Box >
        <Box flex={4} sx={{}}>
          <Navbar page={'Profile'} image={details.profileImage?.replace('localhost',LAN_IP)} name={details.firstName + " " + details.secondName} 
          newMessage={details.newMessage} 
          newRequest={details.newRequests}
          />
          <Stack direction='column'>
            <ProfileArea direction='column'>
              <Stack direction='row' sx={{ marginTop: '5vh', marginLeft: '10vw' }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    details.profileImage ? details.profileImage?.replace('localhost',LAN_IP) : 'no-dp.avif'
                  }
                  sx={{ width: 200, height: 200 }}
                />
                <Box sx={{ marginLeft: '5vw' }}>
                  <Stack direction='column'>
                    <Typography variant='h6'>{details.firstName ? details.firstName + ' ' + details.secondName : 'user name'}</Typography>
                    <Stack spacing={5} direction='row' marginTop='5vh'>
                      <Button variant='p' fontSize='large'><strong>{post?.length}</strong> &nbsp; Posts</Button>
                      <ViewFollowers text='follow back' following={following} followers={followers} />
                      <ViewFollowing following={following} followers={followers} other={true}/>
                    </Stack>
                    <Stack direction='column' marginTop='5vh'>
                      <Typography component='strong' sx={{ display: 'flex', alignItems: 'center', marginBottom: '3vh' }}>
                        <LocationOnIcon color='error' />  {details.location}
                      </Typography>
                    <Box sx={{border:'1px solid rgba(0, 0, 0, 0.12)',borderRadius:'15px'}}>
                         <CardContent>
                            <Typography variant='p' sx={{ width: '30vw', my: '1vh', display: 'flex', alignItems: 'center' }}>
                              <DescriptionIcon /> Bio :
                            </Typography>
                            <Divider/>
                            <Typography component='p' sx={{ width: '30vw', marginTop: '1vh', marginLeft: '2vw'}}>
                              {details.bio}
                            </Typography>
                         </CardContent>
                     </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>

              <Stack spacing={2} direction='row' marginTop='6vh' sx={{ marginLeft: '12vw' }}>
                <ProfileUpload page='profile' details={details} />
                <Button variant='contained' color='primary' href='/Edit-profile'>Edit &nbsp; <EditIcon /></Button>
              </Stack>
              <Divider sx={{ marginTop: '3vh', width: '66vw', marginLeft: '7vw' }} />

              <PostsView>
                <Typography sx={{ width: '30vw', marginTop: '.5vh', display: 'flex', justifyContent: 'center' }}><GridOnIcon /> POSTS</Typography >
                {
                  post.length > 0 ? (<ImageList sx={{ width: 900, height: '100%' }} cols={3} rowHeight={300} gap={10}>
                    {post?.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          srcSet={item.imageURL?.replace('localhost',LAN_IP)}
                          alt={item.desc}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={item.desc}
                          subtitle={''}
                          actionIcon={
                            <><IconButton
                              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                              aria-label={`info about ${item.desc}`}
                            >
                              {item.likes} <FavoriteIcon color='error' sx={{ marginLeft: '4px' }} />
                            </IconButton>
                              <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.desc}`}
                                onClick={e => handleOpen(e, item.imageURL)}
                              >
                                <DeleteIcon color='white' sx={{ marginLeft: '4px' }} />
                              </IconButton></>
                          }
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginY: '7vh' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}><CameraAltRoundedIcon sx={{ fontSize: '8rem' }} /></Box >
                      <Typography variant="h3" sx={{}}><strong>No post yet</strong></Typography>
                    </Box>
                  )
                }
              </PostsView>
              <Typography sx={{ width: '100%', textAlign: 'center' }}>All &copy; copyright @ Binil.E.B 2023 </Typography>
            </ProfileArea>
          </Stack>
        </Box>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {statusMsg !== '' ?(<Alert color={status? 'success' : 'error'} sx={{marginBottom:'1vh'}}>{statusMsg}</Alert>):''}
          </Typography>
          <Box sx={{ height: '30vh', width: '100%' }}>
            <img src={imgUrl} width='100%' height='100%' />
          </Box>
          <Typography id="modal-modal-description" sx={{ marginTop: '6vh' }}>
            Are you sure want to delete this post
          </Typography>
          <Stack direction='row' sx={{ width: '100%', display: 'flex', justifyContent: 'end', }}>
            <Button color='error' variant='outlined' onClick={e => deleteOnePost(e, details.id, imgUrl)}> yes&nbsp; 
            {loading? (<CircularProgress color='error'/>) : ''}
            </Button>
            <Button color='success' variant='outlined' onClick={e => handleClose(e)} sx={{ marginLeft: '1vw' }}>No</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}


{/* <ImageListItem key={item.imageURL}>
                          <img
                            src={item.imageURL}
                            srcSet={item.imageURL}
                            alt={item.desc}
                            loading="lazy"
                          />
                        </ImageListItem> */}
export default Profile