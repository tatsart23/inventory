import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Pakkaamo from './pages/Pakkaamo'
import Kebab from './pages/Kebab'
import Admin from './pages/Admin'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Logout from './pages/Logout'

function App() {
 
  return (
    <>
      <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pakkaamo" element={<Pakkaamo />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/kebab" element={<Kebab />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
    </>
  )
}

export default App
