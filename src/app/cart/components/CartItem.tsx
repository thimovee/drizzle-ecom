import Image from "next/image";
import { toast } from "sonner";
import { X, ImageIcon } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Badge } from "@/components/ui/Badge";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
import { formatPrice } from "@/lib/utils";


interface CartItemProps {
    data: ExtendedProduct;
}

const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    // @ts-ignore
    const images = data.images ? JSON.parse(data.images) : null;
    const imageUrl = images && images[0]?.url;

    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                {data.images ? <Image
                    fill
                    src={imageUrl}
                    alt=""
                    className="object-cover object-center"
                /> : <div className="bg-slate-200 aspect-square object-cover rounded-md flex items-center">
                    <ImageIcon className="w-8 h-8 m-auto text-slate-600" />
                </div>}
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className=" text-lg font-semibold text-black">
                            {data.name}
                        </p>
                    </div>

                    <div className="mt-1 flex text-sm">
                        <Badge>{data.categoryName}</Badge>
                    </div>
                    <span>{formatPrice(data.price)}</span>
                </div>
            </div>
        </li>
    );
}

export default CartItem;