import { Grocery } from '../../models/Grocery';
import { AppDataSource } from '../../db';
import express, { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import handleValidationErrors from '../../middlewares/validate-request';
const router = Router();

export const addGroceryRouter = router.post('/add-new-grocery',
    [
        body('name').exists().withMessage('Name is required'),
        body('price').exists().withMessage('Price is required'),
        body('unit').exists().withMessage('Unit is required'),
        body('category').exists().withMessage('Category is required'),
        body('inventory').exists().withMessage('inventory is required'),

    ], handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { name, description, price, unit, category, inventory } = req.body;

            if (!name || !price || !unit) {
                return res.status(200).json({ msg: "field missing" })
            }

            const groceryRepository = AppDataSource.getRepository(Grocery);

            const existingGrocery = await groceryRepository.findOne({
                where: { name }
            });

            if (existingGrocery) {
                return res.status(400).json({ msg: "Already exists" });
            }

            const saveData = {
                description,
                name,
                price,
                unit,
                category,
                inventory
            };

            const saved = await groceryRepository.save(saveData);
            return res.status(200).json({ msg: "Grocery added successfully", data: saved });

        } catch (error) {
            console.error("Error adding grocery:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });

