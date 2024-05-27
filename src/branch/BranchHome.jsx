import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { apiHttp } from '../Port';
import axios  from 'axios';
import LogIn from './LogIn';
function BranchHome() {
    const navigate = useNavigate()
    const{auth}=JSON.parse(localStorage.getItem('branchData'))!=null?JSON.parse(localStorage.getItem('branchData')):'no' 


    const [tasks,setTasks]=useState()

    const logOut=()=>{
        localStorage.removeItem('branchData')
        navigate('/branchlogin')
      }

  return auth=='yes'? (
<div className="con">
        <div className="conTitle"><h2>Tele</h2></div>
        
           
          
        <div className="conTopList">
                <div  className="conTopListItem" onClick={()=>(logOut())}>Log Out</div>
                
            </div>
        <div className='listCon'>
       

{tasks?.map((task)=>(
    <Link to={'/addtelebirrregGoal'} className="conContacts" key={task?.id}>


    <div className="conContactsItems">
    
        <div className="conContactsItemsImg" >Tele</div>
        <div className="conContactsItemsInfoCon">
    
            <div className="conContactsItemsTitle taskName">
                <div className="conContactsItemsTitleText">{task?.taskName}</div>
            </div>
    
          
    
        </div>
    </div>
    
    
    </Link>
))}

<Link to={'/telebirrregistration'} className="conContacts">


    <div className="conContactsItems">
    
        <div className="conContactsItemsImg" >TB</div>
        <div className="conContactsItemsInfoCon">
    
            <div className="conContactsItemsTitle taskName">
                <div className="conContactsItemsTitleText">Tele Birr Registration</div>
            </div>
    
          
    
        </div>
    </div>
    
    
    </Link>

    <div className="conContacts">


    <div className="conContactsItems">
    
        <div className="conContactsItemsImg" >Evd</div>
        <div className="conContactsItemsInfoCon">
    
            <div className="conContactsItemsTitle taskName">
                <div className="conContactsItemsTitleText">Evd</div>
            </div>
    
          
    
        </div>
    </div>
    
    
    </div>

    <div className="conContacts">


    <div className="conContactsItems">
    
        <div className="conContactsItemsImg" >VC</div>
        <div className="conContactsItemsInfoCon">
    
            <div className="conContactsItemsTitle taskName">
                <div className="conContactsItemsTitleText">vc card</div>
            </div>
    
          
    
        </div>
    </div>
    
    
    </div>

    <div className="conContacts">


    <div className="conContactsItems">
    
        <div className="conContactsItemsImg" >EM</div>
        <div className="conContactsItemsInfoCon">
    
            <div className="conContactsItemsTitle taskName">
                <div className="conContactsItemsTitleText">E-money</div>
            </div>
    
          
    
        </div>
    </div>
    
    
    </div>



</div>

      
    </div>  ):<LogIn/>
}

export default BranchHome