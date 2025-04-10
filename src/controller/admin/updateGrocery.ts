import express, { Router } from 'express';
import { AppDataSource } from '../../db';
import { Grocery } from '../../models/Grocery';

const router = Router();

export const updateGroceryRouter = router.post('/update-grocery/', async (req, res) => {
    try {
        const { id }: any = req?.query

        const {description, price, unit, category, inventory } = req?.body;
        if (!id) {
            return res.status(400).json({ error: "Id is required" })
        }
        const groceryRepository = await AppDataSource.getRepository(Grocery);

        const check = groceryRepository.findOne({ where: { id: parseInt(id) } });

        if (!check) {
            return res.status(400).json({ msg: "No data found for this id" })
        }
        const saveData = {
            description,
            price,
            unit,
            category,
            inventory
        };

        const updateData = await groceryRepository.update({ id: parseInt(id) }, { ...saveData });
        return res.status(200).json({ msg: "Data updated successfully", updateData })
    } catch (error) {
        console.error("Error update grocery:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})