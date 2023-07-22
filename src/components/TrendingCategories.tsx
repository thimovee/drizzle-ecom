import { Category } from "@/db/schema";
import Image from "next/image";
import { FC } from "react";
import { ArrowRight } from "lucide-react";
interface TrendingCategoriesProps {
    categories: Category[]
}

const TrendingCategories: FC<TrendingCategoriesProps> = ({ categories }) => {
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Trending Categories</h2>
            <div className="w-full px-4 2xl:px-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-between gap-3">
                {categories.map((category) => (
                    <a
                        aria-label={`Go to ${category.name}`}
                        key={category.id}
                        href={`/products?categoryId=${category.id}&price=0`}
                        className="w-full"
                    >
                        <div className="group relative overflow-hidden rounded-md">
                            <div className="aspect-w-4 aspect-h-5">
                                <div className="absolute inset-0 z-10 bg-black bg-opacity-60 transition-colors group-hover:bg-opacity-70" />
                                {/* @ts-ignore */}
                                <Image width={500} height={500} src={category.thumbnail[0].url} alt={category.name} className="max-h-[310px] w-full object-cover  transition-transform group-hover:scale-105" priority />
                            </div>
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="w-full flex justify-end my-4">
                <a href="/products?price=0" className="text-slate-900 mr-4 2xl:mr-0 hover:text-slate-700 border-b-2 border-[#f05454] pb-1 hover:scale-105 transition-transform">
                    <span className="flex items-center gap-2">View all categories <ArrowRight className="w-4 h-4" /></span>
                </a>
            </div>
        </div>
    );
}

export default TrendingCategories;