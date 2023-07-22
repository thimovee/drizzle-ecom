"use client"
import { FC } from "react";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "../ui/navigation-menu";
import { Category, Product } from "@/db/schema";
import { cn } from "@/lib/utils";
import {  Store } from "lucide-react";
import { usePathname } from 'next/navigation'
interface NavItemProps {
    categories: Category[],
    products: Product[]
}


const NavItems: FC<NavItemProps> = async ({ categories, products }) => {
    const currentPath = usePathname()
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="focus-visible:bg-slate-100 transition-colors data-[state=open]:bg-slate-100 data-[state=open]:text-black text-slate-800">Products</NavigationMenuTrigger>
                    <NavigationMenuContent className="NavigationMenuContent z-50 bg-white h-[305px] transition  duration-[2000ms] ease-in-out">
                        <ul className="grid gap-3 p-6 justify-center  md:w-[500px] lg:w-[582px] md:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink href="/" asChild>
                                    <div
                                        className=" text-black flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#eaedef] to-slate-100 p-6 no-underline outline-none focus:shadow-md"
                                    >
                                        <Store className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            ECOM
                                        </div>
                                        <p className="text-sm leading-tight text-slate-800">
                                            Explore our innovative product lineup and unlock new possibilities.
                                        </p>
                                    </div>
                                </NavigationMenuLink>
                            </li>
                            <ListItem title="All" href="/products?price=0">
                                View all products.
                            </ListItem>
                            {products.map((product) => (
                                <ListItem href={`/products/${product.id}`} key={product.id} title={product.name}>
                                    {product.description && product.description.slice(0, 100)}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="focus-visible:bg-slate-100 text-slate-800 data-[state=open]:bg-slate-100 data-[state=open]:text-black">Categories</NavigationMenuTrigger>
                    <NavigationMenuContent className="NavigationMenuContent z-50 bg-white h-[305px]">
                        <ul className="grid  gap-4 p-4 m-auto md:grid-cols-2 md:w-[500px] lg:w-[582px] ">
                            <ListItem
                                title="All"
                                href="/products?price=0"
                            >
                                View all categories.
                            </ListItem >
                            {categories.slice(0, 5).map((category) => (
                                <ListItem
                                    key={category.id}
                                    title={category.name}
                                    href={`/products?categoryId=${category.id}`}
                                >
                                    {category.description}
                                </ListItem >
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="focus-within:bg-slate-100  transition-colors hover:bg-slate-100 hover:text-black rounded-md text-slate-800">
                        <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
                            <span className={currentPath === "/about" ? "text-red-400" : "text-slate-800"}>About</span>
                        </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    )
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "max-w-[256px] block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-slate-100 hover:bg-slate-100",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none capitalize text-black">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-[#71717a]">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    )
})
ListItem.displayName = "ListItem"




export default NavItems;