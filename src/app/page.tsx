import Hero from '@/components/Hero'
import { db } from '@/db'
import { Metadata } from 'next'
import { categories, products } from '@/db/schema'
import { eq } from "drizzle-orm"
import { ExtendedProduct } from './dashboard/products/components/Columns';
import TrendingCategories from '@/components/TrendingCategories';
import FeaturedProducts from '@/components/FeaturedProducts';

export const metadata: Metadata = {
  title: "ECOM | Home",
  description: "ECOM is a e-commerce website built with Next.js, TailwindCSS, and Drizzle ORM.",
}


export default async function Home() {
  const featuredProductID = 66
  const allProducts: ExtendedProduct[] = await (await db
    .select()
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .execute())
    .map((item) => ({
      ...item.products,
      categoryName: item.categories?.name ?? "",
    }));

  const featuredProduct = allProducts.find((product) => product.id === featuredProductID)
  const allCategories = await db.select().from(categories)

  return (
    <div className="flex flex-col">
      <section id="hero" className='w-full grainy bg-repeat'>
        {featuredProduct && <Hero product={featuredProduct} />}
      </section>
      <section id="trending-categories" className="w-full my-8">
        <TrendingCategories categories={allCategories.slice(0, 4)} />
      </section>
      <section id="featured-products" className="w-full my-8">
        <FeaturedProducts products={allProducts.slice(0, 8)} />
      </section>
    </div>
  )
}
