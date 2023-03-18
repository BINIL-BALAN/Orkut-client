import axios from "axios";
let id = window.localStorage.getItem('id')
export async function fetchUserDetails(){
   const result = await axios.get('http://localhost:5000/get-details/'+id)
   return result.data
}

export async function updateUserDetails(formData){
      return await axios.post('http://localhost:5000/update-details',formData)
}

export async function getProfileData(){
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