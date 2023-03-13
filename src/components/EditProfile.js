import { Box, Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import Sidebar from './Sub components/Sidebar'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import styled from '@emotion/styled';
import ProfileCard from './Sub components/ProfileCard';
const EditProfileBox = styled(List)({
    width:'55vw',
    height:'fit-content',
    marginTop:'3vh',
    border:'1px solid rgba(0, 0, 0, 0.12)',
    borderRadius:'10px'
    
})
function EditProfile() {
    const [profileImage, setProfileImage] = useState()
    const [imageLink, setImageLink] = useState()
    function handleSelect(e) {
        e.preventDefault()
        document.getElementById('fileInput').click()
    }

    function handleSelectImage(e) {
        const image = e.target.files[0]
        const imapeURL = URL.createObjectURL(image);
        setProfileImage(image)
        setImageLink(imapeURL);
    }
    console.log();

    return (
        <Box sx={{ backgroundColor: "#F0F2F5" }}>
            <Stack direction='row'>
                <Box sx={{ height: '100vh', width: '20vw' }}>
                    <Sidebar></Sidebar>
                </Box >
                <Box sx={{ width: '56.5%' }}>
                    
                        <Typography variant='h5' sx={{marginTop:'1vh'}}>Edit profile</Typography>
    
                        <EditProfileBox sx={{ width: '60vw' }}>
                            <ListItem alignItems="flex-start">
                                <Stack direction='row'>
                                    <Stack direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem" }}>First name</Typography >
                                        <TextField placeholder='First name' />
                                    </Stack>
                                    <Stack direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem" }}>Second name</Typography >
                                        <TextField placeholder='Second name' />
                                    </Stack>
                                </Stack>
    
                            </ListItem>
    
                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Stack direction='row' sx={{ width: '40vw' }}>
                                    <Stack sx={{ width: '40vw' }} direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem", width: '8vw' }}>Location</Typography >
                                        <TextField fullWidth variant='outlined' placeholder='Location' />
                                    </Stack>
                                </Stack>
    
                            </ListItem>
    
                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Stack direction='row' sx={{ width: '40vw' }}>
                                    <Stack sx={{ width: '40vw' }} direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem", width: '8vw' }}>Email</Typography >
                                        <TextField fullWidth variant='outlined' placeholder='Enter Email' />
                                    </Stack>
                                </Stack>
                            </ListItem>
    
                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Stack direction='row' sx={{ width: '40vw' }}>
                                    <Stack sx={{ width: '40vw' }} direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem", width: '8vw' }}>Bio</Typography >
                                        <TextField placeholder='Maximum characters 100' fullWidth multiline rows={4} inputProps={{ maxLength: 100 }} />
                                    </Stack>
                                </Stack>
                            </ListItem>
    
                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Box sx={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
                                    <input id="fileInput" onChange={handleSelectImage} type="file" style={{ display: 'none' }} />
                                    <Button variant='outlined' onClick={handleSelect}>
                                       Edit profile picture 
                                        <AddPhotoAlternateIcon sx={{marginLeft:'.5vw'}}/>
                                        </Button>
                                </Box>
                            </ListItem>
                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Box sx={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
                                    <Button variant='contained' color='success'>
                                        Save &nbsp; <SaveIcon/>
                                        </Button>
                                        <Button variant='contained' color='error' sx={{marginLeft:'1vw'}}>
                                           Reset <RestartAltIcon/>
                                        </Button>
                                </Box>
                            </ListItem>
                        </EditProfileBox>
                    
                    
                </Box>
                <Stack sx={{width:'25vw',marginLeft:'2vw',marginTop:'5.8vh'}}>
                <ProfileCard imageURL={imageLink} posts={0} followers={0} following={0} desc={''}/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default EditProfile