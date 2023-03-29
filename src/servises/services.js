import axios from "axios";
import { LAN_IP } from "../constants";
const instance = axios.create({
      baseURL:`http://${LAN_IP}:5000/`
})

export async function fetchUserDetails(){
      let id = window.localStorage.getItem('id')
   const result = await instance.get('get-details/'+id)
   return result.data
}

export async function updateUserDetails(formData){
      return await instance.post('update-details',formData)
}

export async function getProfileData(){
      let id = window.localStorage.getItem('id')
     const result = await instance.get('get-profile-details/'+id)
     return result
}

export async function uploadPost(formData){
      const result = await instance.post('post-image',formData)
      return result
}

export async function deletePost(body){
      const result = await instance.post('delete-post',body)
      return result
}

export async function getFeed(){
      let id = window.localStorage.getItem('id')
      const body = {
            id
      }
      const result = await instance.post('feed',body)
      return result
}

export async function postLike(id,imageurl){
      let userId = window.localStorage.getItem('id')
      const body = {
            userId,
            postId:id,
            imageUrl:imageurl
      }
      const result =await instance.post('post-like',body)
      console.log(result);
}

export async function getOthersProfileData(id){
     const result = await instance.get('get-profile-details/'+id)
     return result
}

export async function followRequest(requestId){
      const requestedId = window.localStorage.getItem('id')
      const body = {
            fromId: requestedId,
            toId: requestId
      }
      const result = await instance.post('follow',body)
      console.log(result);
}

export async function UnfollowRequest(requestId){
      const requestedId = window.localStorage.getItem('id')
      const body = {
            fromId: requestedId,
            toId: requestId
      }
      const result = await instance.post('unfollow',body)
}

export async function getContacts() {
     const id = window.localStorage.getItem('id')
     const result = await instance.get('contacts/'+id)
     return result
}

export async function deleteAllChats(toId){
      const body={
        fromId:window.localStorage.getItem("id"),
        toId
      }
const result = await instance.post('/delete-all-chats',body) 
return result.data?.messages
}

export async function userLogout(){
      const body = {
            id:window.localStorage.getItem("id")
      }
     return await instance.post('/logout',body) 
}