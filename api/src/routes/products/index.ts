import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.send("List of products");
});
router.get("/:id", (req, res) => {
	const id = req.params.id;
	res.send(`PRODUCT #${id}`);
});
router.post("/", (req, res) => {
	res.send("Added new products");
});

export default router;
