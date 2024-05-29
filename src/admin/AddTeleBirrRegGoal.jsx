import axios from 'axios'
import React, { useState } from 'react'
import { apiHttp } from '../Port'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'



function AddTeleBirrRegGoal() {
    const [agentRegistration,setAgentRegistration]=useState('')
  const [merchantRegistration,setMerchantRegistration]=useState('')
  const [agentActivation,setAgentActivation]=useState('')
  const [merchantActivation,setMerchantActivation]=useState('')

  const [errorDisplay,setErrorDisplay]=useState(0)
  const [addResultDisplay,setAddResultDisplay]=useState(0)
  const [fetching,setFetching]=useState(0)
  const [newThisMonthGoalInfo,setNewThisMonthGoalInfo]=useState('')
  const [singleAllThisMonthGoalInfo,setSingleAllThisMonthGoalInfo]=useState('')

  const [thisMonthGoalInfo,setThisMonthGoalInfo]=useState('')
  const [thisMonthdailyGoalInfo,setThisMonthdailyGoalInfo]=useState('')
  const [oneMonthdailyGoalInfo,setOneMonthdailyGoalInfo]=useState([])
  const [oneMonthdailyGoalMessage,setOneMonthdailyGoalMessage]=useState('')
  const [searchYear,setSearchYear]=useState('')
  const [searchMonth,setSearchMonth]=useState('')


  const [newBranchInfo,setNewBranchInfo]=useState('')
  const [branchs,setBranchs]=useState([])
  const [searchBranch,setSearchBranch]=useState('')


  const searchGoal=async(e)=>{
    e.preventDefault()
            try {
                  setFetching(1)
                  const searchGoal1=await axios.get(`${apiHttp}/onemonthtelebirrreggoal/${searchYear}/${searchMonth}`)
                   const fetchedData1=searchGoal1.data
                   setThisMonthGoalInfo(fetchedData1)

                   const searGoal2=await axios.get(`${apiHttp}/searchalldailyinonemonthforsingletelebirrreggoal/${searchYear}/${searchMonth}`)
                   const fetchedData2=searGoal2.data
                   setThisMonthdailyGoalInfo(fetchedData2)

                  

                   if (fetchedData2!='' || fetchedData2!=undefined || fetchedData2!=null) {
                    setFetching(0)
                   }
                } catch (error) {
                    console.log(error)
                    setErrorDisplay(error)
                    setAddResultDisplay(0)
                    setFetching(0)
                 }
                 }

  const addGoal=async(e)=>{
    console.log(agentRegistration)
    e.preventDefault()
            try {
                  setFetching(1)
                  const addingGoal=await axios.post(`${apiHttp}/addtelebirrreggoal`,{
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
                                const updatingGoal=await axios.put(`${apiHttp}/updatetelebirrreggoal`,{
                                  id:newThisMonthGoalInfo.id,
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
                    const NewMonthGoal=async()=>{
                      try {
                     const getThisMonthGoal=await axios.get(`${apiHttp}/thismonthtelebirrreggoal`)
                     setNewThisMonthGoalInfo(getThisMonthGoal.data)
                     setThisMonthGoalInfo(getThisMonthGoal.data)

                     console.log(getThisMonthGoal.data)
                      } catch (error) {
                        console.log(error)
                      }
                    }
                    NewMonthGoal()
                  
                  
                 },[addResultDisplay]); 

                 useEffect(() => {
                    const NewMonthGoal=async()=>{
                      try {
                     const getThisMonthGoal=await axios.get(`${apiHttp}/allthismonthsingletelebirrreggoal`)
                     setSingleAllThisMonthGoalInfo(getThisMonthGoal.data)
                     console.log(getThisMonthGoal.data)
                      } catch (error) {
                        console.log(error)

                      }
                    }
                    NewMonthGoal()
                  
                  
                 },[]);

                 useEffect(() => {
                  const AllBranchs=async()=>{
                      try {
                     const getAllBranch=await axios.get(`${apiHttp}/getallbranchsinfo`)
                     setBranchs(getAllBranch.data)
                     console.log(getAllBranch.data)
                      } catch (error) {
                        console.log(error)

                      }
                    }
                   AllBranchs()
               }, []);
          
               useEffect(() => {
          
                  if (searchBranch != '') {
                      console.log(searchBranch)
                      const SearchBranchs=async()=>{
                          try {
                         const getSearchedBranchs=await axios.get(`${apiHttp}/searchbranchs/${searchBranch}`)
                         setBranchs(getSearchedBranchs.data)
                         console.log(getSearchedBranchs.data)
                          } catch (error) {
                            console.log(error)

                          }
                        }
                        SearchBranchs()
                  }
               }, [searchBranch]);


               useEffect(() => {
                const NewMonthGoal=async()=>{
                  try {
                 const getThisMonthGoal=await axios.get(`${apiHttp}/foralldailyinamonthforsingletelebirrreggoal`)
                 setThisMonthdailyGoalInfo(getThisMonthGoal.data)
                 console.log(getThisMonthGoal.data)
                  } catch (error) {
                    console.log(error)

                  }
                }
                NewMonthGoal()
              
              
             },[addResultDisplay]);
                         
           let currentDate=new Date()
           let month=currentDate.getMonth()+1   
           let year=currentDate.getFullYear() 
           let date=month+' / '+year 
           


  return (
    <>
    <div className='allCon'>
     <div className="con conForm">
      
     <div className="conTitle"><h3>Tele Birr Registration</h3></div>
     
     <div className="conTopList">
                <Link to={'/addbranch'} className="conTopListItem">Add Branch</Link>
                
            </div>

     <div className='errorDisplay' style={{display:errorDisplay!=0?'flex':'none'}}> <div className='errorDisplayClose' onClick={()=>(setErrorDisplay(0))}>X</div> {errorDisplay?.message}</div>
     <div className='errorDisplay' style={{display:addResultDisplay!=0?'flex':'none',color:addResultDisplay?.success=='yes'?'green':'red'}}> <div className='errorDisplayClose' onClick={()=>(setAddResultDisplay(0))}>X</div>{addResultDisplay.message}</div>

          
        <form className='formCon' onSubmit={addGoal} style={{display:newThisMonthGoalInfo?.success=='no'?'flex':'none'}}>
                 
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

        <form className='formCon' onSubmit={updateGoal} style={{display:newThisMonthGoalInfo?.success=='yes'?'flex':'none'}}>
                 
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
 

     



<div className='reportAllCon' style={{display:newThisMonthGoalInfo?.success=='yes'?'flex':'none'}}>

  <div className='reportCon '>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo"> <h3>Goal of {moment(newThisMonthGoalInfo?.goalDate).format('MM-YYYY')}</h3>  </div>
</div>
<div className='reportCon'>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Type of goals</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Total</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Remaining</div>


</div>
<div className='reportCon'>
      <div className="conContactsItemsTitleText">Agent Registration</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.agentRegistration}</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.agentRegistration-singleAllThisMonthGoalInfo?.agentRegistration}</div>


</div>
<div className='reportCon'>
      <div className="conContactsItemsTitleText">Merchant Registration</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.merchantRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.merchantRegistration-singleAllThisMonthGoalInfo?.merchantRegistration}</div>


</div>
<div className='reportCon'>
<div className="conContactsItemsTitleText">Agent Activation</div>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.agentActivation}</div>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.agentActivation-singleAllThisMonthGoalInfo?.agentActivation}</div>


</div>
<div className='reportCon'>
<div className="conContactsItemsTitleText">Merchant Activation</div>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.merchantActivation}</div>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{newThisMonthGoalInfo?.merchantActivation-singleAllThisMonthGoalInfo?.merchantActivation}</div>

