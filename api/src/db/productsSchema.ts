import { doublePrecision, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	image: varchar({ length: 255 }),
	price: doublePrecision().notNull(),
	deleted_at: timestamp(),
});
