import React, { useState } from 'react'
import { Button, Box, Typography, Stack, TextField, Divider, Link,Alert,CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const LoginBox = styled(Box)({
  width: '98.3dvw',
  marginTop: "5dvh",
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})
const Logincontainer = styled(Box)({
  width: '25dvw',
  marginTop: "2dvh",
  borderRadius: '5px',
  padding: '20px',
  border: "1px solid #dcdcdc",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})
function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [statusState, setStatusState] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [statusClass, setStatusClass] = useState('')
  const [loading, setloaging] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  
  function getEmail(e) {
    setEmail(e.target.value)
  }
  function getPassword(e) {
    setPassowrd(e.target.value)
  }

  function handleLogin(e) {
    e.preventDefault()
    if(email === '' || password === ''){
      setStatusState(true)
      setStatusMsg('Please fill all field')
      setStatusClass('error')
    }else{
      const body = {
        email,
        password
      }
     
      const result = axios.post('http://localhost:5000/login', body)
      result
      .then((result) => {
        console.log('inside login',result.data.user.id);
        setTimeout(() => {
          setloaging(false)
        }, 2000)

        setTimeout(()=>{
        setStatusState(true)
        setStatusClass('success')
        setStatusMsg('Login successfull');
        },2000)

        setTimeout(() => {
          setStatusState(false)
          setStatusClass('')
          setStatusMsg('');
          navigate('/Home')
        }, 3000)
      })
      .catch((data) => {
        setTimeout(() => {
          setloaging(false)
        }, 2000)

       setTimeout(()=>{
        setStatusState(true)
        setStatusClass('error')
        setStatusMsg(data.response.data.message);
       },2000)

        setTimeout(() => {
          setStatusState(false)
          setStatusClass('')
          setStatusMsg('');
        }, 4000)
      })
    }
  }

  return (
    <Box>
      <Typography variant='h4' color='primary' sx={{ fontWeight: 'bolder', marginLeft: '5vw', marginTop: '2vh' }}>
      {loading ? (<CircularProgress />) : 'O'}rkut
      </Typography>
      <LoginBox>
      {statusState ? (<Alert sx={{width:'26vw'}} severity={statusClass}>{statusMsg}</Alert>) : ''}
        <Logincontainer>
          <Typography variant='h5' color='#1664af'>Login</Typography>
          <Stack direction='column' marginTop='2vh'>
            <TextField value={email} onChange={getEmail} label="Email" type='email' variant="outlined" sx={{ width: '23.2vw' }} />
            <TextField value={password} onChange={getPassword} label="Password" type='password' variant="outlined" sx={{ width: '23.2vw', marginTop: '3vh' }} />
            <Button onClick={handleLogin} variant='contained' sx={{ marginTop: '5vh', borderRadius: '40px' }}>Login</Button>
            <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2vh' }}>
              <Divider sx={{ width: '8vw' }} color="#dcdcdc" />
              <Typography variant='h6' sx={{ margin: '0px 10px', color: '#afafaf' }}>or</Typography >
              <Divider sx={{ width: '8vw' }} color="#dcdcdc" />
            </Stack>
            <Stack direction='row' sx={{ paddingLeft: '4vw' }}>
              Don't have an account ?
              <Link href="/register" underline="hover" sx={{ marginLeft: '1vw' }}>
                Sign up
              </Link>
            </Stack >
          </Stack>
          <Divider color='red' />
        </Logincontainer>
      </LoginBox>
    </Box>
     
    
      
 
  )
}

export default Login