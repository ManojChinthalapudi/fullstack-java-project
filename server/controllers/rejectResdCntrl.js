import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createRejectResidency = asyncHandler(async (req, res) => {
    // console.log("endpoint created")
    const { title, description, price,address, country, city, image,
        userEmail } = req.body.data
    console.log(req.body.data)
    
    const finalImage = image || '/logo1.png'; // Use a default image path

    try { 
        const RejectResidency = await prisma.rejectResidency.create({
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
        res.send({message:"Reject Residency created successfully",RejectResidency})
    }
    catch (err) {
        if (err.code === "p2002")
        {
            throw new Error("A RejectResidency with address already exists")
        }
        throw new Error(err.message)
    }
});
export const getAllRejectResedencies = asyncHandler(async (req, res) => {
    const Rejectresidencies = await prisma.rejectResidency.findMany({
        orderBy: { createdAt :"desc"}
        
    })
    res.send(Rejectresidencies)
})
//get Approval needed residency by id
// export const getRejectResidency = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const RejectResidency = await prisma.RejectResidency.findUnique({
//             where: { id }
//         });
//         console.log("ID:", id);
//         console.log("RejectResidency:", RejectResidency);

//         res.send(RejectResidency);
//         res.send({message:"RejectResidency created successfully",RejectResidency})
//     } catch (err) {
//         throw new Error(err.message)
//     }
    
// })
export const getRejectResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const RejectResidency = await prisma.rejectResidency.findUnique({
            where: { id }
        });
        console.log("ID:", id);
        console.log("RejectResidency:", RejectResidency);

        if (!RejectResidency) {
            return res.status(404).json({ message: "Reject residency not found" });
        }

        res.status(200).json({ message: "RejectResidency fetched successfully", RejectResidency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

