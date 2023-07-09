import type { CartItem, StoredFile } from "@/types"
import { sql, type InferModel } from "drizzle-orm"
import { datetime, decimal, int, json, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core"

export const products = mysqlTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description"),
    images: json("images").$type<StoredFile[] | null>().default(null),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    inventory: int("inventory").notNull().default(0),
    rating: int("rating").notNull().default(0),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP(3)`),
    categoryId: int("categoryId").notNull()
})

export type Product = InferModel<typeof products> & {
    categoryName: string;
};


export const categories = mysqlTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP(3)`),
},)

export type Category = InferModel<typeof categories>

export const carts = mysqlTable("carts", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }),
    paymentIntentId: varchar("paymentIntentId", { length: 191 }),
    clientSecret: varchar("clientSecret", { length: 191 }),
    items: json("items").$type<CartItem[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow(),
})

export type Cart = InferModel<typeof carts>

export const wishlists = mysqlTable("wishlists", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }),
    items: json("items").$type<CartItem[] | null>().default(null),
    createdAt: timestamp("createdAt").defaultNow(),
})

export type Wishlist = InferModel<typeof wishlists>
