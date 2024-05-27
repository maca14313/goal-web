import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { apiHttp } from '../Port';
import axios  from 'axios';

function LogIn() {
  const navigate = useNavigate()

    const [userName,setUserName]=useState(0)
    const [password,setPassword]=useState(0)

    const [fetching,setFetching]=useState(0)
    const [errorDisplay,setErrorDisplay]=useState(0)
    const [addResultDisplay,setAddResultDisplay]=useState(0)

    const logIn=async(e)=>{
      e.preventDefault()
        try {
            setFetching(1)
              const toLogIn=await axios.post(`${apiHttp}/branchlogin`,{
                userName,
                password
               })
               const fetchedData=toLogIn.data
               setAddResultDisplay(fetchedData)
               
               if(fetchedData?.success=='yes'){
                setFetching(0)
                localStorage.setItem('branchData', JSON.stringify(fetchedData));
                navigate('/')

               }
               if(fetchedData?.success=='no'){
                setFetching(0)
               }
        } catch (error) {
            console.log(error)
             setErrorDisplay(error)
              setAddResultDisplay(0)
              setFetching(0)
        }
            
    }
  return (
    <div className='con conLogIn'>

             <div className="conTitle"><h3>Log In To Your Branch Account</h3></div>
             <div className='errorDisplay' style={{display:errorDisplay!=0?'flex':'none'}}> <div className='errorDisplayClose' onClick={()=>(setErrorDisplay(0))}>X</div> {errorDisplay?.message}</div>
            <div className='errorDisplay' style={{display:addResultDisplay!=0?'flex':'none',color:addResultDisplay.success=='yes'?'green':'red'}}> <div className='errorDisplayClose' onClick={()=>(setAddResultDisplay(0))}>X</div> {addResultDisplay.message}</div>

         <form className='formCon' onSubmit={logIn} >
                 
                 <input className='formInput' onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='User Name'  required />
                 <input className='formInput' onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Password'  required />
                 
                 {fetching==0?<button  className='formBtn' type='submit'>Log-In</button>:
                <>
                  <button  className='formBtn' style={{backgroundColor:'gray',color:'white'}} disabled>Log-In...</button>
                  <div onClick={()=>(setFetching(0))} style={{fontSize:'13px'}}>try again</div>
                </>
                }
         </form>
    </div>
  )
}

export default LogIn