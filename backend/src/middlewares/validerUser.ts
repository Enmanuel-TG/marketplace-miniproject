import { PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();


const validerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, age } = req.body;
    const parsedage = parseInt(age);
    try {
        const userFound = await prisma.user.findFirst({
            where: {
                email,
            }
        });
            if (userFound) {
                return res.status(409).json({ error: 'Email is already in use' });
        }
            if (parsedage < 18) {
                return res.status(404).json(["Edad insuficiente"])
        }
            const passwordhash = await bcrypt.hash(password, 10);
            if (!passwordhash) {
                return res.status(404).json(["Incorrect password"])
        };

        return next();
    } catch (error) {
        console.log("" + error);
        return res.status(500).json({
            message: "Error  internal server",
            error: error,
        })
    }
}

export default validerUser;


// import { PrismaClient } from '@prisma/client';
// import { Response, Request } from "express";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// const validerUser = async (req: Request, res: Response) => {
//     const { email, password, age } = req.body;
//     const parsedage = parseInt(age);

//     try {
//         const userFound = await prisma.user.findFirst({
//             where: {
//                 email,
//             }
//         });

//         if (userFound) {
//             return res.status(409).json({ error: 'Email is already in use' });
//         }

//         if (parsedage < 18) {
//             return res.status(404).json(["Edad insuficiente"]);
//         }

//         const passwordhash = await bcrypt.hash(password, 10);
//         if (!passwordhash) {
//             return res.status(500).json({ message: "Error hashing password" });
//         }
//         return res.status(200).json({ message: 'User validation successful' });

//     } catch (error) {
//         console.log("" + error);
//         return res.status(500).json({
//             message: "Internal server error",
//             error: error,
//         });
//     }
// };

// export default validerUser;
