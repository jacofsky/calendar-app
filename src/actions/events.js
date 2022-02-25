import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import Swal from "sweetalert2";
import { prepareEvents } from "../helpers/prepareEvents";

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        const {uid, name} = getState().auth

        try {
            const resp = await fetchConToken('events', event, 'POST')
            const body = await resp.json()

            if (body.ok) {

                event.id = body.evento.id
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(body.evento))
            }
            
        } catch (error) {
            console.log('error')
            Swal.fire('Error', 'Ah surgido un problema misterioso! 😰', 'error')
        }
    }
}

export const eventStartLoading = () => {
    return async(dispatch) =>{

        try {
            const resp = await fetchConToken('events')
            const body = await resp.json()

            if (body.ok) {
                const events = (prepareEvents(body.msg))
                dispatch(eventsLaoded(events))
            }

        } catch (error) {
            console.log('error')
            Swal.fire('Error', 'Ah surgido un problema misterioso! 😰', 'error')
        }
    }
}

export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json()

            console.log(body)

            if (body.ok) {
                dispatch(eventUpdated(event))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log('error')
        }
    }
}

export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        const  {id} = getState().calendar.activeEvent

        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json()

            console.log(body)

            if (body.ok) {
                dispatch(eventDeleted())
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log('error')
        }
    }
}

export const eventLogout = () => ({
    type: types.eventLogout
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})

const eventDeleted = () => ({
    type: types.eventDeleted
})

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

const eventsLaoded = (eventos) => ({
    type: types.eventLoaded,
    payload: eventos
})

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

