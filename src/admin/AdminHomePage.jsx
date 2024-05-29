import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiHttp } from '../Port';
import axios  from 'axios';

function AdminHomePage() {
 const [tasks,setTasks]=useState()
    useEffect(() => {

            const fetchTasks=async()=>{
                try {
               const getTasks=await axios.get(`${apiHttp}/gettasks`)
               setTasks(getTasks.data)
               console.log(getTasks.data)
                } catch (error) {
                  console.log(error)
                }
              }
              fetchTasks()
        
     },[]);
  return (
    <div className="con">
        <div className="conTitle"><h2>Tele</h2></div>
        
           
            <div className="conTopList">
                <Link to={'/addbranch'} className="conTopListItem">Add Branch</Link>
                
            </div>
       
        <div className='listCon'>
       

{tasks?.map((task)=>(
    <Link to={'/addtelebirrregGoal'} className="conContacts welcome-page-icon" key={task?.id}>


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



   

   



</div>

       { /*<div className="conOptions">
            <div className="conOptions1"><i className="bi bi-person-circle"></i></div>
            <div className="conOptions1"><i className="bi bi-telephone-fill"></i>
            </div>
            <div className="conOptions1"><i className="bi bi-wechat"></i>
            </div>
            <div className="conOptions1"><i className="bi bi-gear-wide-connected"></i>
            </div>



</div> */}
    </div>
  )
}

export default AdminHomePage