import ProductCard from '@/components/ProductCard';
import Filter from '@/components/Filter';
import { db } from '@/db';
import { categories, products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ExtendedProduct } from '../dashboard/products/components/Columns';
import Slider from '@/components/FilterSlider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import getCategories from '@/lib/getAllCategories';

export const revalidate = 0;

interface CategoryPageProps {
    searchParams: {
        categoryId: string,
        price: string,
    };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ searchParams }) => {
    const categoryId = !isNaN(Number(searchParams.categoryId)) ? Number(searchParams.categoryId) : null;

    const price = !isNaN(Number(searchParams.price)) ? Number(searchParams.price) : 0;

    const allProducts: ExtendedProduct[] = await (await db
        .select()
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(categoryId !== null ? eq(products.categoryId, categoryId) : undefined)// Only filter if categoryId is valid
        .execute())
        .map((item) => ({
            ...item.products,
            categoryName: item.categories?.name ?? "",
        }));

    const allCategories = await getCategories()

    return (
        <div className="max-w-7xl mx-auto">
            <div className="w-full flex flex-col  lg:flex-row justify-between my-20 gap-4">
                <div className="flex-col p-4 pb-8 bg-slate-50 lg:bg-white rounded-md mx-2 md:mx-0  flex">
                    <Filter valueKey="categoryId" name="Categories" data={allCategories} />
                    <Slider valueKey={'price'} name={'Price'} />
                </div>

                <div className="w-full lg:w-3/4">
                    {allProducts.length === 0 && <div className="text-center font-bold text-3xl mt-40">No Products Found</div>}
                    <div className="grid px-4 lg:px-0 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                        {allProducts.map((item) => (
                            <div className={price > Number(item.price) ? "hidden" : "flex"} style={{ flexGrow: 1 }} key={item.id}><ProductCard product={item} /></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
