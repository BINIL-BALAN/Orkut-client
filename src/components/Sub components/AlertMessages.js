import React from 'react'
import { Alert } from '@mui/material'
function AlertMessages({ status, message }) {
    return (
        <>
            {message ? (<Alert sx={{ width: '26vw' }} severity={status ? 'success' : 'error'}>{message}</Alert>) : "" }
        </>
    )
}

export default AlertMessages

  // setTimeout(() => {
    //     setloaging(false)
    // }, 1000);
    // setTimeout(()=>{
    //     setStatusState(false)
    //     setStatusMsg(result.data.message);
    // },3000)
    // setTimeout(()=>{
    //     setStatusMsg('');
    // },5000) 


    // setTimeout(() => {
    //     setloaging(false)
    // }, 1000);
    // setTimeout(()=>{
    //     setStatusState(false)
    //     setStatusMsg(error.response.data.message);
    // },3000)
    // setTimeout(()=>{
    //     setStatusMsg('');
    // },5000) 