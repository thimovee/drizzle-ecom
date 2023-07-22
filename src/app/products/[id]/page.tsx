import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 0;

export async function generateMetadata({ params }: {params : {id: number}}){
    const res = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).where(eq(products.id, params.id)).execute();
    const allProducts = res[0];
    const product = allProducts.products;
    if(!product){
        return{
            title: 'Post not found'
        }
    }
    return {
        title: product.name,
    }
}

export default async function ProductPage({ params }: { params: { id: number } }) {
    const res = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).where(eq(products.id, params.id)).execute();
    const productData = res[0];
    const product = {
        ...productData.products,
        categoryName: productData.categories?.name ?? "",
    };


    const allProducts: ExtendedProduct[] = await (await db
        .select()
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .execute())
        .map((item) => ({
            ...item.products,
            categoryName: item.categories?.name ?? "",
        }));

    const similairProducts = allProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id);

    if (!product) {
        return notFound();
    }


    return (
        <section id="product-details" className="flex flex-col max-w-7xl mx-auto py-20">
            {product && <div className="flex justify-between pb-32">
                <div className="w-1/2">
                    <div className="max-w-lg"><Gallery images={product.images} /></div>
                </div>
                <div className="flex flex-col w-1/2">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="flex justify-between w-full border-b border-slate-200 pb-4 items-center my-4">
                        <h2 className="text-2xl font-semibold text-slate-900">{formatPrice(product.price)}</h2>
                        <h3 className="text-slate-700 border-b border-red-400 border-spacing-4">{product.inventory} in stock</h3>
                    </div>
                    <h3 className="font-semibold text-black">Category: <span className="font-normal capitalize">{product.categoryName && product.categoryName}</span></h3>
                    <div className="my-20 bg-slate-900 py-1 px-2 max-w-fit rounded-md"><AddToCartButton product={product} /></div>
                    <Accordion type="multiple" >
                        <AccordionItem value="description" defaultValue="description">
                            <AccordionTrigger>Description</AccordionTrigger>
                            <AccordionContent>
                                {product.description}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>}
            {similairProducts.length > 0 && <div className="w-full mx-auto mt-10">
                <h4 className="text-3xl font-bold text-center text-slate-900 mb-8">Similair Products</h4>
                <div className="w-full grid grid-cols-4 gap-3">
                    {similairProducts.map((product) => (
                        <div className="w-full" key={product.id}><ProductCard product={product} /></div>
                    ))}
                </div>
            </div>}
        </section>
    );
}
