import { types } from "../../types/types"

describe('Test in Types', () => { 

    test('should types be equal', () => { 
        expect(types).toEqual({

            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
            eventStartAddNew: '[event] start add new',
            eventSetActive: '[event] Set active',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events Loaded',
            eventLogout: '[event] Events Logout',
        
        
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout event'
        
        })
     })

 })