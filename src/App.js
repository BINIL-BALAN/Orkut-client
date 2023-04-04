import './styles/App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile';
import PageNoteFound from './components/PageNoteFound';
import Chat from './components/Chat'
import EditProfile from './components/EditProfile';
import OtherProfile from './components/OtherProfile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {theme} from './theme/theme'
import { ThemeProvider } from '@mui/material';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Chat' element={<Chat/>}/>
          <Route path='/Edit-profile' element={<EditProfile/>}/>
          <Route path='/view-other/:id' element={<OtherProfile/>}/>
          <Route path='*' element={<PageNoteFound/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider >
  );
}

export default App;
