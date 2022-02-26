import React from 'react'
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { act } from '@testing-library/react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { messages } from '../../../helpers/calendar-messages-es'
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';

jest.mock(('../../../actions/events'), () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    calendar: {
        events: [],
        activeEvent: null
    },
    auth: {
        uid: '123ABC'
    },
    ui: {
        openModal: false
    }
}

let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
)




describe('Test in CalendarScreen', () => { 

    test('should show correctly', () => { 

        expect(wrapper).toMatchSnapshot()

    })

    test('Test with calendar interactions', () => { 
        
        const calendar = wrapper.find('Calendar')

        const calendarMessages = calendar.prop('messages')
        expect(calendarMessages).toEqual(messages)

        calendar.prop('onDoubleClickEvent')()
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal})

        calendar.prop('onSelectEvent')({start: 'Hola'})
        expect(eventSetActive).toHaveBeenCalledWith({start: 'Hola'})

        act(() => { 

            calendar.prop('onView')('week')
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')
            
        })





    })

})