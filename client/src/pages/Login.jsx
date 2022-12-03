import React,{useState,useRef} from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'js-cookie'
const Login = () => {
  let [password,setPassword]=useState('')
  const navigate=useNavigate()
  function handleChange(e){
    setPassword(e.target.value) 
  }
  function handleClick(e){
    e.preventDefault()
    axios.post('http://localhost:1000/api/admin/login',{
      password:password
    })
    .then(res=>{Cookies.set('token',res.data.token)
  navigate('/admin')
  })
    .catch(err=>console.log(err))
  }
  
  return (
      <div className="password-container">
        <form >
          
        <input onChange={handleChange} placeholder='type in admin password' required type="password" name="password" id="password" />
        <button onClick={handleClick} className="btn">log in admin</button>
        </form>
    </div>
    )
}

export default Login