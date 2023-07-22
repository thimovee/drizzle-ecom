import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import Image from "next/image";
import { ExtendedProduct } from "@/app/dashboard/products/components/Columns";

interface HeroProps {
    product: ExtendedProduct
}

const FakeUsers = [
    { imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=1" },
    { imageUrl: "https://images.unsplash.com/photo-1639747279286-c07eecb47a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=1" },
    { imageUrl: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=1" },
    { imageUrl: "https://images.unsplash.com/photo-1521806463-65fbb1ab7ff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=1" }
]

const Hero: FC<HeroProps> = async ({ product }) => {
    // @ts-ignore
    const images = JSON.parse(product.images);
    const imageUrl = images && images[0]?.url;

    return (
        <div className="px-4 2xl:px-0 max-w-7xl mx-auto pb-20 pt-40 flex max-h-fit">
            <div className="flex flex-col w-full sm:max-w-[45%]">
                <h2 className="text-3xl font-bold tracking-wide leading-none">Elevate Your Wardrobe</h2>
                <p className="font-medium text-[#1d2b38] mt-6">Step into the Exquisite World of Fashion and Immerse Yourself in an Enchanting Collection of Stylish Clothing, Trendsetting Accessories, and Meticulously Crafted Refined Suits.</p>
                <a href="/products?price=0" className="rounded-full  text-center flex justify-center w-40 h-10 bg-slate-900 shadow-md shadow-[#f05454] font-semibold text-lg items-center text-white mt-20">Shop Now</a>
                <div className="flex items-center mt-32 border-b-2 border-[#f05454] max-w-fit pb-1 relative">
                    {FakeUsers.map((user) => (
                        <Image width={100} height={100} src={user.imageUrl} key={user.imageUrl} alt="Customer profile picture" className="rounded-full aspect-square object-cover h-8 w-8 first:ml-0 -ml-2 ring-2 ring-[#eaedef]"/>
                    ))}
                    <p className="font-medium ml-6">Join Over 2000+ Satisfied Customers</p>
                </div>
            </div>
            <a href={`/products/${product.id}`} className="hidden sm:block overflow-hidden hover:scale-105 transition duration-300 ease-in-out relative m-auto max-w-fit">
                <Image src={imageUrl} priority className="m-auto z-50" alt="Featured product" width={350} height={500} />
                <div className="bg-[#1d2b38] w-32 h-32 rounded-tl-[38px] rounded-tr-[60px] rounded-br-[64px] rounded-bl-[56px] rotate-[20deg] absolute top-5 right-0" />
                <div className="text-xl font-semibold text-white absolute top-16 right-6">15% SALE</div>
            </a>
        </div>
    );
}

export default Hero;