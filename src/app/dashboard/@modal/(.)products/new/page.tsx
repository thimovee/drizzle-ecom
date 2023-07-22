import { AddProductForm } from '@/components/forms/AddProductForm'
import CloseModal from '@/components/CloseModal'
import getCategories from '@/lib/getAllCategories'
import React from 'react'

const Page = async () => {
    const allCategories = await getCategories()
    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-50 w-[100dvw]'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='flex flex-col bg-white w-full h-fit pt-8 pb-16 px-2 rounded-lg'>
                    <div className='flex justify-between items-center p-3 border-b border-neutral-400'>
                        <h2 className="text-2xl font-bold">Add Product</h2>
                        <CloseModal path={"products"} />
                    </div>

                    <div className="p-3">
                        {allCategories.length > 0 ? <AddProductForm categories={allCategories} /> : <div>loading</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
