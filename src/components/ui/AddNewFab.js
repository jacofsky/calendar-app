import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

const AddNewFab = () => {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(uiOpenModal())
  }

  return (
    <button className='btn btn-primary fab' onClick={handleClick}>
        <i class="bi bi-plus"></i>
    </button>
  )
}

export default AddNewFab