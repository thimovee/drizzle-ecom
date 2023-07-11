import { notFound } from "next/navigation"
import { db } from "@/db"
import { categories, products } from "@/db/schema"
import { eq } from "drizzle-orm"
import EditProductForm from "@/components/EditProductForm";
import { Loader } from "lucide-react";
import CloseModal from '@/components/CloseModal'

export default async function EditProduct({ params }: { params: { id: number } }) {
    const allCategories = await db.select().from(categories)
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
                        {allCategories.length > 0 ? <EditProductForm categories={allCategories} product={product} /> : <Loader />}
                    </div>
                </div>
            </div>
        </div>
    )
}