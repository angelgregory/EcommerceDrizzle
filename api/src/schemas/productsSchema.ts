import { createInsertSchema } from "drizzle-zod";
import { productsTable } from "../db/productsSchema";

export const zProductSchema = createInsertSchema(productsTable).omit({ id: true, created_at: true, deleted_at: true });
