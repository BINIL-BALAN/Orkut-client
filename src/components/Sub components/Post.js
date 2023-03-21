import React,{useState} from 'react'
import { Box, Checkbox } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {postLike} from '../../servises/services'

function Post({imageURL,date,username,likes,desc,profileImage,id,likedPost}) {
  const [check,setCheck] = useState(false)
  const [like,setLikes] = useState(likes)
  function likeAPost(e,id,imageurl){
    e.preventDefault()
    setCheck(true)
    
   if(!likedPost.includes(imageurl)){
    setLikes(like+1)
    postLike(id,imageurl)
  }
  }
  return (
    <Box sx={{}} flex={4} p={2}>
        <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar src={profileImage ? profileImage : ''} sx={{ bgcolor: 'red' }} aria-label="recipe">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={date}
      />
        <Box sx={{display:'flex',justifyContent:'center'}}>
          <CardMedia
          sx={{borderRadius:'10px',width:'95%'}}
            component="img"
            height="20%"
            image={imageURL}
            alt={desc}
          />
        </Box >
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={e=>likeAPost(e,id,imageURL)} aria-label="add to favorites">
        <Checkbox checked={likedPost.includes(imageURL) || check} icon={<FavoriteBorder />} checkedIcon={<FavoriteIcon sx={{color:'red'}} />} />
        </IconButton>
        {like}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
    </Box>
  )
}

export default Post
