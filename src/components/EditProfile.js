import { Box, Button, TextField, CircularProgress, Modal } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState, useEffect } from 'react'
import Sidebar from './Sub components/Sidebar'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import styled from '@emotion/styled';
import ProfileCard from './Sub components/ProfileCard';
import { fetchUserDetails, updateUserDetails } from '../servises/services'
import { useNavigate } from 'react-router-dom';
import AlertMessages from './Sub components/AlertMessages';
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
const EditProfileBox = styled(List)({
    width: '55vw',
    height: 'fit-content',
    marginTop: '3vh',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '10px'

})
function EditProfile() {

    const [details, setDetails] = useState({
        firstname: '',
        secondname: '',
        email: '',
        bio: '',
    })
    const [extraDetails, setExtraDetails] = useState({
        posts: [],
        followers: [],
        following: []
    })
    const [profileImage, setProfileImage] = useState(null)
    const [imageLink, setImageLink] = useState('')
    const [statusState, setStatusState] = useState(false)
    const [statusMsg, setStatusMsg] = useState('')
    const [loading, setloaging] = useState(false)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const handleClose = () => setOpen(false);
    // function to invoke image select box
    function handleSelect(e) {
        e.preventDefault()
        document.getElementById('image').click()
    }

    // fetch all data when site load first
    useEffect(() => {
        setProfileImage(null)
       console.log('inside profile image',profileImage);
        fetchUserDetails().then((data) => {
            console.log('inside profile',data);
            setExtraDetails({
                posts: data.post?.postedImages,
                followers: data.user.followers,
                following: data.user.following
            })
            setDetails({
                id: data.user.id,
                firstname: data.user.firstName,
                secondname: data.user.secondName,
                email: data.user.email,
                bio: data.user.bio,
                location: data.user.location,
            })
            setImageLink(data.user.profileImage)
        })
    }, [])

    //function to handle input changes
    function handleUdate(e) {
        const { name, value } = e.target
        setDetails((prev) => {
            return { ...prev, [name]: value }
        })

    }

    //function to select and set image
    function handleSelectImage(e) {
        const image = e.target.files[0]
        const imapeURL = URL.createObjectURL(image);
        setProfileImage(image)
        setImageLink(imapeURL);
    }

    //function to upload data
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('details', JSON.stringify(details))
        if(profileImage !== null){
            formData.append('image', profileImage)
        }
        updateUserDetails(formData).then(result => {
            setTimeout(() => {
                setloaging(false)
            }, 1000);
            setOpen(true)
            setStatusState(true)

            setStatusMsg(result.data.message);
            setTimeout(() => {
                navigate('/Profile')
            }, 5000)
            console.log(result.data.message);
        }).catch(error => {
            setTimeout(() => {
                setloaging(false)
            }, 1000);
            setTimeout(() => {
                setStatusState(false)
                setStatusMsg(error.response.data.message);
            }, 3000)
            setTimeout(() => {
                setStatusMsg('');
            }, 5000)
        })

    }

    return (
        <>
            <Box sx={{ backgroundColor: "#F0F2F5" }}>
                <Stack direction='row'>
                    <Box sx={{ height: '100vh', width: '20vw' }}>
                        <Sidebar></Sidebar>
                    </Box >
                    <Box sx={{ width: '56.5%' }}>

                        <Typography variant='h5' sx={{ marginTop: '1vh' }}>Edit profile</Typography>
                        <AlertMessages status={statusState} message={statusMsg} />
                        <EditProfileBox sx={{ width: '60vw' }}>
                            <ListItem alignItems="flex-start">
                                <Stack direction='row'>
                                    <Stack direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem" }}>First name</Typography >
                                        <TextField onChange={handleUdate} name='firstname' value={details.firstname} placeholder='First name' />
                                    </Stack>
                                    <Stack direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem" }}>Second name</Typography >
                                        <TextField onChange={handleUdate} name='secondname' value={details.secondname} placeholder='Second name' />
                                    </Stack>
                                </Stack>

                            </ListItem>

                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Stack direction='row' sx={{ width: '40vw' }}>
                                    <Stack sx={{ width: '40vw' }} direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem", width: '8vw' }}>Location</Typography >
                                        <TextField onChange={handleUdate} name='location' value={details.location} fullWidth variant='outlined' placeholder='Location' />
                                    </Stack>
                                </Stack>

                            </ListItem>

                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Stack direction='row' sx={{ width: '40vw' }}>
                                    <Stack sx={{ width: '40vw' }} direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem", width: '8vw' }}>Email</Typography >
                                        <TextField value={details.email} onChange={handleUdate} name='email' fullWidth variant='outlined' placeholder='Enter Email' />
                                    </Stack>
                                </Stack>
                            </ListItem>

                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Stack direction='row' sx={{ width: '40vw' }}>
                                    <Stack sx={{ width: '40vw' }} direction='row' alignItems='center'>
                                        <Typography sx={{ margin: "0rem 2rem", width: '8vw' }}>Bio</Typography >
                                        <TextField value={details.bio} onChange={handleUdate} name='bio' placeholder='Maximum characters 100' fullWidth multiline rows={4} inputProps={{ maxLength: 100 }} />
                                    </Stack>
                                </Stack>
                            </ListItem>

                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Box sx={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
                                    <input id='image' onChange={handleSelectImage} type="file" style={{ display: 'none' }} />
                                    <Button variant='outlined' onClick={handleSelect}>
                                        Edit profile picture
                                        <AddPhotoAlternateIcon sx={{ marginLeft: '.5vw' }} />
                                    </Button>
                                </Box>
                            </ListItem>
                            <ListItem alignItems="flex-start" sx={{ marginTop: '2vh' }}>
                                <Box sx={{ display: 'flex', width: '70%', justifyContent: 'end' }}>
                                    <Button onClick={handleSubmit} variant='contained' color='success'>
                                        Save &nbsp; <SaveIcon /> {loading ? (<CircularProgress sx={{ marginLeft: '1vh' }} />) : ''}
                                    </Button>
                                    <Button href='/Edit-profile' variant='contained' color='error' sx={{ marginLeft: '1vw' }}>
                                        Reset <RestartAltIcon />
                                    </Button>
                                </Box>
                            </ListItem>
                        </EditProfileBox>


                    </Box>
                    <Stack sx={{ width: '25vw', marginLeft: '2vw', marginTop: '5.8vh' }}>
                        <ProfileCard
                            imageURL={imageLink}
                            posts={extraDetails.posts}
                            followers={extraDetails.followers}
                            following={extraDetails.following}
                            desc={details.bio}
                            username={details.firstname + " " + details.secondname} />
                    </Stack>
                </Stack>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {statusMsg}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button href='/Profile' variant='contained' color='success'>View profile</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default EditProfile