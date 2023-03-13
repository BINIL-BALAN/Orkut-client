import React from 'react'
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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
function Profile() {
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl1TQtDYX5h2D_zEWAcR7uZge3w8w-BVjd-4QqFc4ZncS05EcIP7oVgvJWHY7ETxPp8Y&usqp=CAU"
                  sx={{ width: 200, height: 200 }}
                />
                <Box sx={{ marginLeft: '5vw' }}>
                  <Stack direction='column'>
                    <Typography variant='h6'>user name</Typography>
                    <Stack spacing={5} direction='row' marginTop='5vh'>
                      <Button variant='p' fontSize='large'><strong>{0}</strong> Posts</Button>
                      <ViewFollowers/>
                       <ViewFollowing/>
                    </Stack>
                    <Stack direction='column' marginTop='5vh'>
                      <Typography component='strong'>firstname secondname</Typography>
                      <Typography component='p' sx={{ width: '30vw',marginTop:'2vh' }}>{'Bio here'}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>

              <Stack spacing={2} direction='row' marginTop='6vh' sx={{ marginLeft: '12vw' }}>
                <ProfileUpload page='profile'/>
                <Button variant='contained' color='primary' href='/Edit-profile'>Edit &nbsp; <EditIcon /></Button>
              </Stack>
              <Divider sx={{ marginTop: '3vh',width:'66vw', marginLeft:'7vw'}} />

              <PostsView>
                    POST
                    <ImageList sx={{ width: 900,height:'100%'}} cols={3} rowHeight={300} gap={10}>
                      {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
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