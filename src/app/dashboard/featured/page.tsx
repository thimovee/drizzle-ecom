import { db } from '@/db'
import { categories } from '@/db/schema'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Dashboard | Categories",
    description: "Manage your categories",
}


const page = async () => {

    return (
        <div className="w-full min-h-screen px-2  mx-auto">
            <div className="flex flex-col gap-2 mb-20">
                <h1 className="font-bold text-3xl">Featured Products</h1>
                <h2>Hero Product</h2>
            </div>
        </div>
    )
}

export default page