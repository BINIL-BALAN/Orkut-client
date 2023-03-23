import { Button } from '@mui/material'
import React from 'react'
import { followRequest } from '../../servises/services';
function Follow({type,requestId,text}) {

    function follow(e){
           e.preventDefault()
           followRequest(requestId).then((result)=>{
              setTimeout(() => {
                window.location.reload(true)
              }, 2000);
           });
    }
  return (
    <>
        <Button onClick={follow} variant={type}>{text}</Button>
    </>
  )
}

export default Follow