import React, { useState } from 'react'
import { Button, Box, Typography, Stack, TextField, Link, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'
import uuid from 'react-uuid'
import { useNavigate } from "react-router-dom";
import AlertMessages from './Sub components/AlertMessages';
const LoginBox = styled(Box)({
  width: '98.3dvw',
  marginTop: "5vh",
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})
const Logincontainer = styled(Box)({
  width: '25dvw',
  marginTop: "2vh",
  borderRadius: '10px',
  padding: '20px',
  border: "1px solid #dcdcdc",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})
function Register() {
  const navigate = useNavigate()
  const [firstName, setfirstName] = useState('')
  const [secondName, setsecondName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [checkPhone, setPhoneCheck] = useState(false)
  const [statusState, setStatusState] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [loading, setloaging] = useState(false)
  function handleRegister(e) {
    setloaging(true)
    e.preventDefault()
    if (firstName === '' || secondName === '' || email === '' || phone === '' || password === '' || phone.length !== 10) {
      setPhoneCheck(true)
      setStatusState(true)
      setStatusMsg('Please fill all field')
      setStatusState(false)
    } else {
      const id = (uuid().slice(24, 35)) + phone
      const body = {
        id,
        firstName,
        secondName,
        email,
        phone,
        password
      }
      const result = axios.post('http://localhost:5000/register', body)
      result
        .then((data) => {
          localStorage.setItem('id',data.data.id)
          setTimeout(() => {
            setloaging(false)
          }, 2000)

          setTimeout(()=>{
          setStatusState(true)
          setStatusMsg(data.data.message);
          },2000)

          setTimeout(() => {
            setStatusState(false)
            setStatusMsg('');
            navigate('/Edit-profile')
            window.location.reload(true)
          }, 5000)
        })
        .catch((data) => {
          setTimeout(() => {
            setloaging(false)
          }, 2000)

         setTimeout(()=>{
          setStatusState(false)
          setStatusMsg(data.response.data.message);
         },2000)

          setTimeout(() => {
            setStatusMsg('');
          }, 4000)
        })
    }
  }
  function getFirstName(e) {
    setfirstName(e.target.value)
  }
  function getSecondName(e) {
    setsecondName(e.target.value)
  }
  function getEmail(e) {
    setEmail(e.target.value)

  }
  function getPhone(e) {
    setPhone(e.target.value)
    if (phone.length !== 9) {
      setPhoneCheck(true)
    } else {
      setPhoneCheck(false)
    }
  }
  function getPassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div>
      <Box>
        <Typography variant='h4' color='primary' sx={{ fontWeight: 'bolder', marginLeft: '5vw', marginTop: '2vh' }}>
          Orkut
        </Typography>
        <LoginBox>
          <AlertMessages status={statusState} message={statusMsg}/>
          <Logincontainer>
            <Typography variant='h5' color='#1664af'>
              Create account  {loading ?  <>&nbsp;<CircularProgress/> </>: ''}
              </Typography>
            <Stack direction='row' marginTop='2.5vh'>
              <TextField value={firstName} onChange={getFirstName} required type='text' id='firstName' label="First name" variant="outlined" sx={{ width: '11vw', margin: '0rem .5rem' }} />
              <TextField value={secondName} onChange={getSecondName} required label="Second name" variant="outlined" sx={{ width: '11vw', margin: '0rem .5rem' }} />
            </Stack>
            <Stack direction='column' marginTop='2vh'>
              <TextField value={email} onChange={getEmail} required type='email' label="Email" variant="outlined" sx={{ width: '23.2vw' }} />
              <TextField value={phone} onChange={getPhone} required label="Phone number" type='text' variant="outlined" sx={{ width: '23.2vw', marginTop: '2vh' }} />
              {checkPhone ? (<Typography color='error'>Invalid phone number</Typography>) : ''}
              <TextField value={password} onChange={getPassword} required label="Password" type='password' variant="outlined" sx={{ width: '23.2vw', marginTop: '2vh' }} />
              <Button onClick={handleRegister} variant='contained' sx={{ marginTop: '5vh', borderRadius: '40px', height: "8vh" }}>Create </Button>
            </Stack>
            <Link href="/" underline="hover" sx={{ marginTop: '1vw' }}>
              Login
            </Link>
          </Logincontainer>
        </LoginBox>

      </Box>
    </div>
  )
}

export default Register