import { PrismaClient } from '@prisma/client';
import { Response, Request } from "express";


const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    const {name,email,password,age,phoneNumber,photo } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                age,
                phoneNumber,
                photo
            }
        })
        return res.status(200).json({
            messege: "Usuario registrado con exito",
            user,
        })
    } catch (error) {
        console.log("" + error)
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: error,
        })
    }
}
