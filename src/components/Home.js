import React from 'react'
import { Box,Stack } from '@mui/system'
import SideBar from './Sub components/Sidebar'
import FeedSection from './Sub components/FeedSection'
function Home() {
  return (
    <Box sx={{height:'100vh'}}>
       <Stack direction='row' justifyContent='space-between' spacing={.3}>
         <SideBar sx={{height:100}}/>
         <FeedSection/>
       </Stack>
    </Box>
  )
}

export default Home