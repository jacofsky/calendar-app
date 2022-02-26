import React from 'react'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import AppRouter from '../../router/AppRouter';



const middlewares = [thunk]
const mockStore = configureStore(middlewares)



// store.dispatch = jest.fn()





describe('Test in AppRouter', () => { 

    test('should show Loading...', () => { 
        
        const initState = {
            auth: {
                checking: true
            }
        }

        let store = mockStore(initState)


        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        ) 
        
        expect(wrapper).toMatchSnapshot()

    })    

    test('should show publicRoute', () => { 
        
        const initState = {
            auth: {
                checking: false
            }
        }

        let store = mockStore(initState)

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        ) 
        
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.login-container').exists()).toBe(true)


    })    

    test('should show privateRoute', () => { 
        
        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'carl'
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        }

        let store = mockStore(initState)

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        ) 
        
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.calendar-screen').exists()).toBe(true)


    })   
})