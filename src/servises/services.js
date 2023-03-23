import axios from "axios";


export async function fetchUserDetails(){
      let id = window.localStorage.getItem('id')
   const result = await axios.get('http://localhost:5000/get-details/'+id)
   return result.data
}

export async function updateUserDetails(formData){
      return await axios.post('http://localhost:5000/update-details',formData)
}

export async function getProfileData(){
      let id = window.localStorage.getItem('id')
     const result = await axios.get('http://localhost:5000/get-profile-details/'+id)
     return result
}

export async function uploadPost(formData){
      const result = await axios.post('http://localhost:5000/post-image',formData)
      return result
}

export async function deletePost(body){
      const result = await axios.post('http://localhost:5000/delete-post',body)
      return result
}

export async function getFeed(){
      let id = window.localStorage.getItem('id')
      const body = {
            id
      }
      const result = await axios.post('http://localhost:5000/feed',body)
      return result
}

export async function postLike(id,imageurl){
      let userId = window.localStorage.getItem('id')
      const body = {
            userId,
            postId:id,
            imageUrl:imageurl
      }
      const result =await axios.post('http://localhost:5000/post-like',body)
      console.log(result);
}

export async function getOthersProfileData(id){
     const result = await axios.get('http://localhost:5000/get-profile-details/'+id)
     return result
}

export async function followRequest(requestId){
      const requestedId = window.localStorage.getItem('id')
      const body = {
            fromId: requestedId,
            toId: requestId
      }
      const result = await axios.post('http://localhost:5000/follow',body)
      console.log(result);
}

export async function UnfollowRequest(requestId){
      const requestedId = window.localStorage.getItem('id')
      const body = {
            fromId: requestedId,
            toId: requestId
      }
      
      const result = await axios.post('http://localhost:5000/unfollow',body)
}