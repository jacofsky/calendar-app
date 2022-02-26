import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import Swal from 'sweetalert2';

import { startChecking, startLogin, startRegister } from '../../actions/auth'
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch'


jest.mock(('sweetalert2'), () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn()

describe('Test in auth actions', () => { 

    beforeEach(() => {
        store = mockStore(initState),
        jest.clearAllMocks()
    })
    
    test('should startLogin correct', async() => { 

        await store.dispatch(startLogin('jaco@gmail.com', '123456'))

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))


        // console.log(localStorage.setItem.mock.calls[0][1]) FORMA DE VER INFO DE MOCK


    })

    test('should startLogin Incorrect', async() => { 

        await store.dispatch(startLogin('jaco@gmail.com', '12342256'))
        let actions = store.getActions()

        expect(actions).toEqual([])
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecta", "error")

        await store.dispatch(startLogin('jacoaaaaadsadsas@gmail.com', '123456'))
        actions = store.getActions()

        expect(Swal.fire).toHaveBeenCalledWith("Error", "El usuario no existe con ese email", "error")


    })

    test('should startRegister correct', async() => { 
 
        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carl',
                    token: 'ABC123ABC123'
                }
            }
        }))
        
        await store.dispatch(startRegister('test', 'test@test.com', '123456'))

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carl'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    })

    test('should startChecking work correct', async() => { 
        
        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carl',
                    token: 'ABC123ABC123'
                }
            }
        }))

        await store.dispatch(startChecking())

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carl'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))


    })

 })