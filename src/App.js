import './styles/App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile';
import PageNoteFound from './components/PageNoteFound';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='*' element={<PageNoteFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
