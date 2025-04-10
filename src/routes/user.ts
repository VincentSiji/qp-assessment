import express, { Router } from 'express';
import { getGroceryRouter } from '../controller/user/viewGrocery';
import { placeOrderRouter } from '../controller/user/placeOrder';

const router = Router();

router.use('/', getGroceryRouter);
router.use('/', placeOrderRouter);

export default router;