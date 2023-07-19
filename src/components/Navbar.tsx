
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Combobox } from "./Search";
import Link from "next/link";
import { FC } from "react";
import { UserAccountNav } from "./UserAccountNav";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import React from "react";
import NavItems from "./NavItems";
import { Input } from "./ui/input";
import NavbarActions from "./NavActions";


interface NavbarProps { }


const Navbar: FC<NavbarProps> = async () => {
    const user = await currentUser();
    const navProducts = await db.select().from(products).limit(2)
    const allCategories = await db.select().from(categories)
    return (
        <nav className="w-full border-b sticky top-0 bg-white z-50">
            <div className="max-w-7xl flex justify-between mx-auto py-4">
                <div className="flex gap-4 lg:gap-6 items-center">
                    <Link href="/" className="font-bold text-xl mr-4">ECOM</Link>
                    <NavItems categories={allCategories} products={navProducts} />
                </div>
                <Combobox />
                <div className="flex gap-3 items-center">
                    <UserAccountNav user={user} />
                    <NavbarActions />
                </div>
            </div>
        </nav>
    )
};

export default Navbar;