import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Stack } from '@mui/material';
import styled from '@emotion/styled';
import ViewFollowers from './ViewFollowers'
import ViewFollowing from './ViewFollowing'
const ProfileImage = styled(CardMedia)({
    width: '79%',
    height: '41vh',
    borderRadius:'50%',
    marginLeft:'2.2vw'
})

const ProfileArea = styled(Card)({
    border: 'none',
    boxShadow: 'none',
    cursor:'pointer'
})
function ProfileCard({ imageURL, desc,username,posts,followers,following }) {
    return (
        <>
            <ProfileArea sx={{ width: '25vw', marginTop: '1.5vh', backgroundColor: '#F0F2F5' }}>
                <CardActionArea>
                    <ProfileImage
                        component="img"
                        image={imageURL? imageURL : 'no-dp.avif'}
                        alt="Profile image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {username}
                        </Typography>
                        <Typography gutterBottom variant="body2" marginTop='6vh'>
                            <strong>Bio</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" marginTop='1vh'>
                            {desc ? desc : 'No description'}
                        </Typography>
                        <Stack direction='row' spacing={0} sx={{ marginTop: '6vh',width:'40vw'}}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                           <strong> {posts?.length ? posts?.length : 0 } </strong> &nbsp; <strong>POSTS</strong>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <ViewFollowers followers={followers}/>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <ViewFollowing following={following}/>
                            </Box>
                        </Stack >
                    </CardContent>
                </CardActionArea>
            </ProfileArea>
        </>
    )
}

export default ProfileCard