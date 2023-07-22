// FilterSlider.tsx
"use client";
import React, { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

interface FilterSliderProps {
    valueKey: string;
    name: string;
}

const FilterSlider: React.FC<FilterSliderProps> = ({ valueKey, name }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [priceRange, setPriceRange] = useState([0]);
    const debouncedPriceRange = useDebounce(priceRange[0], 600);

    useEffect(() => {
        const urlPrice = Number(searchParams.get(valueKey));
        if (!isNaN(urlPrice)) {
            setPriceRange([urlPrice]);
        }
    }, [searchParams, valueKey]);

    const handleSliderChange = (values: number[]) => {
        setPriceRange(values);
        console.log(values[0])
    };
    useEffect(() => {
        updateUrl(debouncedPriceRange);
    }, [debouncedPriceRange]);

    const updateUrl = (value: number) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: value.toString(),
        };

        const url = qs.stringifyUrl(
            { url: window.location.href, query, },
            { skipNull: true }
        );

        router.push(url);
    };

    return (
        <form>
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <div className="my-4" />
            <Slider.Root
                className="relative flex items-center select-none touch-none w-[320px] h-5"
                value={priceRange}
                max={100}
                step={10}
                onValueChange={handleSliderChange}
            >
                <Slider.Track className="bg-blackA10 relative grow rounded-full h-[3px] bg-slate-200">
                    <Slider.Range className="absolute bg-black rounded-full h-full" />
                    <div className="flex justify-between mt-2">
                        <span>{priceRange[0]}</span>
                        <span>{100}</span>
                    </div>
                </Slider.Track>
                <Slider.Thumb
                    className="block w-5 h-5 bg-white rounded-[10px] hover:bg-slate-200 focus:outline-none border-2 focus:border-slate-800"
                    aria-label="Volume"
                />
            </Slider.Root>
        </form>
    );
};

export default FilterSlider;
