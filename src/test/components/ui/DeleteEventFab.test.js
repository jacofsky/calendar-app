import React from 'react'
import DeletEventFab from '../../../components/ui/DeletEventFab'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { eventStartDelete } from '../../../actions/events';


jest.mock(('../../../actions/events'), () => ({
    eventStartDelete: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <DeletEventFab/>
    </Provider>
)

describe('Test in <DeleteEventFab/>', () => { 
    
    test('should first', () => { 
        expect(wrapper).toMatchSnapshot()
    })

    test('should call eventStartDelete', () => { 
        wrapper.find('button').simulate('click') 
        
        expect(store.dispatch).toHaveBeenCalledWith(eventStartDelete())
    })

})