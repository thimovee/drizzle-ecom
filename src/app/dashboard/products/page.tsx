import { DataTable } from '@/app/dashboard/products/components/DataTable'
import { db } from '@/db'
import { categories, products } from '@/db/schema'
import { Metadata } from 'next'
import React from 'react'
import { eq } from 'drizzle-orm'
import { ExtendedProduct, columns } from '@/app/dashboard/products/components/Columns'

export const revalidate = 0

export const metadata: Metadata = {
    title: "Dashboard | Products",
    description: "Manage your products",
}

const page = async () => {
    const productList: ExtendedProduct[] = await (await db
        .select()
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .execute())
        .map((item) => ({
            ...item.products,
            categoryName: item.categories?.name ?? "",
        }));


    return (
        <div className="w-full h-full px-2  mx-auto">
            <div className="flex flex-col gap-2 mb-20">
                <h1 className="font-bold text-3xl">Products</h1>
                <DataTable data={productList} columns={columns} />
            </div>
        </div>
    )
}

export default page