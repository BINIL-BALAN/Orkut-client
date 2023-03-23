import React from 'react'
import { Button } from '@mui/material'
import { UnfollowRequest } from '../../servises/services'
function Unfollow({id,type}) {

  function unfollow(e){
      e.preventDefault()
      UnfollowRequest(id)
  }
  return (
    <Button color='error' onClick={unfollow} variant={type}>Unfollow</Button>
  )
}

export default Unfollow