import React from 'react'
import { Box,Stack } from '@mui/system'
import Feed from './Feed'
import RightBar from './RightBar'
import Navbar from './Navbar'
function FeedSection() {
  return (
    <Box flex={4}  sx={{}}>
        <Navbar/>
        <Stack direction='row'>
            <Feed/>
            <RightBar/>
        </Stack>
    </Box>
  )
}

export default FeedSection