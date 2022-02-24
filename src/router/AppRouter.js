import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginScreen from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'

const AppRouter = () => {
  return (
    <BrowserRouter>

        <Routes>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/' element={<CalendarScreen/>}/>

            <Route path='*' element={<CalendarScreen/>}/>


        </Routes>        

    </BrowserRouter>   
  )
}

export default AppRouter