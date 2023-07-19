"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ImageIcon, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import usePreviewModal from "@/hooks/use-preview-modal";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
import { formatPrice } from "@/lib/utils";
import IconButton from "./ui/icon-button";

interface ProductCard {
    product: ExtendedProduct
}

const ProductCard: React.FC<ProductCard> = ({
    product
}) => {
    const previewModal = usePreviewModal();
    const cart = useCart();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/products/${product?.id}`);
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(product);
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(product);
    };
    // @ts-ignore
    const images = JSON.parse(product.images);
    const imageUrl = images && images[0]?.url;

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                {product.images ? <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="aspect-square object-cover rounded-md"
                /> : <div className="bg-slate-200 aspect-square object-cover rounded-md flex items-center">
                    <ImageIcon className="w-8 h-8 m-auto text-slate-600" /> </div>}
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-sm text-gray-500 capitalize">{product.categoryName}</p>
            </div>
            <div className="flex items-center justify-between font-semibold">
                {formatPrice(product.price)}
            </div>
        </div>
    );
}

export default ProductCard;