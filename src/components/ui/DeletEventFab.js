import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events'

const DeletEventFab = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(eventStartDelete())
    }

  return (
    <button className='btn btn-danger fab-danger' onClick={handleClick}>
        <i className="bi bi-trash3"></i>
    </button>
  )
}

export default DeletEventFab