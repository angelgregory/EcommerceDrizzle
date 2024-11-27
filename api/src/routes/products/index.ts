import { Router } from "express";
import {
	archiveProduct,
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../../controllers/products";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", archiveProduct);

export default router;
