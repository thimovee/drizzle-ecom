import { FC } from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
interface FeaturedProductsProps {
    products: ExtendedProduct[]
}

const FeaturedProducts: FC<FeaturedProductsProps> = ({ products }) => {
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Trending Products</h2>
            <div className="px-4 2xl:px-0 w-full justify-between grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 gap-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="w-full flex justify-end my-4">
                <a href="/categories" className="mr-4 2xl:mr-0 text-slate-900 hover:text-slate-700 border-b-2 border-[#f05454] pb-1 hover:scale-105 transition-transform">
                    <span className="flex items-center gap-2">View all products <ArrowRight className="w-4 h-4" /></span>
                </a>
            </div>
        </div>
    );
}

export default FeaturedProducts;