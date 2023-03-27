import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Follow from './Follow';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { LAN_IP } from '../../constants';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const listStyle = {
    marginTop: '1vh',
    height: '70vh',
    overflowY: 'scroll',
    '&&::-webkit-scrollbar': { width: '0px' }
}
function ViewFollowers({ followers, following,text }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true)

    const navigate = useNavigate()
    function viewProfile(e, id) {
      e.preventDefault()
      navigate('/view-other/'+id)
    }
    return (
        <>
            <Button onClick={handleOpen} variant='p' fontSize='large'><strong>{followers?.length}</strong>&nbsp; Followers</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography>Followers</Typography>
                        <List sx={listStyle}>
                            {followers?.length > 0 ?
                                followers?.map(user => (
                                    <ListItem alignItems="flex-start">
                                       <ListItemButton>
                                            <Stack direction='row'>
                                                <ListItemButton onClick={e=>viewProfile(e,user.id)}>
                                                    <ListItemAvatar>
                                                        <Avatar alt={user.firstName} src={user.profileImage.replace('localhost',LAN_IP)} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={user.firstName + " " + user.secondName}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                                >
                                                                    <LocationOnIcon color='error' /> {user.loaction} &nbsp;
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItemButton>
                                                {following?.includes(following?.find(follow => follow.id === user.id)) ? (<Button variant='text' sx={{color:'green'}}><HowToRegIcon /></Button>) : (<Follow text={text} requestId={user.id} />)}
                                            </Stack >
                                       </ListItemButton>
                                    </ListItem>
                                )) : (<Typography variant='h5'>No followers</Typography>)
                            }

                        </List>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}


{/* <ListItemAvatar>
<Avatar alt={user.firstName} src={user.profileImage} />
</ListItemAvatar>
<ListItemText
primary={user.firstName + " " + user.secondName}
secondary={
    <React.Fragment>
        <Typography
            component="span"
            variant="body2"
            color="text.primary"
            sx={{display:'flex',alignItems:'center'}}
        >
          <LocationOnIcon color='error'/> {user.loaction} &nbsp; 
          {following?.includes(following?.find(follow => follow.id === user.id)) ? (<Typography color={'green'} component='p'><HowToRegIcon/></Typography>): (<Follow text={'follow back'} requestId={user.id}/>)}
        </Typography>
        
    </React.Fragment>
}
/> */}

export default ViewFollowers