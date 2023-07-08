import { db } from '@/db'
import { categories } from '@/db/schema'
import { Metadata } from 'next'
import React from 'react'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'


export const metadata: Metadata = {
    title: "Dashboard | Categories",
    description: "Manage your categories",
}


const page = async () => {
    const allCategories = await db.select().from(categories)
    return (
        <div className="w-full min-h-screen px-2  mx-auto">
            <div className="flex flex-col gap-2 mb-20">
                <h1 className="font-bold text-3xl">Categories</h1>
                <DataTable data={allCategories} columns={columns} />
            </div>
        </div>
    )
}

export default page