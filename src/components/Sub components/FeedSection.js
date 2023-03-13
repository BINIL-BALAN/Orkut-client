import React from 'react'
import { Box,Stack } from '@mui/system'
import Feed from './Feed'
import RightBar from './RightBar'
import Navbar from './Navbar'
function FeedSection({page}) {
  return (
    <Box flex={4}  sx={{}}>
        <Navbar page={page}/>
        <Stack direction='row'>
            <Feed/>
            <RightBar/>
        </Stack>
    </Box>
  )
}

export default FeedSection