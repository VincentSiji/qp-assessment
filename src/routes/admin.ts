import { Router } from "express"
import { addGroceryRouter } from "../controller/admin/addGrocery"
import { getGroceryRouter } from "../controller/admin/viewGrocery"
import { deleteGrocery } from "../controller/admin/deleteGrocery"
import { updateGroceryRouter } from "../controller/admin/updateGrocery"
import { manageInventoryRouter } from "../controller/admin/manageInventory"

const router = Router()

router.use('/', addGroceryRouter)
router.use('/', getGroceryRouter)
router.use('/', deleteGrocery)
router.use('/', updateGroceryRouter)
router.use('/', manageInventoryRouter)

export default router;