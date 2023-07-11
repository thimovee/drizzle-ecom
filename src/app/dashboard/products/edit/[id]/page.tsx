import { notFound } from "next/navigation"
import { db } from "@/db"
import { categories, products } from "@/db/schema"
import { eq } from "drizzle-orm"
import EditProductForm from "@/components/EditProductForm";

export default async function EditProduct({ params }: { params: { id: number } }) {
    const allCategories = await db.select().from(categories)
    const res = await db.select().from(products).where(eq(products.id, params.id));
    const product = res[0]

    if (!product) {
        return notFound()
    }

    return (
        <EditProductForm categories={allCategories} product={product} />
    )
}