import { db } from '@/db';
import { products } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { UserProfile } from "@clerk/nextjs"
import React from 'react'

const page = async () => {

    async function createProduct(data: FormData) {
        "use server"
        const name = data.get("name") as string;
        const description = data.get("description") as string;
        const price = data.get("price") as string;
        const category = "glasses"
        const inventory = 10
        const rating = 5
        const tags = ["tag1", "tag2"]
        const details = ["Product 1 detail 1", "Product 1 detail 2"]

        await db.insert(products).values({
            name: name,
            description: description,
            category: category,
            subcategory: 'Placeholder Subcategory',
            price: price,
            inventory: inventory,
            rating: rating,
            details: details,
            tags: tags,
        });

        revalidatePath("/");
    }

    const allProducts = await db.select().from(products);
    return (
        <div className="mx-auto md:mx-0">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl">Account</h1>
                <p className='text-slate-400'>Manage your account settings.</p>
            </div>
            <UserProfile
                appearance={{
                    variables: {
                        borderRadius: "0.25rem",
                        fontSize: "1.25rem",
                    },

                    elements: {
                        scrollBox: "max-w-screen sm:max-w-md md:max-w-xl lg:max-w-3xl",
                        pageScrollBox: "p-2 sm:p-0 max-w-screen sm:max-w-md md:max-w-xl lg:max-w-3xl",
                        card: "shadow-none max-w-screen sm:max-w-md md:max-w-xl lg:max-w-3xl",
                        profileSection__danger: "hidden",
                        navbar: "hidden",
                        navbarMobileMenuButton: "hidden",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                    },
                }}
            />
        </div>
    )
}

export default page