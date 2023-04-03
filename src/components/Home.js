import React, { useState } from 'react'
import { Box, Stack } from '@mui/system'
import SideBar from './Sub components/Sidebar'
import FeedSection from './Sub components/FeedSection'
import { theme } from '../theme/theme'
import { ThemeProvider, createTheme } from '@mui/material'
function Home() {
  const [mode, setMode] = useState(window.localStorage.getItem("mode") || 'light')

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ height: '100vh' }} bgcolor={'background.default'}>
        <Stack direction='row' justifyContent='space-between' spacing={.3}>
          <SideBar setMode={setMode} mode={mode} sx={{ height: 100 }} />
          <FeedSection page={'Home'} />
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default Home