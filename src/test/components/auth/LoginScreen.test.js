import React from 'react'
import LoginScreen from '../../../components/auth/LoginScreen';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock(('../../../actions/auth'), () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))



jest.mock(('sweetalert2'), () => ({
    fire: jest.fn()
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen/>
    </Provider>
)


describe('Test in LoginScreen', () => { 

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should correctly', () => { 
        expect(wrapper).toMatchSnapshot()
    })

    test('should call dispatch login', () => { 
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'jaco@gmail.com'
            }
        })
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        })

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })

        expect(startLogin).toHaveBeenCalledWith('jaco@gmail.com', '123456')

    })

    test('should not register if the passwords are not equal', () => { 

        wrapper.find('input[name="rNombre"]').simulate('change', {
            target: {
                name: 'rNombre',
                value: 'Jaco'
            }
        })
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'jaco@gmail.com'
            }
        })
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '1234567'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect(startRegister).not.toHaveBeenCalled()
        expect(Swal.fire).toHaveBeenCalled()

    })

    test('should not register if the passwords are not equal', () => { 

        wrapper.find('input[name="rNombre"]').simulate('change', {
            target: {
                name: 'rNombre',
                value: 'Jaaaaco'
            }
        })
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'jaco@gmail.com'
            }
        })
        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        })

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect(Swal.fire).not.toHaveBeenCalled()
        expect(startRegister).toHaveBeenCalledWith("Jaaaaco", "jaco@gmail.com", "123456")

    })

 })