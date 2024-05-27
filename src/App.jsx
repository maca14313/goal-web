import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import AdminHomePage from './admin/AdminHomePage'
import AddBranch from './admin/AddBranch'
import AddTeleBirrRegGoal from './admin/AddTeleBirrRegGoal'
import BranchTeleBirrInfo from './admin/BranchTeleBirrInfo'
import ReportTeleBirr from './admin/ReportTeleBirr'


import BranchHome from './branch/BranchHome'
import LogIn from './branch/LogIn'
import TeleBirrRegistration from './branch/TeleBirrRegistration'
import TeleBirrReport from './branch/TeleBirrReport'

function App() {
  const [count, setCount] = useState(0)
  const{auth}=JSON.parse(localStorage.getItem('branchData'))!=null?JSON.parse(localStorage.getItem('branchData')):'no' 

///branchhome
  return (
   <Router>
        <div className="App" >
         <Routes>

        {/* <Route path="/adminhome" element={<AdminHomePage/>}/> */}
         <Route path="/" element={<AdminHomePage/>}/>

         <Route path="/addbranch" element={<AddBranch/>}/>
         <Route path="/addtelebirrregGoal" element={<AddTeleBirrRegGoal/>}/>
         <Route path="/branchtelebirrinfo/:id/:name" element={<BranchTeleBirrInfo/>}/>
         <Route path="/reportteleBirr/:id/:name" element={<ReportTeleBirr/>}/>


        {/* <Route path="/" element={<BranchHome/>}/>*/}
        <Route path='/branchhome' element={<BranchHome/>}/>

         <Route path="/branchlogin" element={<LogIn/>}/>
         <Route path="/telebirrregistration" element={<TeleBirrRegistration/>}/>
         <Route path="/telebirrreport" element={<TeleBirrReport/>}/>








         </Routes>
       </div>
   </Router>
  )
}

export default App
