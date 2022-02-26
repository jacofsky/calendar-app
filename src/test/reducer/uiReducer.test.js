import { uiReducer } from "../../reducers/uiReducer"
import { types } from "../../types/types"

const initialState = {
    modalOpen: false
}


describe('Test in uiReducer', () => { 
    
    test('should return default state', () => { 
        
        const state = uiReducer(initialState, {})

        expect(state).toEqual(initialState)

    })

    test('should return default state', () => { 
        
        const state = uiReducer(initialState, {type: types.uiOpenModal})

        expect(state).toEqual({
            modalOpen: true
        })

        const stateClose = uiReducer(initialState, {type: types.uiCloseModal})

        expect(stateClose).toEqual({
            modalOpen: false
        })

    })

})