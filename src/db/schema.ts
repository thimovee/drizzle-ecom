import type { CartItem, StoredFile } from "@/types"
import { sql, type InferModel } from "drizzle-orm"
import { boolean, datetime, decimal, int, json, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core"

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

export type Product = InferModel<typeof products>


export const categories = mysqlTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 191 }).notNull(),
    thumbnail: json("thumbnail").$type<StoredFile | null>().default(null),
    description: text("description").notNull().default("Category Description"),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP(3)`),
},)

export const orders = mysqlTable("orders", {
    id: serial("id").primaryKey(),
    isPaid: boolean("isPaid").default(false),
    phone: varchar("phone", { length: 255 }).default(""),
    address: text("address").default(""),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP(3)`),
    orderId: varchar("orderId", { length: 255 }).default("").notNull(),
});

export const orderItems = mysqlTable("orderItems", {
    id: serial("id").primaryKey(),
    orderId: varchar("orderId", { length: 255 }).default("").notNull(),
    productId: int("productId"),
});


export type orderItems = InferModel<typeof orderItems> & {
    product: Product;
}

export type Order = InferModel<typeof orders> & {
    orderItems: InferModel<typeof orderItems>[];
};

export type Category = InferModel<typeof categories>
