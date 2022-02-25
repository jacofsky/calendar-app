import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es';


import { messages } from '../../helpers/calendar-messages-es'
import Navbar from '../ui/Navbar'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import { useSelector } from 'react-redux'
import DeletEventFab from '../ui/DeletEventFab'


const localizer = momentLocalizer(moment)


const CalendarScreen = () => {
    
    const { events, activeEvent } = useSelector(state => state.calendar)
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')  || 'month')

    const dispatch = useDispatch()
    const {uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])
    

    const openModal = (e) => {
        dispatch(uiOpenModal())

    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))

    }
 
    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }
  
    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    return (
    <div className='calendar-screen buscar'>
        <Navbar />

        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={openModal}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={onViewChange}
            view={lastView}
            components={{
                events: CalendarEvent
            }}
            
        />

        <AddNewFab />

        {
            activeEvent && <DeletEventFab/>
        }

        <CalendarModal />

    </div>
  )
}

export default CalendarScreen