import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'
export const createAdminResidency = asyncHandler(async (req, res) => {
    // console.log("endpoint created")
    const { title, description, price,address, country, city, image,
        userEmail } = req.body.data
    console.log(req.body.data)
    
    const finalImage = image || '/logo1.png'; // Use a default image path

    try { 
        const AdminResidency = await prisma.adminResidency.create({
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
        res.send({message:"AdminResidency created successfully",AdminResidency})
    }
    catch (err) {
        if (err.code === "p2002")
        {
            throw new Error("A AdminResidency with address already exists")
        }
        throw new Error(err.message)
    }
});

//get all Approval needed residencies
export const getAllAdminResedencies = asyncHandler(async (req, res) => {
    const Adminresidencies = await prisma.adminResidency.findMany({
        orderBy: { createdAt :"desc"}
        
    })
    res.send(Adminresidencies)
})
//get Approval needed residency by id
// export const getAdminResidency = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     try {
//         const AdminResidency = await prisma.adminResidency.findUnique({
//             where: { id }
//         });
//         console.log("ID:", id);
//         console.log("AdminResidency:", AdminResidency);

//         res.send(AdminResidency);
//         res.send({message:"AdminResidency created successfully",AdminResidency})
//     } catch (err) {
//         throw new Error(err.message)
//     }
    
// })
export const getAdminResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const AdminResidency = await prisma.adminResidency.findUnique({
            where: { id }
        });
        console.log("ID:", id);
        console.log("AdminResidency:", AdminResidency);

        if (!AdminResidency) {
            return res.status(404).json({ message: "Admin residency not found" });
        }

        res.status(200).json({ message: "AdminResidency fetched successfully", AdminResidency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
