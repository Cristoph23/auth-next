import { serialize } from 'cookie';
import { verify } from 'jsonwebtoken';

export default function logoutHandler(req, res){
    const { myTokenName } = req.cookies;

    if(!myTokenName){
        return res.status(401).json({ error: 'no token' })
    }

    try {
        verify(myTokenName, "secret");
        const serialized = serialize('myTokenName', null, {
            httpOnly: true, // Solo aceptar en http, herramientas de desarrollador no podra.
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', // Backend Interno Estricto
            maxAge: 0,
            path: '/'
        })

        res.setHeader('Set-Cookie', serialized)
        res.status(200).json('Logout Succesfully')
    } catch (error) {
        return res.status(401).json({message: "Invalid token"})
    }

}