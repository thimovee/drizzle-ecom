
import { Combobox } from "../Search";
import { FC } from "react";
import { UserAccountNav } from "./UserAccountNav";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import React from "react";
import NavItems from "./NavItems";
import NavbarActions from "./NavActions";
import MobileNav from "./MobileNav";

interface NavbarProps { }


const Navbar: FC<NavbarProps> = async () => {
    const user = await currentUser();
    const navProducts = await db.select().from(products).limit(2)
    const allCategories = await db.select().from(categories)
    return (
        <nav className="px-4 2xl:px-0 w-full border-b sticky top-0 bg-white z-50">
            <div className="max-w-7xl flex justify-between mx-auto py-4">
                <div className="flex gap-4 lg:gap-6 items-center">
                    <a href="/" className="font-bold text-xl mr-4">ECOM</a>
                    <NavItems categories={allCategories} products={navProducts} />
                    <MobileNav />
                </div>
                <div className="hidden md:flex"><Combobox /></div>
                <div className="flex gap-3 items-center">
                    <UserAccountNav user={user} />
                    <NavbarActions />
                </div>
            </div>
        </nav>
    )
};

export default Navbar;