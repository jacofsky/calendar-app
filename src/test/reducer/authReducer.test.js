import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

const initialState = {
    checking: true
    // uid: null,
    // name: null
}


describe('Test in uiReducer', () => { 
    
    test('should return default state', () => { 
        
        const state = authReducer(initialState, {})

        expect(state).toEqual(initialState)

    })

    test('should return default state', () => { 
        
        const state = authReducer(initialState, {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Testing'
            }
        })
        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'Testing'
        })


        const stateLogout = authReducer(initialState, {type: types.authLogout,})
        expect(stateLogout).toEqual({
            checking: false
        })


        const stateChekingFinish = authReducer(initialState, {type: types.authCheckingFinish,})
        expect(stateLogout).toEqual({
            checking: false
        })

    })

})