</div>

</div>



<div className='errorDisplay' style={{display:errorDisplay!=0?'flex':'none'}}> <div className='errorDisplayClose' onClick={()=>(setErrorDisplay(0))}>X</div> {errorDisplay?.message}</div>
    <div className='errorDisplay' style={{display:addResultDisplay!=0 && addResultDisplay?.success=='no'?'flex':'none',color:addResultDisplay.success=='yes'?'green':'red'}}> <div className='errorDisplayClose' onClick={()=>(setAddResultDisplay(0))}>X</div>{addResultDisplay?.message}</div>

                

                     <form onSubmit={searchGoal} className='searchByDateCon'>
                        <input className='searchByDateInput' type="number" onChange={(e)=>setSearchMonth(e.target.value)} placeholder='month' />
                        <input className='searchByDateInput' type="number" onChange={(e)=>setSearchYear(e.target.value)}  placeholder='year' />
                        <button type='submit' className='searchByDateBtn'>Get</button>
                     </form>


                     <div className='reportAllCon '>

 


<div className='reportCon'>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo"> <h3>Monthly progress report {moment(thisMonthGoalInfo?.goalDate).format('MM-YYYY')}</h3>  </div>
</div>
<div className='reportCon'>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Type of goals</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Goal</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Number</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Percent</div>
    



</div>
<div className='reportCon'>
      <div className="conContactsItemsTitleText">Agent Registration</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthGoalInfo?.agentRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthdailyGoalInfo?.agentRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((thisMonthdailyGoalInfo?.agentRegistration/thisMonthGoalInfo?.agentRegistration)*100)}%</div>
  
</div>
<div className='reportCon'>
      <div className="conContactsItemsTitleText">Merchant Registration</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthGoalInfo?.merchantRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthdailyGoalInfo?.merchantRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((thisMonthdailyGoalInfo?.merchantRegistration/thisMonthGoalInfo?.merchantRegistration)*100)}%</div>
  
</div>
<div className='reportCon'>
<div className="conContactsItemsTitleText">Agent Activation</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthGoalInfo?.agentActivation}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthdailyGoalInfo?.agentActivation}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((thisMonthdailyGoalInfo?.agentActivation/thisMonthGoalInfo?.agentActivation)*100)}%</div>
  
</div>
<div className='reportCon'>
<div className="conContactsItemsTitleText">Merchant Activation</div>
     <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthGoalInfo?.merchantActivation}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{thisMonthdailyGoalInfo?.merchantActivation}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((thisMonthdailyGoalInfo?.merchantActivation/thisMonthGoalInfo?.merchantActivation)*100)}%</div>
  
</div>

</div>



    </div>



   



    <form className='formCon formConSearch'>
                 
                 <input className='formInput' onChange={(e)=>setSearchBranch(e.target.value)} type="text" placeholder='Search Branchs'  />
               
              </form>
   

<div className='listCon '>
        
{branchs?.map((branch,index)=>(
    <Link to={`/branchtelebirrinfo/${branch?.id}/${branch?.branchName}`} className="bar-items-con">


    
        <div className='listNumber' >{index + 1}</div>
       <div className='bar-items-con-text'>
         <div className="bar-items-con-name">{branch?.branchName}</div>

        <div className="bar-items-con-desc">{branch?.desc}</div>
       </div>

    
      
    
    
    </Link>
))}

</div>
</div>
    </>
  )
}

export default AddTeleBirrRegGoal