import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  const submitform= async (event)=>{
    event.preventDefault()
    const userDetails={username,password}
    const options={
        method:'POST',
        body:JSON.stringify(userDetails)
    }
    const response= await fetch('https://apis.ccbp.in/login',options)
    if(response.ok===true){
        navigate('../',{replace:true})
    }
  }
  const changeusername=(event)=>{
    const username=event.target.value
    setUsername(username)
  }
  const changepassword=(event)=>{
    const password=event.target.value
    setPassword(password)
  }
  return (
    <div>
        <form onSubmit={submitform}>
            <p>Username</p>
            <input type='text' value={username} onChange={changeusername} />
            <p>Password</p>
            <input type='password' value={password} onChange={changepassword} />
            <br/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login