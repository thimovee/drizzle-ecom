import { formatPrice } from "@/lib/utils";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
import AddToCartButton from "./AddToCartButton";

interface InfoProps {
    product: ExtendedProduct
};

const Info: React.FC<InfoProps> = ({ product }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    {formatPrice(product?.price)}
                </p>
            </div>
            <hr className="my-4" />
            <div className="mt-10 flex  items-end justify-center gap-x-3">
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

export default Info;