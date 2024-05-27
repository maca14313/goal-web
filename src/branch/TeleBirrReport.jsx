import axios from 'axios'
import React, { useState } from 'react'
import { apiHttp } from '../Port'
import { useEffect } from 'react'
import { Link} from 'react-router-dom'
import moment from 'moment'

function TeleBirrReport() {
    const{branchName,id}=JSON.parse(localStorage.getItem('branchData')) 

  const [agentRegistration,setAgentRegistration]=useState('')
  const [merchantRegistration,setMerchantRegistration]=useState('')
  const [agentActivation,setAgentActivation]=useState('')
  const [merchantActivation,setMerchantActivation]=useState('')

  const [errorDisplay,setErrorDisplay]=useState(0)
  const [addResultDisplay,setAddResultDisplay]=useState(0)
  const [fetching,setFetching]=useState(0)
  const [newThisMonthGoalInfo,setNewThisMonthGoalInfo]=useState('')
  const [thisMonthGoalInfo,setThisMonthGoalInfo]=useState('')
  const [thisMonthdailyGoalInfo,setThisMonthdailyGoalInfo]=useState('')
  const [oneMonthdailyGoalInfo,setOneMonthdailyGoalInfo]=useState([])
  const [oneMonthdailyGoalMessage,setOneMonthdailyGoalMessage]=useState('')
  const [searchYear,setSearchYear]=useState('')
  const [searchMonth,setSearchMonth]=useState('')



  const searchGoal=async(e)=>{
    console.log(newThisMonthGoalInfo.id)
    e.preventDefault()
            try {
                  setFetching(1)
                  const searchGoal1=await axios.get(`${apiHttp}/searchthismonthsingletelebirrreggoal/${id}/${searchYear}/${searchMonth}`)
                   const fetchedData1=searchGoal1.data
                   setThisMonthGoalInfo(fetchedData1)

                   const searGoal2=await axios.get(`${apiHttp}/searchalldailyinamonthforsingletelebirrreggoal/${id}/${searchYear}/${searchMonth}`)
                   const fetchedData2=searGoal2.data
                   setThisMonthdailyGoalInfo(fetchedData2)

                   const searGoal3=await axios.get(`${apiHttp}/searchoneamonthforsingletelebirrreggoal/${id}/${searchYear}/${searchMonth}`)
                   const fetchedData3=searGoal3.data
                   let data1=searGoal3.data
                      setOneMonthdailyGoalInfo(data1?.result)
                      //setAddResultDisplay(data1)

                   if (fetchedData3!='' || fetchedData3!=undefined || fetchedData3!=null) {
                    setFetching(0)
                   }
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
     setThisMonthGoalInfo(getThisMonthGoal.data)
     console.log(getThisMonthGoal.data)
      } catch (error) {
        
      }
    }
    NewMonthGoal()
  
  
 },[]); 

 useEffect(() => {
    console.log(id)
    const NewMonthGoal=async()=>{
      try {
     const getThisMonthGoal=await axios.get(`${apiHttp}/thismonthdailytelebirrreggoal/${id}`)
     setNewThisMonthGoalInfo(getThisMonthGoal.data)
     console.log(getThisMonthGoal.data)
      } catch (error) {
        
      }
    }
    NewMonthGoal()
  
  
 },[addResultDisplay]); 


 useEffect(() => {
    const NewMonthGoal=async()=>{
      try {
     const getThisMonthGoal=await axios.get(`${apiHttp}/alldailyinamonthforsingletelebirrreggoal/${id}`)
     setThisMonthdailyGoalInfo(getThisMonthGoal.data)
     console.log(getThisMonthGoal.data)
      } catch (error) {
        
      }
    }
    NewMonthGoal()
  
  
 },[addResultDisplay]);


 useEffect(() => {
  const NewMonthGoal=async()=>{
    try {
   const getThisMonthGoal=await axios.get(`${apiHttp}/oneamonthforsingletelebirrreggoal/${id}`)
   let data1=getThisMonthGoal.data
   setOneMonthdailyGoalInfo(data1?.result)
   console.log(data1?.result)
    } catch (error) {
      
    }
  }
  NewMonthGoal()


},[addResultDisplay]);

           let currentDate=new Date()
           let month=currentDate.getMonth()+1   
           let year=currentDate.getFullYear() 
           let date=month+' / '+year 

          


  return (
    <div className='con'>
                     <div className="conTitle conTitleTop"><h3>Tele Birr Registration Report</h3></div>
                     <div className="conTitle"><h4>{branchName} Branch {moment(thisMonthGoalInfo?.goalDate).format('MM-YYYY')}</h4></div>



                     <div className='errorDisplay' style={{display:errorDisplay!=0?'flex':'none'}}> <div className='errorDisplayClose' onClick={()=>(setErrorDisplay(0))}>X</div> {errorDisplay?.message}</div>
                     <div className='errorDisplay' style={{display:addResultDisplay!=0 && addResultDisplay?.success=='no'?'flex':'none',color:addResultDisplay.success=='yes'?'green':'red'}}> <div className='errorDisplayClose' onClick={()=>(setAddResultDisplay(0))}>X</div>{addResultDisplay?.message}</div>

                

                     <form onSubmit={searchGoal} className='searchByDateCon'>
                        <input className='searchByDateInput' type="number" onChange={(e)=>setSearchMonth(e.target.value)} placeholder='month' />
                        <input className='searchByDateInput' type="number" onChange={(e)=>setSearchYear(e.target.value)}  placeholder='year' />
                        <button type='submit' className='searchByDateBtn'>Get</button>
                     </form>

  <div className='reportAllCon'>

 


<div className='reportCon'>
<div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo"> <h3>Monthly progress report {moment(thisMonthGoalInfo?.goalDate).format('MM-YYYY')}</h3>  </div>
</div>
<div className='reportCon'>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Type of goals</div>
    <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Goals</div>
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






{oneMonthdailyGoalInfo?.sort((a, b) => b.id - a.id).map((data)=>(
  <div className='reportAllCon '>
  <div className='reportCon'>
  <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo"> <h3>Daily progress report {moment(data.goalDate).format('DD-MM-YYYY')}</h3>  </div>
  </div>
  <div className='reportCon'>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Type of goals</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Number</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">Percent</div>
  
  </div>
  <div className='reportCon'>
      <div className="conContactsItemsTitleText">Agent Registration</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{data?.agentRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((data?.agentRegistration/thisMonthGoalInfo?.agentRegistration)*100)}%</div>
  
  </div>
  <div className='reportCon'>
      <div className="conContactsItemsTitleText">Merchant Registration</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{data?.merchantRegistration}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((data?.merchantRegistration/thisMonthGoalInfo?.merchantRegistration)*100)}%</div>
  
  </div>
  <div className='reportCon'>
      <div className="conContactsItemsTitleText">Agent Activation</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{data?.agentActivation}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((data?.agentActivation/thisMonthGoalInfo?.agentActivation)*100)}%</div>
  
  </div>
  <div className='reportCon'>
      <div className="conContactsItemsTitleText">Merchant Activation</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{data?.merchantActivation}</div>
      <div className="conContactsItemsTitleText conContactsItemsInfoTextDisplayInfo">{Math.round((data?.merchantActivation/thisMonthGoalInfo?.merchantActivation)*100)}%</div>
  
  </div>
  
  </div>
  
))}







    </div>

    
  )
}

export default TeleBirrReport