import { Router } from "express";
import {
	archiveProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../../controllers/products";
import { validateData } from "../../middlewares/validationMiddleware";
import { zProductSchema } from "../../schemas/productsSchema";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validateData(zProductSchema), createProduct);
router.put("/:id", validateData(zProductSchema), updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/archive/:id", archiveProduct);
export default router;
