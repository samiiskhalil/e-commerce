import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Form from './pages/Form.jsx'
import Shop from './pages/Shop.jsx'
function App(){
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/form' element={<Form/>} />
    <Route path='/admin/login' element={<Login/>} />
    <Route path='/admin/' element={<Admin/>} />
    <Route path='/admin/shop' element={<Shop/>} />
    </Routes>
    </>
    )
}

export default App