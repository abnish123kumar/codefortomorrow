// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

const UserSignIn = () => {

     const [user, setUser] = useState({
        username:'',
        password: ''
     })
     const navigate = useNavigate();

     const checkuserinfo = (e)=>{
        setUser({...user, [e.target.id]:e.target.value});
     }

     const loginusers = async(e)=>{
        e.preventDefault();
        
        await fetch('http://localhost:4000/api/userlogin',{
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(user)})
            .then(data=>{
                console.log(data.status);
              if(data.status == 200){
                navigate('/dashboard');
              }
            })
     }

  return (
    <div className='signin'>
         <div className='signIn-form'>
              <h2>LogIn</h2>
            <div className='signin-email'>
              <label> email</label>
            <input type='text' placeholder='enter your email' id='username' onChange={checkuserinfo}   /></div>
            <div className='signin-email'>
            <label > Password </label>
            <input type='password' placeholder='enter your password' id='password' onChange={checkuserinfo}  />
            </div>
                <div className='Signin-btn'>
                    <button onClick={loginusers}>logIn</button>
                </div>
              
                <p>Not a member? <Link to={'/signup'}>Signup</Link> </p>
             
            
         </div>
    </div>
  )
}

export default UserSignIn
