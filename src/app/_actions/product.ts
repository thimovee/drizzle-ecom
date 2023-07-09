"use server"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, type Product } from "@/db/schema"
import { z } from "zod"
import { productSchema } from "@/lib/validations/product"
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

    revalidatePath(`/dashboard/products`);
}

