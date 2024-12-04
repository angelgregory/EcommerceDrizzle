import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function getAllProducts(req: Request, res: Response) {
	try {
		const products = await db.select().from(productsTable);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function getProductById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const [product] = await db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, parseInt(id)));

		if (!product) {
			res.status(404).send({ message: "Product Not Found" });
		} else {
			res.status(200).json(product);
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const [product] = await db.insert(productsTable).values(req.body).returning();
		res.status(201).json(product);
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const body = req.body;

		const [product] = await db
			.update(productsTable)
			.set(body)
			.where(eq(productsTable.id, parseInt(id)))
			.returning();
		if (product) {
			res.json(product);
		} else {
			res.status(404).send({ message: "Product was not found." });
		}
	} catch (error) {
		res.status(500).send(error);
	}
}


export async function archive(req:Request,res:Response){

	try {
		
	} catch (error) {
		
	}
}

export async function archiveProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const [deletedProduct] = await db
			.delete(productsTable)
			.where(eq(productsTable.id, parseInt(id)))
			.returning();

		if (deletedProduct) {
			res.status(204).send();
		} else {
			res.status(404).send({ message: "Product was not found." });
		}
	} catch (error) {
		res.status(500).send(error);
	}
}
