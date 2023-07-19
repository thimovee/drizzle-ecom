import { Category } from "@/db/schema";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
interface TrendingCategoriesProps {
    categories: Category[]
}

const TrendingCategories: FC<TrendingCategoriesProps> = ({ categories }) => {
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Trending Categories</h2>
            <div className="w-full flex justify-between gap-3">
                {categories.map((category) => (
                    <Link
                        aria-label={`Go to ${category.name}`}
                        key={category.id}
                        href={`/categories/${category.name}`}
                        className="w-1/4"
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
                    </Link>
                ))}
            </div>
            <div className="w-full flex justify-end my-4">
                <Link href="/categories" className="text-slate-900 hover:text-slate-700 border-b-2 border-[#f05454] pb-1 hover:scale-105 transition-transform">
                    <span className="flex items-center gap-2">View all categories <ArrowRight className="w-4 h-4" /></span>
                </Link>
            </div>
        </div>
    );
}

export default TrendingCategories;