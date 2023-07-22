import Link from 'next/link'
import { Calendar, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "ECOM | About",
    description: "About page for ECOM.",
}
const page = () => {
    return (
        <div className="flex flex-col">
            <div className="w-full grainy bg-repeat py-32 relative">
                <div className="max-w-7xl mx-auto flex justify-start items-center">
                    <div className="flex flex-col w-full px-4 xl:px-0">
                        <h1 className="text-3xl font-bold underline underline-offset-8">About Us</h1>
                    </div>
                </div>
            </div>
            <div className="w-full my-20">
                <div className="max-w-7xl mx-auto flex justify-start items-center">
                    <div className="flex flex-col w-full gap-40 px-4 2xl:px-0">
                        <section className="flex flex-col lg:flex-row  justify-between gap-4 lg:gap-0">
                            <Image className='w-full lg:w-1/2 max-h-80 object-cover rounded-lg grayscale-[0.4]' width={500} height={500} src="https://images.unsplash.com/photo-1523975864490-174dd4d9a41e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Image of brand journey" />
                            <div className="flex flex-col w-full lg:w-[45%] gap-10">
                                <h2 className="text-4xl text-red-400 font-bold">Our Journey to Fashion Excellence</h2>
                                <p className="font-medium text-base lg:text-lg text-slate-700">ECOM is a passion-driven fashion brand founded in 2023. What started as a small boutique has now grown into a renowned online destination for trendy and high-quality clothing, accessories, shoes, and pants. Over the years, we have established ourselves as a trusted name in the industry, constantly evolving to meet the ever-changing fashion needs of our valued customers.</p>
                            </div>
                        </section>
                        <section className="flex flex-col-reverse lg:flex-row justify-between gap-4 lg:gap-0">
                            <div className="flex flex-col w-full lg:w-[45%] gap-10">
                                <h2 className="text-4xl text-red-400 font-bold">Meet Our Fashion Enthusiasts</h2>
                                <p className="font-medium text-base lg:text-lg text-slate-700">Behind ECOM, there is a dedicated team of fashion enthusiasts who are constantly curating the latest trends and timeless styles to bring you the best fashion experience. Our team of designers, stylists, and fashion experts strive to deliver superior quality, impeccable craftsmanship, and exceptional attention to detail. With their expertise and passion, they ensure that every piece you find at our store reflects our commitment to style and comfort.</p>
                            </div>
                            <Image className='w-full lg:w-1/2 max-h-80 object-cover rounded-lg grayscale-[0.4]' width={500} height={500} src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="A team of people" />
                        </section>
                        <section className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
                            <Image className='w-full lg:w-1/2 max-h-80 object-cover rounded-lg grayscale-[0.4]' width={500} height={500} src="https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Man in suit" />
                            <div className="flex flex-col w-full lg:w-[45%] gap-10">
                                <h2 className="text-4xl text-red-400 font-bold">Elevate Your Wardrobe with Style</h2>
                                <p className="font-medium text-base lg:text-lg text-slate-700">At ECOM, we offer a diverse range of clothing, accessories, shoes, and pants that cater to all your fashion desires. From elegant dresses and stylish tops to comfortable jeans and statement shoes, our collection is carefully curated to help you express your unique personality and stay on-trend. We source our products from trusted suppliers, ensuring that each item meets our strict quality standards. With a seamless online shopping experience and excellent customer service, we are dedicated to making your fashion journey enjoyable and satisfying.</p>
                            </div>
                        </section>
                        <section className="flex flex-col pb-10">
                            <h2 className="text-2xl  font-bold">Company Information</h2>
                            <ul className="flex flex-col gap-2 mt-5 font-medium">
                                <li className="flex items-center"><MapPin className='w-4 h-4 mr-2 text-red-400' />  Some location</li>
                                <li className="flex items-center"><Phone className='w-4 h-4 mr-2 text-red-400' /> 123-456-7890</li>
                                <li className="flex items-center"> <Mail className="w-4 h-4 mr-2 text-red-400" /> mail@mail.com </li>
                                <li className="flex items-center"> <Calendar className="w-4 h-4 mr-2 text-red-400" /> Mon-Fri: 9am-5pm</li>
                                <li className="flex gap-4 mt-4">
                                    <h3 className='font-semibold text-lg'>Follow us on: </h3>
                                    <div className="flex gap-2">
                                        <Link className=" bg-red-400 text-white h-8 w-8 rounded-md p-1" href="https://www.facebook.com/" target="_blank">
                                            <Facebook className="w-6 h-6 m-auto" />
                                        </Link>
                                        <Link className=" bg-red-400 text-white h-8 w-8 rounded-md p-1" href="https://www.instagram.com/" target="_blank">
                                            <Instagram className="w-6 h-6 m-auto" />
                                        </Link>
                                        <Link className=" bg-red-400 text-white h-8 w-8 rounded-md p-1" href="https://www.twitter.com/" target="_blank">
                                            <Twitter className="w-6 h-6 m-auto" />
                                        </Link>
                                        <Link className=" bg-red-400 text-white h-8 w-8 rounded-md p-1" href="https://www.youtube.com/" target="_blank">
                                            <Youtube className="w-6 h-6 m-auto" />
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page