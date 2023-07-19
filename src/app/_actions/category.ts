"use server"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { z } from "zod"
import { categorySchema } from "@/lib/validations/category"
import { eq } from "drizzle-orm"


export async function addCategory(input: z.infer<typeof categorySchema>) {

    const categoryWithSameName = await db.query.categories.findFirst({
        where: eq(categories.name, input.name),
    })

    if (categoryWithSameName) {
        throw new Error("A category with this name already exists.")
    }

    const { ...otherData } = input;

    const categoryData = {
        ...otherData,
    };
    // @ts-ignore
    await db.insert(categories).values(categoryData);
}