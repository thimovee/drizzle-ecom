import { notFound } from "next/navigation"
import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { formatPrice } from "@/lib/utils";
import { DropdownMenuSeparator } from "@/components/ui/DropdownMenu";
import CloseModal from "@/components/CloseModal";
import { Loader } from "lucide-react";


export default async function DeleteProduct({ params }: { params: { id: number } }) {
    const res = await db.select().from(products).where(eq(products.id, params.id));
    const product = res[0]

    if (!product) {
        return notFound()
    }

    return (
        <>
            <div className='fixed inset-0 bg-zinc-900/20 z-50 w-[100dvw]'>
                <div className='container flex items-center h-full max-w-lg mx-auto'>
                    <div className='flex flex-col bg-white w-full h-fit pt-8 pb-16 px-2 rounded-lg'>
                        <div className='flex justify-between items-center p-3 border-b border-neutral-400'>
                            <h2 className="text-2xl font-bold">Delete Product</h2>
                            <CloseModal path={"products"} />
                        </div>

                        <div className="p-3 flex flex-col items-center">
                            {product ? <>
                                <div className="flex flex-col gap-3 border p-4 border-slate-200 rounded-md max-w-md my-4 min-w-[450px] min-h-[250px]">
                                    <h2 className="font-semibold text-lg">{product.name}</h2>
                                    <span className="text-slate-600">{product.description!.slice(0, 200)}...</span>
                                    <DropdownMenuSeparator />
                                    <div className="flex justify-between">
                                        <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                                        <span>{product.inventory} in stock</span>
                                    </div>
                                    <div className="flex flex-col items-center mt-4">
                                        <span>{product.rating}/5</span>
                                        <span className="text-sm text-slate-600">Rating</span>
                                    </div>

                                </div>
                                <div className="mt-4 hover:cursor-not-allowed font-medium text-slate-100 bg-red-500 px-4 py-2 rounded-md">
                                    You need <span className="text-white font-bold">admin privileges</span> to delete this product.
                                </div>
                            </> : <Loader />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}