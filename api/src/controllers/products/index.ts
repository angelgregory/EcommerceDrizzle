import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { and, eq, isNotNull, isNull } from "drizzle-orm";
import _ from "lodash";
import { zProductSchema } from "../../schemas/productsSchema";

//GET ALL PRODUCTS
export async function getAllProducts(req: Request, res: Response) {
	try {
		const products = await db.select().from(productsTable).where(isNull(productsTable.deleted_at));
		res.status(200).json({ message: "Products fetched sucessfully", products });
	} catch (error) {
		res.status(500).send(error);
	}
}

//GET PRODUCT BY ID
export async function getProductById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const [product] = await db
			.select()
			.from(productsTable)
			.where(and(isNull(productsTable.deleted_at), eq(productsTable.id, parseInt(id))));

		if (!product) {
			res.status(404).send({ message: "Product Not Found" });
		} else {
			res.status(200).json({ message: "Product fetched sucessfully", product });
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

// CREATE PRODUCT
export async function createProduct(req: Request, res: Response) {
	try {
		const [product] = await db.insert(productsTable).values(req.cleanBody).returning();
		res.status(201).json({ message: "Product added successfully.", product });
	} catch (error) {
		res.status(500).send(error);
	}
}

//UPDATE PRODUCT
export async function updateProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const body = req.cleanBody;

		const [product] = await db
			.update(productsTable)
			.set(body)
			.where(and(isNull(productsTable.deleted_at), eq(productsTable.id, parseInt(id))))
			.returning();
		if (product) {
			res.status(200).json({ message: "Product updated sucessfully", product });
		} else {
			res.status(404).send({ message: "Product was not found." });
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

//ARCHIVE PRODUCT
export async function archiveProduct(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const [archivedProduct] = await db
			.update(productsTable)
			.set({ deleted_at: new Date() }) // Set the deleted_at timestamp
			.where(and(isNull(productsTable.deleted_at), eq(productsTable.id, parseInt(id))))
			.returning();

		if (archivedProduct) {
			res.status(200).json({ message: "Product archived successfully", archivedProduct });
		} else {
			res.status(404).send({ message: "Product was not found." });
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function deleteProduct(req: Request, res: Response) {
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
