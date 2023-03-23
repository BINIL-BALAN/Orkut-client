import axios from 'axios'
import {SUCCESS,FAIL} from '../../constants'
import { getFeed } from '../../servises/services'

export const getProfileDetails = () =>async (dispatch) =>{
  try{
    // let id = window.localStorage.getItem('id')
    const result = await getFeed()
    // console.log(result);
    // const result = await axios.get('http://localhost:5000/get-details/'+id)
    dispatch({
        payload:result.data,
        type : SUCCESS
    })
}catch(error){
    dispatch({
        payload:error.response.data,
        type : FAIL
    })
}
}

export const passId = (id) =>async (dispatch) =>{
      dispatch({
          payload:id,
          type : SUCCESS
      })
  }