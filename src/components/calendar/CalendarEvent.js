import React from 'react'

const CalendarEvent = ({event}) => {
    const {title, user} = event
  return (
    <div>
        <span>{title} </span>
        <strong className='d-flex justify-content-end fst-italic'>- {user.name}</strong>

    </div>
  )
}

export default CalendarEvent