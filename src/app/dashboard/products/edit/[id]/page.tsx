import { notFound } from "next/navigation"
import { db } from "@/db"
import { categories, products } from "@/db/schema"
import { eq } from "drizzle-orm"
import EditProductForm from "@/components/forms/EditProductForm";
import { Metadata } from 'next'
import getCategories from "@/lib/getAllCategories";

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const id = Number(params.id)
    const product = await db.select().from(products).where(eq(products.id, id));
    return {
        title: `Edit ${product[0].name}`,
        description: `Edit the product data of ${product[0].name}`,
    }
}


export default async function EditProduct({ params }: { params: { id: number } }) {
    const allCategories = await getCategories()
    const res = await db.select().from(products).where(eq(products.id, params.id));
    const product = res[0]

    if (!product) {
        return notFound()
    }

    return (
        <>
            <h1 className="font-bold text-3xl mb-10">Edit Product</h1>
            <EditProductForm categories={allCategories} product={product} /></>
    )
}