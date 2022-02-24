import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/events'

const DeletEventFab = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(eventDeleted())
    }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleClick}>
        <i className="bi bi-trash3"></i>
    </button>
  )
}

export default DeletEventFab