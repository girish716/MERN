import React, { useEffect, useState } from 'react'
import { Link, useLocation, Navigate} from 'react-router-dom'
import jobsImg from '../assets/jobs.jpg'



const Register = () => {
  const [data, setData] = useState({
    name : "",
    password : ""
  })
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const { pathname } = useLocation()
  const page = pathname ==='/login' ? "login" : "register"
  
  useEffect(()=>{
    setError("")
    setStatus("")
  },[page])


  const onChange = (e)=>{
    setError("")
    setStatus("")
    const { name, value } = e.target
    setData(prevData=>{
      return {
        ...prevData,
        [name] : value
      }
    })
  }
  
  const onSubmit = async (data)=>{
    try {
        const res = await fetch(`https://jobs-api-1209.herokuapp.com/api/v1/auth/${page}`,
        {
          method : "POST",
          body : JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        }
      )
      const resData = await res.json()
      await errorHandler(resData, res.status)
      const { token, user} = resData
      if(token){
        setStatus("Successfully Registered/Logged In")
        localStorage.setItem('token', token)
        localStorage.setItem('username', user.name)
        window.location.reload()
        setData({
          name :"",
          password:""
        })
      }else{

      }
    } catch (error) {
       console.log(error)
    }
  }

  const errorHandler = async (res, statusCode)=>{
      console.log(statusCode)
      if(!res.token){
        const { msg } = res
        if(msg.startsWith('Duplicate')){
          setError("Username is already taken, please choose different name")
        }
        else if(data.name.length <=3 || data.password.length <=3){
          setError("Username or Password length can not be less than 4..")
        }
        else if (statusCode==401 || statusCode==204){
          setError("Invalid credentials")
        }
        else{
          setError(msg)
        }
      }
  }

  return (
    <div className='register'>
      <img src={jobsImg} className='jobsImg'/>
      <div className='card'> 
        <form>
        <h2>{page==='login'?"Login":"Register"}</h2>
        <div>
          <label htmlFor='name'>Username</label>
          <input required name='name' type='text' placeholder='Enter Your Username'  onChange={onChange} value={data.name}></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input required name='password' type='password' placeholder='Enter Your Password'  onChange={onChange} value={data.password}></input>
        </div>
        <button onClick={()=>{onSubmit(data)}} className='main-button' type='button'>{page==='login'?"Login":"Register"}</button>
        <p>{page==="login"?"Not a member yet?":"Already a member yet?"}<Link to={page==='login'?"/register":"/login"}>{page==="login"?"Register" : "Login"}</Link></p>
      </form>
      <p className='error'>{error}</p>
      <p className='status'>{status}</p>
      </div>
    </div>
  )
}

export default Register