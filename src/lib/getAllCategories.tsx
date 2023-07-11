import { db } from "@/db";
import { Category, categories } from "@/db/schema";

export default async function getCategories(): Promise<Category[]> {
    const res = await db.select().from(categories)
    return res;
}