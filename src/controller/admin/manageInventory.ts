import express, { Response, Router, Request } from 'express';
import { AppDataSource } from '../../db';
import { body } from 'express-validator';
import handleValidationErrors from '../../middlewares/validate-request';
import { Grocery } from '../../models/Grocery';


const router = Router();
export const manageInventoryRouter = router.post('/manage-inventory/',
    [
        body('inventory').exists().withMessage('inventory is required'),

    ], handleValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { id }: any = req?.query;
            const { inventory } = req?.body;
            if (!id) {
                return res.status(400).json({ error: "Id is required" })
            }
            const groceryRepository = AppDataSource.getRepository(Grocery);

            const check = await groceryRepository.findOne({ where: { id: parseInt(id) } });

            if (!check) {
                return res.status(400).json({ msg: "No data found for this id" })
            }

            const updateInventory = await groceryRepository.update({ id: parseInt(id) }, { inventory });

            return res.status(200).json({ msg: "Inventory updated successfully", updateInventory })
        } catch (error) {
            console.error("Error inventory management:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    })