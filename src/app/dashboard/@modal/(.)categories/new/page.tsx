import { AddCategoryForm } from '@/components/AddCategoryForm'
import CloseModal from '@/components/CloseModal'
import React from 'react'

const Page = async () => {
    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-50 w-[100dvw]'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='flex flex-col bg-white w-full h-fit pt-8 pb-16 px-2 rounded-lg'>
                    <div className='flex justify-between items-center p-3 border-b border-neutral-400'>
                        <h2 className="text-2xl font-bold">Add Category</h2>
                        <CloseModal path={"categories"} />
                    </div>

                    <div className="p-3">
                        <AddCategoryForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
