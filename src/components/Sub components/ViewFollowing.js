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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import Unfollow from '../Sub components/Unfollow'
import { LAN_IP } from '../../constants';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
    height:'70vh',
    overflowY:'scroll',
    '&&::-webkit-scrollbar':{width:'0px'}
}
function ViewFollowing({following,followers,other}) {
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
            <Button sx={{width:'10vw',margin:'0px',color:'rgb(0, 149, 246)'}} variant='p'  onClick={handleOpen} color='primary' fontSize='large'><strong>{following?.length}</strong>&nbsp; Following</Button>

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
                        <Typography>Following </Typography>
                        <List sx={listStyle}>
                     
                        { following?.length> 0 ?
                                following?.map(user => (
                                    <ListItem alignItems="center">
                                  <ListItemButton onClick={e=>viewProfile(e,user.id)}>
                                        <ListItemAvatar>
                                            <Avatar alt={user.firstName} src={user.profileImage.replace('localhost',LAN_IP)} />
                                        </ListItemAvatar>
                                        <FiberManualRecordIcon color={user.online ? 'success' : 'error'} sx={{fontSize:'small',marginRight:'.4vw'}}/>
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
                                                      <LocationOnIcon color='error'/> {user.loaction} &nbsp; {followers?.includes(followers?.find(follower => follower.id === user.id)) ? 
                                                      (<Typography sx={{color:'green'}}>follower</Typography >) 
                                                      : 'Not follower'}
                                                    </Typography>
                                                    
                                                </React.Fragment>
                                            }
                                        />
                                  </ListItemButton>
                                  {other ? (<Unfollow id={user.id}/>) : ''}
                                </ListItem>
                                )) : "No following"
                            }
                
                        </List>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ViewFollowing