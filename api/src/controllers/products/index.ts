import { Request, Response } from "express";

export function getAllProducts(req: Request, res: Response) {
	res.send("List of all products");
}

export function getProductById(req: Request, res: Response) {
	const id = req.params.id;
	res.send(`PRODUCT #${id}`);
}

export function createProduct(req: Request, res: Response) {
	console.log("body", req.body);
	res.send("Added new product");
}

export function updateProduct(req: Request, res: Response) {
	res.send("Updating Product");
}

export function archiveProduct(req: Request, res: Response) {
	res.send("List of all products");
}
