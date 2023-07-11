import { LayoutDashboard } from "lucide-react"
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { UserAccountNav } from "./UserAccountNav";
import { currentUser } from "@clerk/nextjs";
import { Button } from "./ui/Button";
interface NavbarProps { }


const Navbar: FC<NavbarProps> = async () => {
    const user = await currentUser();
    return (
        <nav className="    w-full border-b sticky top-0 bg-white z-50">
            <div className="max-w-7xl flex justify-between mx-auto py-4">
                <div className="flex gap-4 lg:gap-6 items-center">
                    <Link href="/" className="font-bold text-xl">ECOM</Link>
                    <Link className="ml-4 text-sm font-medium transition-colors text-neutral-500 hover:text-black" href="/">Suits</Link>
                    <Link className="text-sm font-medium transition-colors text-neutral-500 hover:text-black" href="/">Shirts</Link>
                    <Link className="text-sm font-medium transition-colors text-neutral-500 hover:text-black" href="/">Glasses</Link>
                    {/* categories dropdown */}
                    <Link className="text-sm font-medium transition-colors text-neutral-500 hover:text-black" href="/">Blog</Link>
                </div>
                <div className="flex gap-2 items-center">
                    <Button className="rounded-md flex items-center border border-transparent gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>0</span>
                    </Button>
                    <UserAccountNav user={user} />
                </div>
            </div>
        </nav>
    )
};

export default Navbar;