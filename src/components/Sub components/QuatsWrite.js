import React from 'react'
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { LAN_IP } from '../../constants';
import '../../styles/App.css'
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      right: 60,
      top: 0,
      left: 0,
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const arra = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
function QuatsWrite({ miniProfiles }) {
  return (
    <>
      <Typography>Online</Typography>
      <Stack direction={'row'} sx={{}}>
        {
          arra.map(item => (
            <Stack sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginLeft: '1.5vw' }}>
          <StyledBadge
            sx={{ width: '2.8vw' }}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp"  />
          </StyledBadge> 
          <Typography sx={{ fontSize: 'small' }}>Name</Typography>
        </Stack>
          ))
        }
      </Stack>
    </>
  )
}
// <Card sx={{ width:'95%'}}>
//     <CardContent>
//         <Stack direction='row' alignItems='center'>
//         <Avatar alt={name} src={profileImage?.replace('localhost',LAN_IP)} />
//         <Typography marginLeft='1vw'>{name}</Typography>
//         </Stack>

//     <Box marginTop='2.5vh'>
//           <TextField
//               sx={{width:'100%'}}
//               id="filled-multiline-static"
//               label="Whats in your mind ?"
//               multiline
//               rows={3}
//               defaultValue="Write something......"
//               variant="outlined"
//             />
//     </Box>
//     </CardContent>
//     <CardActions>
//       <Button varient='contained' size="small">Post</Button>
//     </CardActions>
//   </Card> 
export default QuatsWrite


{/* <Stack direction={'row'} sx={{marginTop:'5vh',display:'flex',alignItems:'flex-start',width:'100%'}}> {miniProfiles?.map(profile => (
  (<Stack sx={{display:'flex',alignItems:'center', textAlign: 'center', marginLeft: '1.5vw' }}>
    {profile.online ?(<StyledBadge 
      sx={{width:'2.8vw'}}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar  alt="Remy Sharp" src={profile.profileImage.replace('localhost',LAN_IP)} />
    </StyledBadge>) : (<Avatar alt="Remy Sharp" src={profile.profileImage.replace('localhost',LAN_IP)} />)}
    <Typography sx={{fontSize:'small'}}>{profile.firstName + ' ' + profile.secondName.slice(0, 2)}</Typography>
  </Stack>)
))}</Stack> */}