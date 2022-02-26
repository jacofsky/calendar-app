import React from 'react'
import CalendarModal from '../../../components/calendar/CalendarModal';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moment from 'moment';

import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import Swal from 'sweetalert2';


jest.mock(('../../../actions/events'), () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}))

jest.mock(('sweetalert2'), () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours')

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Soy notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123ABC'
    },
    ui: {
        modalOpen: true
    }
}

let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal/>
    </Provider>
)

describe('Test in <CalendarModal/>', () => { 

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should first', () => { 

        expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
    
    })

    test('should call actualization of modal', () => { 

        wrapper.find('form').simulate('submit', {
            preventDefalut(){}
        })

        expect(eventStartUpdate).toHaveBeenLastCalledWith(initState.calendar.activeEvent)
        expect(eventClearActiveEvent).toHaveBeenLastCalledWith()

    })

    test('should show error if no title', () => { 
        
        wrapper.find('form').simulate('submit', {
            preventDefalut(){}
        })
        
        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)

    })

    test('should create new event', () => { 
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123ABC'
            },
            ui: {
                modalOpen: true
            }
        }
        
        let store = mockStore(initState)
        store.dispatch = jest.fn()
        
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal/>
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefalut(){}
        })

        expect(eventStartAddNew).toHaveBeenLastCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        })

        expect(eventClearActiveEvent).toHaveBeenLastCalledWith()
    
    })

    test('should validate dates', () => { 

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        })

        const hoy = new Date()

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        })
        

        wrapper.find('form').simulate('submit', {
            preventDefalut(){}
        })

        expect(Swal.fire).toHaveBeenCalledWith({"confirmButtonColor": "#dc3545", "icon": "error", "text": "Something went wrong! Check your dates!", "title": "Oops..."})


    })


})
