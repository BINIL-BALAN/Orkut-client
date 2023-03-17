import React, { useState,useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { Alert,CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styled from '@emotion/styled';
import { getProfileData } from '../../servises/services';
import { uploadPost } from '../../servises/services';
import AlertMessages from './AlertMessages';
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

const ListButton = styled(ListItemButton)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2vh'
})
function PostUpload({ page }) {
    const [details,setDetails] = useState()
    const [open, setOpen] = useState(false);
    const [imageURL,setImageURL] = useState()
    const [postImage,setPostImage] = useState()
    const [desc,setDesc] = useState()
    const [uploadResult,setUploadResult] = useState()
    const [uploadState,setUploadState] = useState()
    const [loading,setLoading] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function setImage(e){
        const img = e.target.files[0]
        const imageUrl = URL.createObjectURL(img)
        setImageURL(imageUrl)
        setPostImage(img)
    }

    useEffect(()=>{
        getProfileData().then((result)=>{
            setDetails(result.data.details)
        })
    },[])
function handleDesc(e){
    setDesc(e.target.value)
}
 function handleUpload(e){
    e.preventDefault()
    const body = {
        id:details.id,
        firstName:details.firstName,
        secondName:details.secondName,
        profileImage:details.profileImage,
        desc:desc
    }
  const formData = new FormData()
  formData.append('details',JSON.stringify(body))
  formData.append('image',postImage)
  uploadPost(formData).then((result)=>{
    setLoading(true)
    setTimeout(()=>{
    setLoading(false)
    setUploadResult(result.data.message)
    setUploadState(true)
    },1000)
    setTimeout(()=>{
        setOpen(false)
        setImageURL('')
        setDesc('')
    },5000)
  }).catch((data)=>{
    setLoading(true)
   setTimeout(() => {
    setLoading(true)
    setUploadResult('Cant upload something went worng')
    setUploadState(false)
   }, 2000);
  })
 }
    return (
        <>
            {
                page === 'message' ?
                    (<ListButton onClick={handleOpen}><AddPhotoAlternateIcon /></ListButton>) :
                page === 'home' ?    
                   ( <ListItemButton onClick={handleOpen}>
                        <ListItemIcon>
                            <AddPhotoAlternateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create post" />
                    </ListItemButton>) :
                    (<Button onClick={handleOpen} variant='contained' color='success'>Add post &nbsp; <AddPhotoAlternateIcon /></Button>)
            }


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
                        <Box sx={{display:'flex',justifyContent:'center'}}>
                            <AlertMessages status={uploadState} message={uploadResult}/>
                        </Box>

                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>New post</strong>
                            <IconButton color="primary" aria-label="upload picture" component="label" >
                                <input hidden accept="image/*" onChange={setImage} type="file" />
                                <AddPhotoAlternateIcon sx={{ fontSize: '2rem' }} />
                            </IconButton>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <img src={imageURL? imageURL : 'https://archive.org/download/no-photo-available/no-photo-available.png'}
                                height='40%vh'
                                border='1px slid rgb(0, 149, 246)'
                                width='100%' />

                            <Stack direction='column'>
                                <TextField id="standard-basic" value={desc} onChange={handleDesc} label="Description" variant="filled" inputProps={{ maxLength: 100 }} />
                                <Button onClick={handleUpload} variant='contained' color='success' sx={{ marginTop: '3vh', width: '100%' }}>
                                    Save post &nbsp; <SaveIcon /> 
                                    {loading ? (<CircularProgress sx={{marginLeft:'.5vw'}}/>) : ''}
                                </Button>
                            </Stack>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default PostUpload