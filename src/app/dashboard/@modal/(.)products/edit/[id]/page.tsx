import { notFound } from "next/navigation"
import { db } from "@/db"
import {  products } from "@/db/schema"
import { eq } from "drizzle-orm"
import EditProductForm from "@/components/forms/EditProductForm";
import CloseModal from '@/components/CloseModal'
import getCategories from "@/lib/getAllCategories";

export default async function EditProduct({ params }: { params: { id: number } }) {
    const allCategories = await getCategories()
    const res = await db.select().from(products).where(eq(products.id, params.id));
    const product = res[0]

    if (!product) {
        return notFound()
    }

    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-50 w-[100dvw]'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='flex flex-col bg-white w-full h-fit pt-8 pb-16 px-2 rounded-lg'>
                    <div className='flex justify-between items-center p-3 border-b border-neutral-400'>
                        <h2 className="text-2xl font-bold">Edit Product</h2>
                        <CloseModal path={"products"} />
                    </div>

                    <div className="p-3">
                        <EditProductForm categories={allCategories} product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}