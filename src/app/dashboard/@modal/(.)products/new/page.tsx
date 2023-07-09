import { AddProductForm } from '@/components/AddProductForm'
import CloseModal from '@/components/CloseModal'
import React from 'react'

const Page = () => {
    return (
        <div className='fixed inset-0 bg-zinc-900/20 z-50'>
            <div className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='relative bg-white w-full h-fit py-16 px-2 rounded-lg'>
                    <div className='absolute top-4 right-4'>
                        <CloseModal />
                    </div>

                    <div className="p-3">
                        <AddProductForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
