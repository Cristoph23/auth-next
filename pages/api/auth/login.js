import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

export default function loginHandler(req, res) {
    const {email, password} = req.body

    if(email == "admin@admin.com" && password == '123456'){
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email: 'admin@admin.com',
            username: 'Cris'
        }, 'secret')

        const serialized = serialize('myTokenName', token, {
            httpOnly: true, // Solo aceptar en http, herramientas de desarrollador no podra.
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', // Backend Interno Estricto
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })
    
        res.setHeader('Set-Cookie', serialized)
        return res.json('login succesfuly')
    }

    return res.status(401).json({error: 'Email o Password Invalido'})
}