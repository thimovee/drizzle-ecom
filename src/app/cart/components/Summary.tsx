"use client";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import useCart from "@/hooks/use-cart";
import { toast } from "sonner";

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if (searchParams.get('succes')) {
            toast.success('Payment completed & cart cleared');
            removeAll();
        }

        if (searchParams.get('canceled')) {
            toast.error('Something went wrong.');
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0);

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.SITE_URL}/api/checkout`, {
            productIds: items.map((item) => item.id)
        });

        window.location = response.data.url;
    }

    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h2 className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Order total</div>
                    <span>{formatPrice(totalPrice)}</span>
                </div>
            </div>
            <Button onClick={onCheckout} disabled={items.length === 0} className="bg-slate-900 text-white w-full mt-6">
                Checkout
            </Button>
        </div>
    );
}

export default Summary;