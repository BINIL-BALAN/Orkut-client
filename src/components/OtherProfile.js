import React, { useState, useEffect } from 'react'
import { Box, Stack } from '@mui/system'
import { Button, Divider, CircularProgress, ThemeProvider } from '@mui/material'
import SideBar from './Sub components/Sidebar'
import Navbar from './Sub components/Navbar'
import styled from '@emotion/styled'
import { Avatar, Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ViewFollowers from './Sub components/ViewFollowers'
import ViewFollowing from './Sub components/ViewFollowing'
import { getOthersProfileData } from '../servises/services'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import GridOnIcon from '@mui/icons-material/GridOn';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom'
import Follow from './Sub components/Follow'
import Unfollow from './Sub components/Unfollow'
import { LAN_IP } from '../constants'
import CardContent from '@mui/material/CardContent';
import {createTheme} from '@mui/material'
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

function OtherProfile() {
    const [details, setDetails] = useState({})
    const [post, setPost] = useState([])
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [id, setId] = useState()
    const params = useParams()
    const [mode, setMode] = useState(window.localStorage.getItem("mode") || 'light')
    const darkTheme = createTheme({
        palette: {
          mode: mode
        }
      })
    useEffect(() => {
        getOthersProfileData(params.id).then((result) => {
            setDetails(result.data.details)
            setPost(result.data.posts.postedImages)
            setFollowers(result.data.followers)
            setFollowing(result.data.following)
            setId(window.localStorage.getItem("id"))
        })
    }, [])
    console.log(details);
    return (
       <ThemeProvider theme={darkTheme}>
            <Box bgcolor='background.default' color={'text.primary'}>
                <Stack sx={{ height: '100%' }} direction='row' justifyContent='space-between' spacing={.3}>
                    <Box sx={{ width: '20vw' }}><SideBar mode={mode} setMode={setMode} sx={{ height: 100 }} /></Box >
                    <Box flex={4} sx={{}}>
                        <Navbar page={'Profile'} image={details.profileImage} name={details.firstName + " " + details.secondName}
                            newMessage={details.newMessage}
                            notification={false}
                        />
                        <Stack direction='column'>
                            <ProfileArea direction='column'>
                                <Stack direction='row' sx={{ marginTop: '5vh', marginLeft: '10vw' }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={
                                            details.profileImage ? details.profileImage?.replace('localhost', LAN_IP) : 'no-dp.avif'
                                        }
                                        sx={{ width: 200, height: 200 }}
                                    />
                                    <Box sx={{ marginLeft: '5vw' }}>
                                        <Stack direction='column'>
                                            <Typography variant='h6'>{details.firstName ? details.firstName + ' ' + details.secondName : 'user name'}</Typography>
                                            <Stack spacing={5} direction='row' marginTop='5vh'>
                                                <Button variant='p' fontSize='large'><strong>{post?.length}</strong> &nbsp; Posts</Button>
                                                <ViewFollowers type={false} followers={followers} />
                                                <ViewFollowing type={false} following={following} other={false} />
                                            </Stack>
                                            <Stack direction='column' marginTop='5vh'>
                                                <Typography component='strong' sx={{ display: 'flex', alignItems: 'center', marginBottom: '3vh' }}>
                                                    <LocationOnIcon color='error' />  {details.location}
                                                </Typography>
                                                <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '15px' }}>
                                                    <CardContent>
                                                        <Typography variant='p' sx={{ width: '30vw', my: '1vh', display: 'flex', alignItems: 'center' }}>
                                                            <DescriptionIcon /> Bio :
                                                        </Typography>
                                                        <Divider />
                                                        <Typography component='p' sx={{ width: '30vw', marginTop: '1vh', marginLeft: '2vw' }}>
                                                            {details.bio}
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Stack spacing={2} direction='row' marginTop='6vh' sx={{ marginLeft: '12vw' }}>
    
                                    {followers.includes(followers.find(user => user.id === id)) ? (<Unfollow id={params.id} type='outlined' />) : (<Follow requestId={params.id} type='outlined' text={'follow'} />)}
    
                                    <Button variant='contained' color='primary' href='/Chat'>message</Button>
                                </Stack>
                                <Divider sx={{ marginTop: '3vh', width: '66vw', marginLeft: '7vw' }} />
    
                                <PostsView>
                                    <Typography sx={{ width: '30vw', marginTop: '.5vh', display: 'flex', justifyContent: 'center' }}><GridOnIcon /> POSTS</Typography >
                                    {
                                        post?.length > 0 ? (<ImageList sx={{ width: 900, height: '100%' }} cols={3} rowHeight={300} gap={10}>
                                            {post?.map((item) => (
                                                <ImageListItem key={item.img}>
                                                    <img
                                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                                        srcSet={item.imageURL?.replace('localhost', LAN_IP)}
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
            </Box>
       </ThemeProvider>
    )
}

export default OtherProfile