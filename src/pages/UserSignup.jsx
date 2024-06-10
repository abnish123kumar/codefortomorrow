// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'

const UserSignup = () => {
    
    const [users, setUser] = useState({
        name: '',
        father_name :'',
        email : '',
        phone: '',
        password: ''
    })
    const [success, setSuccess] = useState(false);

    const signupUservalue = (e)=>{
        setUser({...users, [e.target.id]: e.target.value})
    }
//    console.log(users)

   const sendUserdata = async(e)=>{
    e.preventDefault();
      await fetch('http://localhost:4000/api/userinfo',{
        method: 'post',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(users)
     }).then(data=>{
        console.log(data);
        setSuccess(true)
     }).catch(err=>{
         console.log(err);
     })
   }

  return (
    <div className='signin'>
     {
        success? <p>Successfully signup goto <Link to={'/'}>login</Link> </p> : 
     

    <div className='signIn-form'>
         <h2>SignUp</h2>
       <div className='signin-email'>
         <label> Full name</label>
       <input type='text' id='name' placeholder='enter your name' onChange={signupUservalue}  />
       </div>
       <div className='signin-email'>
         <label> Father name</label>
       <input type='text' id='father_name' placeholder='enter your father name'  onChange={signupUservalue}  />
       </div>
       <div className='signin-email'>
         <label> email</label>
       <input type='email' id='email' placeholder='enter your email' onChange={signupUservalue}   />
       </div>
       <div className='signin-email'>
         <label> Phone</label>
       <input type='number' id='phone' placeholder='enter your number'  onChange={signupUservalue}  />
       </div>
       <div className='signin-email'>
       <label > Password </label>
       <input type='password' id='password' placeholder='enter your password' onChange={signupUservalue}  />
       </div>
           <div className='Signin-btn'>
               <button onClick={sendUserdata}>Signup</button>
           </div>
         
           <p>Already a member? <Link to={'/'}>login</Link> </p>
        
       
    </div>
     }
</div>
  )
}

export default UserSignup
