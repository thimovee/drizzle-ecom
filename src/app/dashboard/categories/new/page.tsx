import { AddCategoryForm } from '@/components/AddCategoryForm'
import React from 'react'

const page = async () => {
    return (
        <div className="w-full h-full px-2  mx-auto">
            <div className="flex flex-col gap-2 mb-48">
                <h1 className="font-bold text-3xl mb-10">Create Category</h1>
                <AddCategoryForm />
            </div>
        </div>
    )
}

export default page