"use server"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, type Product } from "@/db/schema"
import { z } from "zod"
import { getProductSchema, productSchema } from "@/lib/validations/product"
import { StoredFile } from "@/types"
import { and, eq } from "drizzle-orm"

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
    revalidatePath(`/dashboard/products`);
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
    revalidatePath(`/dashboard/products/${input.id}`)
}
