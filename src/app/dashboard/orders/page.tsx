import { db } from '@/db'
import { Metadata } from 'next'
import React from 'react'
import { sql } from 'drizzle-orm'
import { columns } from './components/Columns'
import { DataTable } from './components/DataTable'
import { Info } from 'lucide-react'
import { ExtendedOrder } from './components/Columns'

export const metadata: Metadata = {
    title: "Dashboard | Orders",
    description: "View all orders.",
}

const page = async () => {
    const filteredOrders = await db.execute<ExtendedOrder[]>(sql`
    SELECT o.id, o.orderId, o.phone, o.address, o.createdAt,
    GROUP_CONCAT(p.name) AS productNames,
    SUM(p.price) AS totalOrderPrice
    FROM orders AS o
    LEFT JOIN orderItems AS oi ON o.orderId = oi.orderId
    LEFT JOIN products AS p ON oi.productId = p.id
    WHERE o.isPaid = 1
    GROUP BY o.id
  `)


    return (
        <div className="w-full h-full px-2  mx-auto">
            <div className="flex flex-col gap-2 mb-20">
                <h1 className="font-bold text-3xl">Orders</h1>
                <p className="flex gap-2 text-sm items-center text-slate-700"> <Info className="w-4 h-4" /> Only paid orders will show up in the table</p>
                {/* @ts-ignore */}
                <DataTable data={filteredOrders.rows} columns={columns} />
            </div>
        </div>
    )
}

export default page