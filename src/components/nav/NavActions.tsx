"use client";

import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <a href="/cart" className="ml-auto flex items-center gap-x-4">
                <Button onClick={() => router.push('/cart')} className="flex items-center rounded-md bg-black px-4 py-2">
                    <ShoppingCart
                        size={20}
                        color="white"
                    />
                    <span className="ml-2 text-sm font-medium text-white">
                        {cart.items.length}
                    </span>
                </Button>
            </a>
        </>
    );
}

export default NavbarActions;
