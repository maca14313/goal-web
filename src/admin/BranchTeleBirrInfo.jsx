import axios from 'axios'
import React, { useState } from 'react'
import { apiHttp } from '../Port'
import { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'


function BranchTeleBirrInfo() {
    const {id,name}=useParams()
    const [agentRegistration,setAgentRegistration]=useState('')
  const [merchantRegistration,setMerchantRegistration]=useState('')
  const [agentActivation,setAgentActivation]=useState('')
  const [merchantActivation,setMerchantActivation]=useState('')

  const [errorDisplay,setErrorDisplay]=useState(0)
  const [addResultDisplay,setAddResultDisplay]=useState(0)
  const [fetching,setFetching]=useState(0)
  const [newThisMonthGoalInfo,setNewThisMonthGoalInfo]=useState('')
  const [branchInfo,setBranchInfo]=useState('')


  


  const addGoal=async(e)=>{
    console.log(id)
    e.preventDefault()
            try {
                  setFetching(1)
                  const addingGoal=await axios.post(`${apiHttp}/addsingletelebirrreggoal`,{
                    id:id,
                    agentRegistration,
                    merchantRegistration,
                    agentActivation,
                    merchantActivation,
                   })
                   const fetchedData=addingGoal.data
                   if (fetchedData!='' || fetchedData!=undefined || fetchedData!=null) {
                    setFetching(0)
                   }
                   setAddResultDisplay(fetchedData)
                } catch (error) {
                    console.log(error)
                    setErrorDisplay(error)
                    setAddResultDisplay(0)
                    setFetching(0)
                 }
                 }


                 const updateGoal=async(e)=>{
                  console.log(newThisMonthGoalInfo.id)
                  e.preventDefault()
                          try {
                                setFetching(1)
                                const updatingGoal=await axios.put(`${apiHttp}/updatesingletelebirrreggoal`,{
                                  id:newThisMonthGoalInfo?.id,
                                  agentRegistration,
                                  merchantRegistration,
                                  agentActivation,
                                  merchantActivation,
                                 })
                                 const fetchedData=updatingGoal.data
                                 if (fetchedData!='' || fetchedData!=undefined || fetchedData!=null) {
                                  setFetching(0)
                                 }
                                 setAddResultDisplay(fetchedData)
                              } catch (error) {
                                  console.log(error)
                                  setErrorDisplay(error)
                                  setAddResultDisplay(0)
                                  setFetching(0)
                               }
                               }


                 useEffect(() => {
                    console.log(id)
                    const NewMonthGoal=async()=>{
                      try {
                     const getThisMonthGoal=await axios.get(`${apiHttp}/thismonthsingletelebirrreggoal/${id}`)
                     setNewThisMonthGoalInfo(getThisMonthGoal.data)
                     console.log(getThisMonthGoal.data)
                      } catch (error) {
                        
                      }
                    }
                    NewMonthGoal()
                  
                  
                 },[addResultDisplay]); 


                 
                 useEffect(() => {
                    const AllBranchs=async()=>{
                        try {
                       const getAllBranch=await axios.get(`${apiHttp}/getbranchinfo/${id}`)
                       setBranchInfo(getAllBranch.data)
                       console.log(getAllBranch.data)
                        } catch (error) {
                          console.log(error)
  
                        }
                      }
                     AllBranchs()
                 }, []);
                
               
                         
           let currentDate=new Date()
           let month=currentDate.getMonth()+1   
           let year=currentDate.getFullYear() 
           let date=month+' / '+year  


  return (
    <>
     <div className="con conForm">
     <div className="conTitle"><h3>Tele Birr Registration</h3></div>
     <div className="conTitle"><h3>{name} Branch</h3></div>



     <div className="conContacts displayInfoCon" >
          
          <div className="conContactsItems infoDisplayCon" style={{flexDirection:'column'}}>
              <div className="conContactsItemsInfoCon infoDisplayItemsCon " >
          
                  <div className="conContactsItemsTitle">
                      <div className="conContactsItemsTitleText">Branch Name</div>
                  </div>
          
                  <div className="conContactsItemsInfo">
                      <div className="conContactsItemsInfoText">{branchInfo?.branchName}</div>
                  </div>
                 
              </div>
          
              <div className="conContactsItemsInfoCon infoDisplayItemsCon " >
          
                  <div className="conContactsItemsTitle">
                      <div className="conContactsItemsTitleText">User Name</div>
                  </div>
          
                  <div className="conContactsItemsInfo">
                      <div className="conContactsItemsInfoText">{branchInfo?.userName}</div>
                  </div>
                 
              </div>
              <div className="conContactsItemsInfoCon infoDisplayItemsCon " >
          
                  <div className="conContactsItemsTitle">
                      <div className="conContactsItemsTitleText">password</div>
                  </div>
          
                  <div className="conContactsItemsInfo">
                      <div className="conContactsItemsInfoText">{branchInfo?.password}</div>
                  </div>
                 
              </div>
             
              <div className="conContactsItemsInfoCon infoDisplayItemsCon " >
          
                  <div className="conContactsItemsTitle">
                      <div className="conContactsItemsTitleText">Description</div>
                  </div>
          
                  <div className="conContactsItemsInfo">
                      <div className="conContactsItemsInfoText conContactsItemsInfoTextDesc">{branchInfo?.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ullam cupiditate aspernatur error, quis possimus necessitatibus ratione nobis dolor sed soluta vitae omnis earum ducimus distinctio repudiandae consequatur quasi voluptate a, nemo laboriosam reprehenderit. Repudiandae voluptates asperiores consectetur deserunt placeat, mollitia quidem reprehenderit laboriosam quibusdam non error, quis aliquid corrupti dignissimos fugit magni eveniet at. Quasi natus enim modi suscipit facere doloremque laudantium magni voluptatibus eveniet. Ipsum eveniet repellat consequuntur repellendus eligendi iure nisi sint voluptas, perferendis eius similique laboriosam beatae dolorum quas dolor optio saepe alias sapiente quis velit veritatis nemo amet quidem dicta. Aliquam inventore pariatur quod reprehenderit. </div>
                  </div>
                 
              </div>
          
             
          
              
          </div>
          </div>



     <div className='errorDisplay' style={{display:errorDisplay!=0?'flex':'none'}}> <div className='errorDisplayClose' onClick={()=>(setErrorDisplay(0))}>X</div> {errorDisplay?.message}</div>
     <div className='errorDisplay' style={{display:addResultDisplay!=0?'flex':'none',color:addResultDisplay.success=='yes'?'green':'red'}}> <div className='errorDisplayClose' onClick={()=>(setAddResultDisplay(0))}>X</div> {addResultDisplay.message}</div>

          
        <form className='formCon' onSubmit={addGoal} style={{display:newThisMonthGoalInfo.success=='no'?'flex':'none'}}>
                 
                <input className='formInput' onChange={(e)=>setAgentRegistration(e.target.value)} type="number" placeholder='Agent Registration'  required />
                <input className='formInput' onChange={(e)=>setMerchantRegistration(e.target.value)} type="number" placeholder='Merchant Registration'  required />
                <input className='formInput' onChange={(e)=>setAgentActivation(e.target.value)} type="number" placeholder='Agent Activation'  required />
                <input className='formInput' onChange={(e)=>setMerchantActivation(e.target.value)} type="number" placeholder='Merchant Activation'  required />

                {fetching==0?<button  className='formBtn' type='submit'>Add Goal for Tele Birr Reg</button>:
                <>
                  <button  className='formBtn' style={{backgroundColor:'gray',color:'white'}} disabled>Adding...</button>
                  <div onClick={()=>(setFetching(0))} style={{fontSize:'13px'}}>try again</div>
                </>
                }
        </form>

        <form className='formCon' onSubmit={updateGoal} style={{display:newThisMonthGoalInfo.success=='yes'?'flex':'none'}}>
                 
                 <input className='formInput' onChange={(e)=>setAgentRegistration(e.target.value)} type="number" placeholder='Agent Registration'  required />
                 <input className='formInput' onChange={(e)=>setMerchantRegistration(e.target.value)} type="number" placeholder='Merchant Registration'  required />
                 <input className='formInput' onChange={(e)=>setAgentActivation(e.target.value)} type="number" placeholder='Agent Activation'  required />
                 <input className='formInput' onChange={(e)=>setMerchantActivation(e.target.value)} type="number" placeholder='Merchant Activation'  required />
 
                 {fetching==0?<button  className='formBtn' type='submit'>Update Goal for Tele Birr Reg</button>:
                 <>
                   <button  className='formBtn' style={{backgroundColor:'gray',color:'white'}} disabled>Adding...</button>
                   <div onClick={()=>(setFetching(0))} style={{fontSize:'13px'}}>try again</div>
                 </>
                 }
         </form>
 

         <div className="conTitle" style={{display:newThisMonthGoalInfo.success=='yes'?'flex':'none'}}><h3>Goal of {date}</h3></div>

        <div className="conContacts displayInfoCon" style={{display:newThisMonthGoalInfo.success=='yes'?'flex':'none'}}>
          
<div className="conContactsItems infoDisplayCon" style={{flexDirection:'column'}}>
    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >

        <div className="conContactsItemsTitle">
            <div className="conContactsItemsTitleText">Agent Registration</div>
        </div>

        <div className="conContactsItemsInfo">
            <div className="conContactsItemsInfoText">{newThisMonthGoalInfo?.agentRegistration}</div>
        </div>
       
    </div>

    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >

        <div className="conContactsItemsTitle">
            <div className="conContactsItemsTitleText">Merchant Registration</div>
        </div>

        <div className="conContactsItemsInfo">
            <div className="conContactsItemsInfoText">{newThisMonthGoalInfo?.merchantRegistration}</div>
        </div>
       
    </div>
    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >

        <div className="conContactsItemsTitle">
            <div className="conContactsItemsTitleText">Agent Activation</div>
        </div>

        <div className="conContactsItemsInfo">
            <div className="conContactsItemsInfoText">{newThisMonthGoalInfo?.agentActivation}</div>
        </div>
       
    </div>
   
    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >

        <div className="conContactsItemsTitle">
            <div className="conContactsItemsTitleText">MerchantActivation</div>
        </div>

        <div className="conContactsItemsInfo">
            <div className="conContactsItemsInfoText">{newThisMonthGoalInfo?.merchantActivation}</div>
        </div>
       
    </div>

   

    
</div>


</div>
<div className='reportLinkCon'> <Link className='reportLink' to={`/reportteleBirr/${id}/${name}`}>Get Report ➡️</Link></div>

    </div>


    
   



    </>
  )
}

export default BranchTeleBirrInfo