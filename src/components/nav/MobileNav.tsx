import { Book, Box, BoxSelect, Menu, Search } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/DropdownMenu'
import { Combobox } from '../Search'

const MobileNav = () => {
    return (
        <div className="flex md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Menu className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <ul className="flex flex-col gap-3 py-6">
                        <li className="flex items-center justify-center">
                            <Combobox />
                        </li>
                        <li className="w-full">
                            <a className="flex gap-2 items-center ml-2" href="/products?price=0">
                                <Box className="h-4 w-4" />
                                <span className="w-20">Products</span>
                            </a>
                        </li>
                        <li className="w-full">
                            <a className="flex gap-2 items-center ml-2" href="/products?price=0">
                                <BoxSelect className="h-4 w-4" />
                                <span className="w-20">Categories</span>
                            </a>
                        </li>
                        <li className="w-full">
                            <a className="flex gap-2 items-center ml-2" href=" /about">
                                <Book className="h-4 w-4" />
                                <span className="w-20">About</span>
                            </a>
                        </li>
                    </ul>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

export default MobileNav