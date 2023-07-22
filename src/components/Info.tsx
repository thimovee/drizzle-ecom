import { formatPrice } from "@/lib/utils";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
import AddToCartButton from "./AddToCartButton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
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
            <h2 className="font-semibold text-lg">Category: <span className="capitalize font-normal">{product.categoryName}</span></h2>
            <div className="my-6 flex  gap-x-3">
                <AddToCartButton product={product} />
            </div>
            <Accordion type="multiple" >
                <AccordionItem value="description" defaultValue="description">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                        {product.description}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Info;