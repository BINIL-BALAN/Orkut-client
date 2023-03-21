import React from 'react'
import { Box, Button } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ProfileCard from './ProfileCard';
import styled from '@emotion/styled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListItemButton from '@mui/material/ListItemButton';

const RightSideBar = styled(Box)({
  width: '100%',
  marginTop: '',
  maxWidth: 360,
  maxHeight: '84.6vh',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { width: '0px' }
})
function RightBar({ user, miniProfiles, posts }) {
  function viewProfile(e, id) {
    e.preventDefault()
      console.log(id);
  }
  return (
    <RightSideBar p={2} flex={2.1} sx={{ display: { xs: 'none', sm: 'block' }, backgroundColor: '#F0F2F5' }}>
      <Box sx={{ width: '23vw', marginLeft: '1vw' }}>
        <ProfileCard imageURL={user?.profileImage}
          desc={user?.bio}
          username={user?.firstName + ' ' + user?.secondName}
          posts={posts?.postedImages}
          followers={user?.followers}
          following={user?.following}
        />
      </Box >
      <Divider />
      <Typography sx={{ marginTop: '1vh' }}>Suggested for you</Typography>
      <List sx={{ marginTop: '1vh' }}>
        {
          miniProfiles?.map(profile => (
           <>
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={profile?.firstName} src={profile?.profileImage !== '' ? profile?.profileImage : 'no-dp.avif'} />
                  </ListItemAvatar>
                  <ListItemButton>
                  <ListItemText
                    primary={profile?.firstName + " " + profile?.secondName}
                    secondary={
                      <React.Fragment>
                            <Typography
                              sx={{ display: 'flex', alignItems: 'center' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              <LocationOnIcon /> {profile?.loaction} 
                            </Typography>
                      </React.Fragment>
                    }
                  />
                  </ListItemButton>
                  <Button color='primary' sx={{ fontSize: '.8rem' }}>Follow</Button> 
              </ListItem>
              <Divider/>
           </>
          ))
        }
      </List>
    </RightSideBar>
  )
}

export default RightBar