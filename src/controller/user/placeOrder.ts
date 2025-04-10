import express, { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import handleValidationErrors from '../../middlewares/validate-request';
import { Grocery } from '../../models/Grocery';
import { Orders } from '../../models/Order';
import { AppDataSource } from '../../db';

const router = Router();

export const placeOrderRouter = router.post('/place-order',
    [
        body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
        body('items.*.groceryId').isInt({ min: 1 }).withMessage('Valid groceryId is required'),
        body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    ],
    handleValidationErrors, async (req: Request, res: Response) => {
        try {
            const { items } = req.body;

            const groceryRepository = AppDataSource.getRepository(Grocery)
            const orderRepository = AppDataSource.getRepository(Orders);

            let total = 0;
            const orderItems = [];

            for (const item of items) {
                const grocery = await groceryRepository.findOne({
                    where: { id: item?.groceryId }
                });

                if (!grocery) {
                    return res.status(400).json({
                        error: `Grocery item with ID ${item.groceryId} not found`
                    });
                }

                if (grocery.inventory < item.quantity) {
                    return res.status(400).json({
                        error: `Not enough inventory for ${grocery.name}. Available: ${grocery.inventory}`
                    });
                }

                grocery.inventory -= item.quantity;
                await groceryRepository.save(grocery);

                orderItems.push({
                    groceryId: grocery.id,
                    name: grocery.name,
                    quantity: item.quantity,
                    price: grocery.price
                });

                total += grocery.price * item.quantity;
            }

            const newOrder = orderRepository.create({
                items: orderItems,
                total
            });

            const savedOrder = await orderRepository.save(newOrder);

            return res.status(200).json({
                message: "Order created successfully",
                data: savedOrder
            });
        } catch (error) {
            console.error("Error placing order:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

    })