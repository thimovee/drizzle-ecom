"use server"
import { db } from "@/db"
import { Product, categories, products } from "@/db/schema"
import {
    asc,
    gte,
    inArray,
    lte,
    and, eq, sql, desc
} from "drizzle-orm"
import { z } from "zod"
import { getProductsSchema, productSchema } from "@/lib/validations/product"
import { StoredFile } from "@/types"

export async function addProduct(
    input: z.infer<typeof productSchema> & {
        images: StoredFile[] | null
    }
) {
    const { images, ...otherData } = input;

    const productData = {
        ...otherData,
        price: otherData.price.toString(),
        images: images !== null ? JSON.stringify(images) : null,
    };
    // @ts-ignore
    await db.insert(products).values(productData);
}

export async function updateProduct(
    input: z.infer<typeof productSchema> & {
        id: number
        images: StoredFile[] | null
    }
) {
    if (typeof input.id !== "number") {
        throw new Error("Invalid input.")
    }

    const product = await db.query.products.findFirst({
        where: and(eq(products.id, input.id), eq(products.id, input.id)),
    })

    if (!product) {
        throw new Error("Product not found.")
    }

    await db.update(products).set(input).where(eq(products.id, input.id))
}

export async function filterProductsAction(query: string) {
    if (query.length === 0) return null

    const filteredProducts = await db.execute(sql`
    SELECT * FROM products WHERE name LIKE ${'%' + query + '%'} 
  `)
    console.log(filteredProducts.rows)
    return filteredProducts.rows
}

export async function getProductsAction(
    input: z.infer<typeof getProductsSchema>
) {
    const [column, order] =
        (input.sort?.split(".") as [
            keyof Product | undefined,
            "asc" | "desc" | undefined
        ]) ?? []
    const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
    const categories =
        // @ts-ignore
        (input.categories?.split(".") as Product["categoryId"][]) ?? []

    const { items, total } = await db.transaction(async (tx) => {
        const items = await tx
            .select()
            .from(products)
            .limit(input.limit)
            .offset(input.offset)
            .where(
                and(
                    categories.length
                        ? inArray(products.categoryId, categories)
                        : undefined,
                    minPrice ? gte(products.price, minPrice) : undefined,
                    maxPrice ? lte(products.price, maxPrice) : undefined,
                )
            )
            .orderBy(
                column && column in products
                    ? order === "asc"
                        ? asc(products[column])
                        : desc(products[column])
                    : desc(products.createdAt)
            )

        const total = await tx
            .select({
                count: sql<number>`count(${products.id})`,
            })
            .from(products)
            .where(
                and(
                    categories.length
                        ? inArray(products.categoryId, categories)
                        : undefined,
                    minPrice ? gte(products.price, minPrice) : undefined,
                    maxPrice ? lte(products.price, maxPrice) : undefined,
                )
            )

        return {
            items,
            total: Number(total[0]?.count) ?? 0,
        }
    })

    return {
        items,
        total,
    }
}