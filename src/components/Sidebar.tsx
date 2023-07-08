"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/Button'
import { cn } from '@/lib/utils'
import { DollarSign, Menu, Package, User } from 'lucide-react'

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <aside className='  hidden sm:flex min-h-full flex-col border-r border-slate-200 w-fit px-4 md:px-0  md:w-56 items-center xl:items-start gap-3'>
            <Link href='/dashboard/' >
                <h2 className={cn(buttonVariants({ variant: "ghost" }), "mt-10 flex gap-2  justify-start w-40 items-center", pathname === '/dashboard' && 'text-black bg-slate-100')}>
                    <User className='"w-4 h-4' /> Account</h2>
            </Link>
            <Link href='/dashboard/products' >
                <h2 className={cn(buttonVariants({ variant: "ghost" }), "flex gap-2  justify-start w-40 items-center", pathname === '/dashboard/products' && 'text-black bg-slate-100')}> <Package className='"w-4 h-4' />  Products</h2>
            </Link>
            <Link href='/dashboard/categories' >
                <h2 className={cn(buttonVariants({ variant: "ghost" }), "flex gap-2  justify-start w-40 items-center", pathname === '/dashboard/categories' && 'text-black bg-slate-100')}> <Menu className='"w-4 h-4' /> Categories</h2>
            </Link>
            <Link href='/dashboard/orders' >
                <h2 className={cn(buttonVariants({ variant: "ghost" }), "flex gap-2  justify-start w-40 items-center", pathname === '/dashboard/orders' && 'text-black bg-slate-100')}> <DollarSign className='"w-4 h-4' /> Orders</h2>
            </Link>
        </aside>
    )
}

export default Sidebar