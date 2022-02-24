import React, { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from "../../helpers/calendar-modal-style";
import { uiCloseModal } from "../../actions/ui";
import { eventAddNew, eventClearActiveEvent, eventUpdated } from "../../actions/events";



Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours')

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}

const CalendarModal = () => {

  const dispatch = useDispatch();
  const {modalOpen} = useSelector(state => state.ui)
  const {activeEvent} = useSelector(state => state.calendar)


  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [IsValid, setIsValid] = useState(true)

  

  const [formValues, setFormValues] = useState(initEvent)

  const {title, notes, start, end} = formValues


  useEffect(() => {
    
    if(activeEvent){
      setFormValues(activeEvent)
    } else {
      setFormValues(initEvent)
    }

  }, [activeEvent, setFormValues])
  

  
  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    dispatch(uiCloseModal())
    dispatch(eventClearActiveEvent())
    setFormValues(initEvent)
  }


  const handleStartDateChange = (e) => {
    setDateStart(e)
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const momentStart = moment(start)
    const momentEnd = moment(end)

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Check your dates!',
        confirmButtonColor: '#dc3545',
      });
    }

    if (title.trim().length < 2) {
      return setIsValid(false)
    }

    setIsValid(true)

    if(activeEvent === null){
      dispatch(
        eventAddNew(
          {
            ...formValues,
            id: new Date().getTime(),
            user: {
              _id: '123',
              name: 'Jaco'
            }
          }
        )
      )
     
    } else {
      dispatch(eventUpdated(formValues))
    }

    dispatch(closeModal())
    
  }

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal} sirve para alguna animacion
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1 className="text-center"> { activeEvent ? `Editar evento` : `Nuevo evento`} </h1>
      <hr />
      <form 
        className="container"
        onSubmit={handleSubmitForm}
      >
      
        <div className="mb-3">
          <label for="floatingInput">Fecha y hora inicio</label>
          <DateTimePicker className='form-control' onChange={handleStartDateChange} value={dateStart} />
        </div>

        <div className="mb-3">
          <label for="floatingInput">Fecha y hora de fin</label>
          <DateTimePicker className='form-control' onChange={handleEndDateChange} value={dateEnd} minDate={dateStart} />
        </div>

        <hr />
        
        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${!IsValid && 'is-invalid' }` }
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <label>Titulo</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            style={{height: 'max-content'}}
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <label>Notas</label>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block w-100 mb-3">
          <i className="bi bi-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
