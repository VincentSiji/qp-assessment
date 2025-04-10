import express, { Router } from 'express';
import { AppDataSource } from '../../db';
import { Grocery } from '../../models/Grocery';
const router = Router()

export const getGroceryRouter = router.get('/get-all-grocery', async (req, res) => {
    try {
        const groceryRepository = AppDataSource.getRepository(Grocery)
        const data = await groceryRepository.find({});
        return res.status(200).json({ msg: "Fetched data", data })
    } catch (error) {
        console.error("Error getting grocery:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})