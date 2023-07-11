import { AddProductForm } from '@/components/AddProductForm'
import getCategories from '@/lib/getAllCategories'
import React from 'react'

const page = async () => {
    const allCategories = await getCategories()
    return (
        <div className="w-full h-full px-2  mx-auto">
            <div className="flex flex-col gap-2 mb-48">
                <h1 className="font-bold text-3xl mb-10">Create Product</h1>
                {allCategories.length > 0 ? <AddProductForm categories={allCategories} /> : <div>loading</div>}
            </div>
        </div>
    )
}

export default page