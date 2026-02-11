import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createAcceptResidency = asyncHandler(async (req, res) => {
    // console.log("endpoint created")
    const { title, description, price,address, country, city, image,
        userEmail } = req.body.data
    console.log(req.body.data)
    
    const finalImage = image || '/logo1.png'; // Use a default image path

    try { 
        const AcceptResidency = await prisma.acceptResidency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                image:finalImage,
                owner: {
                    connect: { email: userEmail }
                },
            },
        });
        res.send({message:"Accept Residency created successfully",AcceptResidency})
    }
    catch (err) {
        if (err.code === "p2002")
        {
            throw new Error("A AcceptResidency with address already exists")
        }
        throw new Error(err.message)
    }
});
export const getAllAcceptResedencies = asyncHandler(async (req, res) => {
    const Acceptresidencies = await prisma.acceptResidency.findMany({
        orderBy: { createdAt :"desc"}
        
    })
    res.send(Acceptresidencies)
})
//get Approval needed residency by id
// export const getAcceptResidency = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const AcceptResidency = await prisma.acceptResidency.findUnique({
//             where: { id }
//         });
//         console.log("ID:", id);
//         console.log("AcceptResidency:", AcceptResidency);

//         res.send(AcceptResidency);
//         res.send({message:"AcceptResidency created successfully",AcceptResidency})
//     } catch (err) {
//         throw new Error(err.message)
//     }
    
// })
export const getAcceptResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const AcceptResidency = await prisma.acceptResidency.findUnique({
            where: { id }
        });
        console.log("ID:", id);
        console.log("AcceptResidency:", AcceptResidency);

        if (!AcceptResidency) {
            return res.status(404).json({ message: "Accept residency not found" });
        }

        res.status(200).json({ message: "AcceptResidency fetched successfully", AcceptResidency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

