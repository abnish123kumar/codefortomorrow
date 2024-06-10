import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import UserSignIn from './pages/UserSignIn'
import UserSignup from './pages/UserSignup';
import Dashboard from './pages/Dashboard';

function App() {
 

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserSignIn />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
   </BrowserRouter>
    {/* <UserSignIn /> */}
   </>
  )
}

export default App
