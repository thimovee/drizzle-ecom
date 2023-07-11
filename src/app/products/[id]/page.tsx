import { notFound } from "next/navigation"
import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"


export default async function ProductPage({ params }: { params: { id: number } }) {
    const res = await db.select().from(products).where(eq(products.id, params.id));
    const product = res[0]

    if (!product) {
        return notFound()
    }

    return (
        <div>
            {product.name}
        </div>
    )
}