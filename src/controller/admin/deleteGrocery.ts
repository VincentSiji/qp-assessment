import express, { Router } from 'express';
import { AppDataSource } from '../../db';
import { Grocery } from '../../models/Grocery';

const router = Router();
export const deleteGrocery = router.delete('/delete-grocery/', async (req, res) => {
    try {
        const { id }: any = req?.query
        if (!id) {
            return res.status(400).send({ error: "Id is required" })
        }
        const groceryRepository = AppDataSource.getRepository(Grocery);
        const check = await groceryRepository.findOne({
            where: { id: parseInt(id) }
        })
        if (!check) {
            return res.status(400).json({ msg: "No data found for this id" })
        } else {
            const deleteData = await groceryRepository.delete(id)

            return res.status(200).json({ deleteData, msg: "Data delete successfully" })
        }
    } catch (error) {
        console.error("Error deleting grocery:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})