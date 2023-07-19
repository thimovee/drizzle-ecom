"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/Button'
import { cn } from '@/lib/utils'
import { DollarSign, Menu, Package, Tv2, User } from 'lucide-react'

const Sidebar = () => {

    const paths = [
        { name: 'Account', icon: User, link: '/dashboard/' },
        { name: 'Products', icon: Package, link: '/dashboard/products' },
        { name: 'Categories', icon: Menu, link: '/dashboard/categories' },
        { name: 'Orders', icon: DollarSign, link: '/dashboard/orders' },
    ]
    const pathname = usePathname()
    return (
        <aside className='  hidden sm:flex min-h-full flex-col border-r border-slate-200 w-fit px-4 md:px-0  md:w-56 items-center xl:items-start'>
            <ul className="flex flex-col gap-3 first:mt-10">
                {paths.map((path, index) => (
                    <Link href={path.link} key={index}>
                        <h2 className={cn(buttonVariants({ variant: "ghost" }), "flex gap-2  justify-start w-40 items-center", pathname === `/dashboard/${path.name.toLowerCase()}` && 'text-black bg-slate-100')}> <path.icon className='"w-4 h-4' /> {path.name}</h2>
                    </Link>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar