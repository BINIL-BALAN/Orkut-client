import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';

export const theme = createTheme({
    palette:{
        primary:{
            main:'rgb(0, 149, 246)',
            light:'#F0F2F5'
        },
        secondary: {
            main: 'rgb(0, 149, 246)', // set the secondary color
          },
        background:{
            default:'#F0F2F5'
        },
      
    }
})

// '#de074b' rgb(0, 149, 246)