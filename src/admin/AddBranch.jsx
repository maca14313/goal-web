import axios from 'axios'
import React, { useState } from 'react'
import { apiHttp } from '../Port'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function AddBranch() {

  const [branchName,setBranchName]=useState('')
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [desc,setDesc]=useState('')

  const [errorDisplay,setErrorDisplay]=useState(0)
  const [addBranchResultDisplay,setAddBranchResultDisplay]=useState(0)
  const [fetching,setFetching]=useState(0)
  const [newBranchInfo,setNewBranchInfo]=useState('')
  const [branchs,setBranchs]=useState([])
  const [searchBranch,setSearchBranch]=useState('')








  const addBranch=async(e)=>{
    e.preventDefault()
            try {
                  setFetching(1)
                  const toAddBranch=await axios.post(`${apiHttp}/addbranch`,{
                    branchName,
                    userName,
                    password,
                    desc,
                   })
                   const fetchedData=toAddBranch.data
                   if (fetchedData!='' || fetchedData!=undefined || fetchedData!=null) {
                    setFetching(0)
                   }
                   setAddBranchResultDisplay(fetchedData)
                } catch (error) {
                    console.log(error)
                    setErrorDisplay(error)
                    setAddBranchResultDisplay(0)
                    setFetching(0)
                 }
                 }


     useEffect(() => {
      if (addBranchResultDisplay?.success=='yes') {
        console.log('yooo')
        const NewBranch=async()=>{
          try {
         const getNewBranchInfo=await axios.get(`${apiHttp}/getthenewbranchinfo/${branchName}`)
         setNewBranchInfo(getNewBranchInfo.data)
         console.log(getNewBranchInfo.data)
          } catch (error) {
            
          }
        }
       NewBranch()
      }
      
     },[addBranchResultDisplay]);   
     
     
     useEffect(() => {
        const AllBranchs=async()=>{
            try {
           const getAllBranch=await axios.get(`${apiHttp}/getallbranchsinfo`)
           setBranchs(getAllBranch.data)
           console.log(getAllBranch.data)
            } catch (error) {
              
            }
          }
         AllBranchs()
     }, [addBranchResultDisplay]);

     useEffect(() => {

        if (searchBranch != '') {
            console.log(searchBranch)
            const SearchBranchs=async()=>{
                try {
               const getSearchedBranchs=await axios.get(`${apiHttp}/searchbranchs/${searchBranch}`)
               setBranchs(getSearchedBranchs.data)
               console.log(getSearchedBranchs.data)
                } catch (error) {
                  
                }
              }
              SearchBranchs()
        }
     }, [searchBranch]);
     
     
  return (
   <>
   <div className='allCon'>
    <div className="con conForm">
          <div className='errorDisplay' style={{display:errorDisplay!=0?'flex':'none'}}> <div className='errorDisplayClose' onClick={()=>(setErrorDisplay(0))}>X</div> {errorDisplay?.message}</div>
          <div className='errorDisplay' style={{display:addBranchResultDisplay!=0?'flex':'none',color:addBranchResultDisplay.success=='yes'?'green':'red'}}> <div className='errorDisplayClose' onClick={()=>(setAddBranchResultDisplay(0))}>X</div> {addBranchResultDisplay.message}</div>

        <form className='formCon' onSubmit={addBranch}>
                 
                <input className='formInput' onChange={(e)=>setBranchName(e.target.value)} type="text" placeholder='Branch Name' minlength='4' maxlength='50' required />
                <input className='formInput' onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='User Name' minlength='4' maxlength='50' required />
                <input className='formInput' onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Password' minlength='8' maxlength='8' required />
                <textarea className='formInput formtextarea' onChange={(e)=>setDesc(e.target.value)} name="" id="" cols="30" rows="10" minlength='1' maxlength='100' placeholder='Desc' required></textarea>
                {fetching==0?<button  className='formBtn' type='submit'>Add Branch</button>:
                <>
                  <button  className='formBtn' style={{backgroundColor:'gray',color:'white'}} disabled>Adding...</button>
                  <div onClick={()=>(setFetching(0))} style={{fontSize:'13px'}}>try again</div>
                </>
                }
        </form>

    </div>

    <div className="conContacts displayInfoCon" style={{display:newBranchInfo==''?'none':'flex'}}>


<div className="conContactsItems infoDisplayCon" style={{flexDirection:'column'}}>
    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >


    <div className='added-branch-info-list' >
    <div className="conContactsItemsTitleText">Branch Name</div>
    <div className="bar-items-con-desc">{newBranchInfo?.branchName}</div>
        </div>

       
       
    </div>

    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >


    <div className='added-branch-info-list'>
    <div className="conContactsItemsTitleText">User Name</div>
    <div className="bar-items-con-desc">{newBranchInfo?.userName}</div>
        </div>

        
       
    </div>
    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >

    <div className='added-branch-info-list'>
            <div className="conContactsItemsTitleText">Password</div>
            <div className="bar-items-con-desc">{newBranchInfo?.password}</div>
        </div>

       
       
    </div>
   
    <div className="conContactsItemsInfoCon infoDisplayItemsCon " >

        <div className='added-branch-info-list'>
        <div className="conContactsItemsTitleText">Registretion Date</div>
        <div className="bar-items-con-desc">{newBranchInfo?.registretionDate}</div>
        </div>
        


       
       
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

export default AddBranch