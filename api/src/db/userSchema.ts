import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	address: text(),
	role: varchar({ length: 255 }).notNull().default("user"),
});
