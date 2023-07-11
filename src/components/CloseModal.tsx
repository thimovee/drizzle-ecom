'use client'

import { X } from 'lucide-react'
import { FC } from 'react'
import { buttonVariants } from './ui/Button'
import { cn } from '@/lib/utils'

interface CloseModalProps {
    path: string
}

const CloseModal: FC<CloseModalProps> = ({ path }) => {

    return (
        <a href={`/dashboard/${path}`} className={cn(
            buttonVariants({ variant: "outline" }),
            "h-6 w-6 p-0 rounded-md items-center"
        )} >
            <X aria-label='close modal' className='h-4 w-4' />
        </a>
    )
}

export default CloseModal