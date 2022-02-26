import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Test in fetch', () => { 

    let token = ''
    
    test('FetchSinToken should work', async() => { 
        const resp = await fetchSinToken(
            'auth', 
            {
                email: "jaco@gmail.com", 
                password: "123456"
            }, 
            'POST'
        )

        expect(resp instanceof Response).toBe(true)

        const body = await resp.json()
        expect(body.ok).toBe(true)

        token = body.token

    })

    test('FetchConToken should work', async() => { 
        
        localStorage.setItem('token', token)

        const resp = await fetchConToken('events/12191a43f5a4cad59127adbc', {}, 'DELETE')

        expect(resp instanceof Response).toBe(true)
        
        const body = await resp.json()
        expect(body.msg).toBe('Por favor hable con el administrador')

    })

})