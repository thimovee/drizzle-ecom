import { notFound } from "next/navigation"
import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { formatPrice } from "@/lib/utils";
import { DropdownMenuSeparator } from "@/components/ui/DropdownMenu";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";


export default async function DeleteProduct({ params }: { params: { id: number } }) {
    const res = await db.select().from(products).where(eq(products.id, params.id));
    const product = res[0]

    if (!product) {
        return notFound()
    }

    return (
        <>
            <Link className="text-slate-600 hover:text-slate-800 flex gap-2 px-4 py-2 rounded-md items-center" href="/dashboard/products">
                <ChevronLeft className="w-4 h-4" /> Back to products
            </Link>
            <div className="flex flex-col items-center mt-20">
                <h1 className="text-2xl font-bold">Delete Product</h1>
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
                <div className="font-medium text-slate-100 bg-red-500 px-4 py-2 rounded-md">
                    You need <span className="text-white">admin privileges</span> to delete a product.
                </div>
            </div>
        </>
    )
}