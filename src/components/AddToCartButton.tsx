"use client"
import { FC } from "react";
import { Button } from "./ui/Button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";

interface AddToCartButtonProps {
    product: ExtendedProduct;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ product }) => {
    const cart = useCart();
    const onAddToCart = () => {
        cart.addItem(product);
    }
    return (
        <Button onClick={onAddToCart} className="flex items-center gap-x-2 bg-slate-900 text-white mt-auto">
            Add To Cart
            <ShoppingCart size={20} />
        </Button>
    );
}

export default AddToCartButton;